import os
import json
import logging

from flask import Flask
from flask import render_template
from flask import (
    request, session, jsonify, make_response, redirect, url_for
)

from pill import models
from pill.services import (
    post as post_service,
    user as user_service
)
from pill import util

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

    user = None
    user_token = session.get('user_token')
    if user_token:
        user = S['user'].get_user_by_token(user_token)

    context = {'section': 'office'}
    # TODO: use @authenticated decorator
    if user:
        context['user'] = user.to_dict(keys=['_id', 'username', 'user_token'])

    resp = make_response(render_template('index.html', **context))
    return resp

@app.route('/posts')
def posts():
    query = {}
    context = {'section': 'posts'}
    return render_template('index.html', **context)

@app.route('/work')
def work():
    query = {}
    context = {'section': 'work'}
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
    """
    Checks username/password
    Logs user in and issues session token if successful
    """
    status = 200
    error = ''
    user_token = ''
    username = ''
    if request.method == 'POST':
        data = request.get_json()
        # user, but did not verify user_token
        user =  S['user'].get_db_user({
            'username':data.get('username'),
            'password':data.get('password')
        })
        if not user:
            error = 'User not found'
            status = 400
        else:
            # this issues a new session if successful
            logged_in_user = S['user'].login(user)
            if not logged_in_user:
                error = 'Bad username/password'
                status = 400
            else:
                session['user_token'] = logged_in_user.user_token
                # for the response
                user_token = session['user_token']
                username = user.username

    data = {
        'user_token': user_token,
        'username': username,
        'error': error
    }
    resp = jsonify(data)
    resp.status_code = status
    return resp

@app.route('/api/v1/auth_check', methods=['GET'])
def auth_check():
    """
    Returns the user if authenticated, else None
    """
    status = 200
    # TODO: use exception
    error = ''
    user = S['user'].get_user_by_token(session.get('user_token'))
    if user:
        user = user.to_dict(keys=['username', 'user_token'])
    data = {
        'user' : user,
        'error' : error
    }
    resp = jsonify(data)
    resp.status_code = status
    return resp

@app.route('/api/v1/logout', methods=['GET'])
def logout():
    # remove the username from the session if it's there
    session.pop('user_token', None)
    return redirect(url_for('index'))

app.secret_key = '\xb3\xf1\xe8\xdc\x0fQ\xd6\xdc]\x8c\\\xea\xb4lL\x84o\xe9\xe3\xf8\xda\x1f\xfc\x16'
app.debug = True
# app.config.update(dict(
#     # SERVER_NAME = 'localhost:8080',
#     # SESSION_COOKIE_NAME = '127.0.0.1:8080',
#     # SESSION_COOKIE_DOMAIN = '127.0.0.1:8080'
# ))


# if __name__ == "__main__":
#     app.debug = True
#     app.run(host='0.0.0.0', port=8080)
