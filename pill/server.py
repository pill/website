import os
import json
import logging

from flask import Flask
from flask import render_template
from flask import request, session, jsonify

from pill import models
from pill.services import (
    post as post_service,
    user as user_service
)

app = Flask(
    __name__,
    static_folder='assets/client',
    template_folder='assets/templates')

#=============
# Services
#=============
S = {}
S['post'] = post_service.PostService()
S['user'] = user_service.UserService()

#=============
# Routes
#=============
@app.route('/')
def index():
    query = {}

    posts = S['post'].get_posts(query)
    context = {
        'section': 'main',
        'posts' : posts
    }
    return render_template('index.html', **context)

@app.route('/office', methods=['GET', 'POST'])
def admin():
    context = {
        'section': 'office'
    }
    return render_template('index.html', **context)

@app.route('/posts')
def posts():
    query = {}
    context = {
        'section': 'posts'
    }
    return render_template('index.html', **context)

@app.route('/work')
def work():
    query = {}
    context = {
        'section': 'work'
    }
    return render_template('index.html', **context)

@app.route('/static/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('static', path))

@app.errorhandler(404)
def page_not_found(error):
    return 'This route does not exist {}'.format(request.url), 404

#=============
# API
#=============

@app.route('/api/v1/login', methods=['POST'])
def login():
    status = 200
    error = ''
    token = ''
    if request.method == 'POST':
        user =  S['user'].get_db_user({
            'username':request.form['username'],
            'password':request.form['password']
        })
        if not user:
            error = 'User not found'
            status = 400
        else:
            is_valid = S['user'].validate_password(user)
            if not is_valid:
                error = 'Bad username/password'
                status = 400
            else:
                session['token'] = 'token'
                token = session['token']

    data = {
        'token': token,
        'error': error
    }
    resp = jsonify(data)
    resp.status_code = status
    return resp

@app.route('/api/v1/logout', methods=['POST'])
def logout():
    # remove the username from the session if it's there
    session.pop('token', None)
    return redirect(url_for('index'))


app.secret_key = '\x7f\x8aJB\xe1Pt\x0cr\xfe4\xc8\x03h\x0c\x83$\x90Q\xc8\xf7YXA'

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=8080)
