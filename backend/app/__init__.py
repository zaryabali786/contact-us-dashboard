"""Flask application factory with CORS, route registration, and error handling."""

from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.contact_routes import contacts_bp


def create_app(test_config=None) -> Flask:
    """Application factory creating the Flask app instance."""
    app = Flask(__name__)

    # Configure CORS for all origins and headers
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Default configuration
    app.config.from_mapping(
        JSON_SORT_KEYS=False,
        JSONIFY_PRETTYPRINT_REGULAR=True
    )

    if test_config:
        app.config.update(test_config)

    # Health check endpoints
    @app.route('/health', methods=['GET'])
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "contact-management-api",
            "version": "1.0.0"
        }), 200

    # Register blueprint:
    # 1. Direct /contacts (e.g. GET /contacts, GET /contacts/<id>/email_addresses)
    app.register_blueprint(contacts_bp, url_prefix='')
    # 2. Prefixed /api/contacts (e.g. GET /api/contacts, GET /api/contacts/<id>/email_addresses)
    app.register_blueprint(contacts_bp, url_prefix='/api', name='contacts_api')

    # Error handling
    @app.errorhandler(404)
    def handle_not_found(error):
        return jsonify({
            "error": "Not Found",
            "message": "The requested resource was not found on this server.",
            "status_code": 404
        }), 404

    @app.errorhandler(405)
    def handle_method_not_allowed(error):
        return jsonify({
            "error": "Method Not Allowed",
            "message": "The method is not allowed for the requested URL.",
            "status_code": 405
        }), 405

    @app.errorhandler(500)
    def handle_internal_error(error):
        return jsonify({
            "error": "Internal Server Error",
            "message": "An unexpected server error occurred.",
            "status_code": 500
        }), 500

    return app
