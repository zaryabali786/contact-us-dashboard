"""Local development runner for Flask backend."""

from app import create_app

app = create_app()

if __name__ == '__main__':
    print("==================================================")
    print("  Contact Management Backend REST API running")
    print("  Endpoints:")
    print("    GET  http://127.0.0.1:5000/contacts")
    print("    GET  http://127.0.0.1:5000/contacts/<id>/email_addresses")
    print("    GET  http://127.0.0.1:5000/api/contacts")
    print("    GET  http://127.0.0.1:5000/api/contacts/<id>/email_addresses")
    print("    GET  http://127.0.0.1:5000/health")
    print("==================================================")
    app.run(host='127.0.0.1', port=5000, debug=True)
