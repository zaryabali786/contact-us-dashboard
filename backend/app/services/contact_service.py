"""Service layer separating data retrieval and business logic from route controllers."""

from typing import List, Optional, Dict, Any
from app.data.contacts_data import CONTACTS, EMAIL_ADDRESSES


class ContactService:
    """Service providing contact query operations."""

    @staticmethod
    def get_all_contacts(query: Optional[str] = None) -> List[Dict[str, Any]]:
        """Retrieve the complete list of contacts, optionally filtered by a search term.
        
        Searches across first_name, last_name, company, job_title, phone, and associated emails.
        """
        if not query:
            return list(CONTACTS)

        search_term = query.strip().lower()
        matched: List[Dict[str, Any]] = []

        for contact in CONTACTS:
            # Match name
            full_name = f"{contact.get('first_name', '')} {contact.get('last_name', '')}".lower()
            if search_term in full_name:
                matched.append(contact)
                continue

            # Match company or job title
            if search_term in contact.get('company', '').lower() or search_term in contact.get('job_title', '').lower():
                matched.append(contact)
                continue

            # Match phone number
            clean_phone = contact.get('phone', '').replace('-', '').replace(' ', '').lower()
            clean_term = search_term.replace('-', '').replace(' ', '')
            if clean_term and clean_term in clean_phone:
                matched.append(contact)
                continue

            # Match any associated email
            emails = EMAIL_ADDRESSES.get(contact['id'], [])
            if any(search_term in e.get('email', '').lower() for e in emails):
                matched.append(contact)
                continue

        return matched

    @staticmethod
    def get_contact_by_id(contact_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a specific contact profile by ID."""
        target_id = str(contact_id)
        for contact in CONTACTS:
            if contact['id'] == target_id:
                return contact
        return None

    @staticmethod
    def get_emails_by_contact_id(contact_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retrieve all email addresses belonging to a specific contact.
        
        Returns None if the contact does not exist.
        """
        target_id = str(contact_id)
        contact = ContactService.get_contact_by_id(target_id)
        if contact is None:
            return None

        # Return email list for the contact (or empty list if no emails registered)
        return list(EMAIL_ADDRESSES.get(target_id, []))
