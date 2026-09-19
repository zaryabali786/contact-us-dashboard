"""Automated pytest suite for Contact Management REST API."""

import pytest
import sys
import os

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app import create_app


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    app = create_app({"TESTING": True})
    with app.test_client() as client:
        yield client


class TestContactsAPI:
    """Tests for contact management endpoints."""

    def test_get_contacts_success(self, client):
        """Verify GET /contacts returns 200 and a non-empty list of contact objects."""
        response = client.get('/contacts')
        assert response.status_code == 200
        assert response.is_json
        data = response.get_json()
        assert isinstance(data, list)
        assert len(data) >= 9

    def test_contact_fields(self, client):
        """Verify contacts contain all required fields."""
        response = client.get('/contacts')
        assert response.status_code == 200
        data = response.get_json()
        first_contact = data[0]

        required_fields = [
            'id', 'first_name', 'last_name', 'address',
            'phone', 'company', 'job_title', 'avatar'
        ]
        for field in required_fields:
            assert field in first_contact, f"Missing required field: {field}"
            assert first_contact[field] is not None, f"Field {field} should not be None"

    def test_get_contact_email_addresses_success(self, client):
        """Verify GET /contacts/<id>/email_addresses returns all email addresses for a contact."""
        response = client.get('/contacts/1/email_addresses')
        assert response.status_code == 200
        assert response.is_json
        emails = response.get_json()
        assert isinstance(emails, list)
        assert len(emails) >= 2  # Johanna Stevens has 2 email addresses
        
        for email_item in emails:
            assert 'id' in email_item
            assert 'contact_id' in email_item
            assert email_item['contact_id'] == '1'
            assert 'email' in email_item
            assert 'is_primary' in email_item

    def test_get_contact_email_addresses_nonexistent(self, client):
        """Verify GET /contacts/<id>/email_addresses returns 404 for nonexistent contact."""
        response = client.get('/contacts/99999/email_addresses')
        assert response.status_code == 404
        assert response.is_json
        body = response.get_json()
        assert body['error'] == 'Not Found'
        assert '99999' in body['message']
        assert body['status_code'] == 404

    def test_api_prefixed_endpoints(self, client):
        """Verify /api/contacts and /api/contacts/<id>/email_addresses also work."""
        res_contacts = client.get('/api/contacts')
        assert res_contacts.status_code == 200
        assert isinstance(res_contacts.get_json(), list)

        res_emails = client.get('/api/contacts/2/email_addresses')
        assert res_emails.status_code == 200
        assert isinstance(res_emails.get_json(), list)

    def test_cors_headers_present(self, client):
        """Verify CORS headers are present in response."""
        response = client.get('/contacts')
        assert response.headers.get('Access-Control-Allow-Origin') == '*'

    def test_search_filtering(self, client):
        """Verify query parameter search (?q=...) filters contacts."""
        response = client.get('/contacts?q=Nicholas')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data) >= 1
        assert data[0]['first_name'] == 'Nicholas'

    def test_get_single_contact(self, client):
        """Verify GET /contacts/<id> returns contact profile."""
        response = client.get('/contacts/1')
        assert response.status_code == 200
        data = response.get_json()
        assert data['id'] == '1'
        assert data['first_name'] == 'Johanna'

    def test_get_single_contact_not_found(self, client):
        """Verify GET /contacts/<id> returns 404 for invalid ID."""
        response = client.get('/contacts/unknown_id')
        assert response.status_code == 404
        data = response.get_json()
        assert data['error'] == 'Not Found'
