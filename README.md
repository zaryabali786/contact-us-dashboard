# Contact Management Dashboard

A modern, responsive Contact Management Dashboard application built to replicate the Figma specification without third-party component, table, or pagination libraries.

- **Frontend**: Angular 20+, TypeScript, HTML5, SCSS (Native Standalone Components + Custom SCSS Design System)
- **Backend**: Python 3, Flask REST API with CORS support
- **Deployment**: Serverless-ready for Vercel (Serverless Python functions + Static Angular SPA)
- **Figma Reference**: [Contacts Management Dashboard by Shakir260](https://www.figma.com/file/7fMi9iwHrMOz3taFMcZDVe/Contacts-Management-Dashboard-Free-Resource-Shakir260?node-id=0%3A1)

---

## Architectural Highlights

### Frontend Architecture (Angular 20 Standalone)
- **Clean Separation of Concerns**: Core (singleton services, models, interceptors), Features (smart page container, presentation components, state service), and Shared (reusable icons, skeleton shimmer, pipes, directives).
- **Reactive State Management**: Built using native Angular signals (`contacts`, `selectedContactId`, `selectedContactEmails`, `isLoadingContacts`, `isLoadingEmails`, `contactsError`, `emailsError`) and computed values.
- **Zero Third-Party Component Libraries**: 100% custom-crafted Vanilla SCSS, custom SVG icon system, custom shimmer loader, custom image fallback directive, and custom phone number formatter pipe. No Angular Material, PrimeNG, or Bootstrap.
- **Fully Responsive**: Intentional SCSS breakpoints for Desktop (`>= 1280px`), Laptop (`1024px - 1279px`), Tablet (`768px - 1023px`), and Mobile (`<= 767px`). Features collapsible sidebar toggling on tablets and seamless single-pane view navigation on mobile devices.

### Backend Architecture (Flask REST API)
- **Decoupled 3-Tier Layering**: Route controller layer (`app/routes/`), Service/query layer (`app/services/`), and Data storage layer (`app/data/`).
- **Standardized REST Responses**: Consistent JSON data envelopes, proper HTTP status codes (200, 404, 405, 500), CORS headers (`Access-Control-Allow-Origin: *`), and search filtering (`?q=`).
- **Serverless-Ready**: Root `api/index.py` and `vercel.json` allow direct zero-configuration deployment to Vercel Serverless Functions.

---

## REST API Endpoints & Specification

The API supports both `/contacts` and `/api/contacts` base routes with full CORS support.

### 1. `GET /contacts` (or `GET /api/contacts`)
Returns the complete list of contacts.
- **Query Parameters**: `q` (optional) – Filters contacts case-insensitively across name, role, phone, and emails.
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
    "list_role": "Project Manager",
    "phone": "439-582-1578",
    "address": "742 Evergreen Terrace, Springfield, OR 97477",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    "status": "online",
    "bio": "When I first got into advertising, I was looking for the magical combination that would put website into the top search engine rankings",
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

## Local Development & Execution

### 1. Backend Setup & Execution
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
3. Run the local development server:
   ```bash
   python run.py
   ```
   *The server starts at `http://127.0.0.1:5000`.*

4. Run automated backend tests:
   ```bash
   pytest tests -v
   ```

### 2. Frontend Setup & Execution
1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Angular development server:
   ```bash
   npm start
   ```
   *The application starts at `http://localhost:4200/`.*

4. Run automated frontend unit tests:
   ```bash
   npm test -- --watch=false --browsers=ChromeHeadless
   ```

5. Build production bundle:
   ```bash
   npm run build
   ```

---

## Vercel Deployment

The project is structured for single-repository full-stack deployment on Vercel:
- `backend/api/index.py` & `api/index.py` expose the Flask WSGI instance (`app`).
- `requirements.txt` installs Python dependencies for serverless functions.
- `vercel.json` routes `/api/(.*)` and `/contacts(.*)` to the Python function, and serves the Angular single-page application for all other routes.
