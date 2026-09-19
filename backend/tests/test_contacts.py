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
    """Comprehensive test suite for Contact Management REST API behavior."""

    # 1. GET /contacts returns contacts
    def test_get_contacts_success(self, client):
        """Verify GET /contacts returns 200 and a non-empty list of contact objects."""
        response = client.get('/contacts')
        assert response.status_code == 200
        assert response.is_json
        data = response.get_json()
        assert isinstance(data, list)
        assert len(data) >= 9

    # 2. Response structure is valid
    def test_contact_fields_and_data_types(self, client):
        """Verify contacts contain all required fields with expected data types."""
        response = client.get('/contacts')
        assert response.status_code == 200
        data = response.get_json()
        first_contact = data[0]

        required_fields = {
            'id': str,
            'first_name': str,
            'last_name': str,
            'address': str,
            'phone': str,
            'company': str,
            'job_title': str,
            'avatar': str,
            'status': str
        }
        for field, expected_type in required_fields.items():
            assert field in first_contact, f"Missing required field: {field}"
            assert isinstance(first_contact[field], expected_type), f"Field {field} should be type {expected_type}"

        # Validate status value
        assert first_contact['status'] in ['online', 'away', 'offline']

        # Validate phone_numbers structure if present
        if 'phone_numbers' in first_contact:
            assert isinstance(first_contact['phone_numbers'], list)
            for p in first_contact['phone_numbers']:
                assert 'number' in p
                assert 'is_primary' in p
                assert isinstance(p['is_primary'], bool)

        # Validate social_links structure if present
        if 'social_links' in first_contact:
            assert isinstance(first_contact['social_links'], dict)

    # 3. GET /contacts/<id>/email_addresses returns emails
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
            assert '@' in email_item['email']
            assert 'is_primary' in email_item
            assert isinstance(email_item['is_primary'], bool)

    # 4. Invalid contact ID returns 404
    def test_get_contact_email_addresses_nonexistent(self, client):
        """Verify GET /contacts/<id>/email_addresses returns 404 for nonexistent contact."""
        response = client.get('/contacts/99999/email_addresses')
        assert response.status_code == 404
        assert response.is_json
        body = response.get_json()
        assert body['error'] == 'Not Found'
        assert '99999' in body['message']
        assert body['status_code'] == 404

    def test_get_single_contact_not_found(self, client):
        """Verify GET /contacts/<id> returns 404 for invalid ID."""
        response = client.get('/contacts/unknown_id')
        assert response.status_code == 404
        assert response.is_json
        data = response.get_json()
        assert data['error'] == 'Not Found'
        assert data['status_code'] == 404

    # 5. API error handling & routing behavior
    def test_api_prefixed_endpoints(self, client):
        """Verify /api/contacts and /api/contacts/<id>/email_addresses work identically."""
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

    def test_search_filtering_with_matches(self, client):
        """Verify query parameter search (?q=...) filters contacts case-insensitively."""
        # Case insensitive test: lowercase search
        response = client.get('/contacts?q=nicholas')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data) >= 1
        assert data[0]['first_name'] == 'Nicholas'

    def test_search_filtering_zero_matches(self, client):
        """Verify query parameter search with no matches returns 200 with empty list."""
        response = client.get('/contacts?q=XYZNonExistentContact999')
        assert response.status_code == 200
        assert response.is_json
        data = response.get_json()
        assert isinstance(data, list)
        assert len(data) == 0

    def test_nonexistent_route_returns_404_json(self, client):
        """Verify requesting an undefined endpoint returns structured 404 JSON."""
        response = client.get('/api/undefined_endpoint')
        assert response.status_code == 404
        assert response.is_json
        body = response.get_json()
        assert body['status_code'] == 404
        assert body['error'] == 'Not Found'

    def test_method_not_allowed_returns_405(self, client):
        """Verify sending unsupported HTTP method returns 405 Method Not Allowed."""
        response = client.post('/contacts', json={"first_name": "Test"})
        assert response.status_code == 405
        assert response.is_json
        body = response.get_json()
        assert body['status_code'] == 405
        assert body['error'] == 'Method Not Allowed'
