"""Vercel serverless function entrypoint for backend."""

import os
import sys

# Ensure backend root is in python search path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app import create_app

# Instantiate Flask WSGI application for serverless execution
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
