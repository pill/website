import os

from flask import Flask
from flask import render_template

from pill.services import posts as post_service

app = Flask(
    __name__,
    static_folder='assets/client',
    template_folder='assets/templates')

@app.route('/')
def index():
    query = {}
    posts = post_service.get_posts(query)
    context = {
        'section': 'index',
        'posts' : posts
    }
    return render_template('index.html', **context)

@app.route('/office')
def admin():
    query = {}
    context = {
        'section': 'office'
    }
    return render_template('index.html', **context)

@app.route('/static/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('static', path))

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=8080)