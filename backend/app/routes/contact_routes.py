"""Contact management REST API routes."""

from flask import Blueprint, jsonify, request
from app.services.contact_service import ContactService

contacts_bp = Blueprint('contacts_bp', __name__)


@contacts_bp.route('/contacts', methods=['GET'])
def get_contacts():
    """GET /contacts
    Returns the complete list of contacts, with optional search query (?q=term).
    """
    search_query = request.args.get('q', default=None, type=str)
    contacts = ContactService.get_all_contacts(query=search_query)
    return jsonify(contacts), 200


@contacts_bp.route('/contacts/<contact_id>/email_addresses', methods=['GET'])
def get_contact_email_addresses(contact_id: str):
    """GET /contacts/<id>/email_addresses
    Returns all email addresses belonging to that contact.
    Returns 404 with structured error JSON if the contact is not found.
    """
    emails = ContactService.get_emails_by_contact_id(contact_id)
    if emails is None:
        return jsonify({
            "error": "Not Found",
            "message": f"Contact with id '{contact_id}' not found.",
            "status_code": 404
        }), 404

    return jsonify(emails), 200


@contacts_bp.route('/contacts/<contact_id>', methods=['GET'])
def get_contact(contact_id: str):
    """GET /contacts/<id>
    Returns a single contact's profile.
    """
    contact = ContactService.get_contact_by_id(contact_id)
    if contact is None:
        return jsonify({
            "error": "Not Found",
            "message": f"Contact with id '{contact_id}' not found.",
            "status_code": 404
        }), 404

    return jsonify(contact), 200
