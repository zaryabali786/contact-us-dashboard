# Contact Management Dashboard

A modern, responsive Contact Management Dashboard application built to replicate the Figma specification without third-party component, table, or pagination libraries.

- **Frontend**: Angular 20+, TypeScript, HTML5, SCSS (Custom Vanilla SCSS Design System)
- **Backend**: Python 3, Flask REST API with CORS support
- **Deployment**: Serverless-ready for Vercel (Serverless Python functions + Static Angular SPA)

---

## Backend Architecture

The Flask backend follows a clean, decoupled architecture separating data, business logic, route controllers, and application factories:

```text
backend/
├── api/
│   └── index.py               # Vercel serverless function entrypoint
├── app/
│   ├── __init__.py            # Flask app factory (CORS, error handling, route registration)
│   ├── data/
│   │   ├── __init__.py
│   │   └── contacts_data.py   # Realistic mock database for contacts & email addresses
│   ├── services/
│   │   ├── __init__.py
│   │   └── contact_service.py # Data abstraction & business logic layer
│   └── routes/
│       ├── __init__.py
│       └── contact_routes.py  # Route controller (GET /contacts, GET /contacts/<id>/email_addresses)
├── tests/
│   ├── __init__.py
│   └── test_contacts.py       # Automated Pytest suite (9 tests)
├── requirements.txt           # Flask, Flask-Cors, pytest
├── run.py                     # Local development runner
└── venv/                      # Python virtual environment (ignored in git)
```

---

## REST API Endpoints & Specification

The API supports both `/contacts` and `/api/contacts` base routes with full CORS support (`Access-Control-Allow-Origin: *`).

### 1. `GET /contacts` (or `GET /api/contacts`)
Returns the complete list of contacts.
- **Query Parameters**: `q` (optional) – Filters contacts by name, role, phone, or email.
- **Status Code**: `200 OK`
- **Response Example**:
```json
[
  {
    "id": "1",
    "first_name": "Johanna",
    "last_name": "Stevens",
    "name": "Johanna Stevens",
    "company": "WhiteUI Studio",
    "job_title": "UI/UX Designer",
    "phone": "439-582-1578",
    "address": "742 Evergreen Terrace, Springfield, OR 97477",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    "status": "online",
    "bio": "When I first got into the advertising, I was looking for the magical combination that would put website into the top search engine rankings",
    "dial": "j.stevens@ymsg.com",
    "meeting_url": "http://go.betacall.com/meet/j.stevens",
    "phone_numbers": [
      { "number": "439-582-1578", "is_primary": true },
      { "number": "621-770-7689", "is_primary": false }
    ],
    "social_links": {
      "facebook": "https://facebook.com/johannastevens",
      "pinterest": "https://pinterest.com/johannastevens",
      "twitter": "https://twitter.com/johannastevens",
      "linkedin": "https://linkedin.com/in/johannastevens",
      "google": "https://plus.google.com/johannastevens"
    }
  }
]
```

### 2. `GET /contacts/<id>/email_addresses` (or `GET /api/contacts/<id>/email_addresses`)
Returns all email addresses belonging to the requested contact.
- **Status Code**: `200 OK`
- **Response Example**:
```json
[
  {
    "id": "e-1-1",
    "contact_id": "1",
    "email": "johanna.stevens@gmail.com",
    "type": "Personal",
    "is_primary": true
  },
  {
    "id": "e-1-2",
    "contact_id": "1",
    "email": "johanna.stevens@whiteui.store",
    "type": "Work",
    "is_primary": false
  }
]
```

### 3. Nonexistent Contact Error Handling
If an email list is requested for a contact ID that does not exist:
- **Status Code**: `404 Not Found`
- **Response Example**:
```json
{
  "error": "Not Found",
  "message": "Contact with id '99999' not found.",
  "status_code": 404
}
```

---

## Local Development Instructions

### Backend Setup & Execution
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux**:
     ```bash
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the local development server:
   ```bash
   python run.py
   ```
   *The server starts at `http://127.0.0.1:5000`.*

5. Run automated tests:
   ```bash
   pytest tests
   ```

---

## Vercel Deployment Guide

The repository includes both root and backend serverless entrypoints:
- `backend/api/index.py` & `api/index.py` expose the Flask WSGI instance (`app`).
- `requirements.txt` at the root and backend ensure automatic dependency installation during build.
- `vercel.json` configures the static Angular build and Python serverless function:
  - `/api/(.*)` -> `api/index.py`
  - `/contacts(.*)` -> `api/index.py`
  - All other routes serve the Angular Single Page Application from `dist/frontend/browser`.

To deploy:
```bash
vercel
```
or connect the GitHub repository directly to Vercel.
