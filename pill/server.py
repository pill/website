import os
import json
import logging

from flask import Flask
from flask import (
    jsonify,
    make_response,
    redirect,
    render_template,
    request,
    session,
    url_for,
    g
)

from pill import models
from pill import util
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
app.S = util.AttributeDict()
app.S.post = post_service.PostService()
app.S.user = user_service.UserService()

#=============
# Routes
#=============

#-------
# admin
#-------
@app.route('/office', methods=['GET'])
def office():
    context = {
        'section': 'office',
        'subsection': 'index'
    }
    return render_template('index.html', **context)

@app.route('/office/posts', methods=['GET'])
def posts_list():
    context = {
        'section': 'office',
        'subsection': 'post_list'
    }
    user = app.S.user.get_user_by_token(session.get('user_token'))
    if user:
        context['user'] = user.to_dict(keys=['username', 'user_token'])
    return render_template('index.html', **context)

@app.route('/office/posts/new', methods=['GET'])
def create_post():
    context = {
        'section': 'office',
        'subsection': 'post_new'
    }
    return render_template('index.html', **context)

@app.route('/office/posts/<post_id>', methods=['GET'])
def edit_single_post(post_id=None):
    context = {
        'section': 'office',
        'subsection': 'post_edit'
    }
    resp = make_response(render_template('index.html', **context))
    return resp

#----------
# homepage
#----------
@app.route('/')
def home():
    query = {}
    context = {'section': 'home'}
    return render_template('index.html', **context)

#------
# blog
#------
@app.route('/blog')
def blog():
    query = {}
    context = {'section': 'blog'}
    return render_template('index.html', **context)

#------
# blog
#------
@app.route('/work')
def work():
    query = {}
    context = {'section': 'work'}
    return render_template('index.html', **context)

#---------
# general
#---------
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
        # user, but did not verify username/password yet
        user =  app.S.user.get_db_user({
            'username':data.get('username'),
            'password':data.get('password')
        })
        if not user:
            error = 'User not found'
            status = 400
        else:
            # this issues a new session if successful
            logged_in_user = app.S.user.login(user)
            if not logged_in_user:
                error = 'Bad username/password'
                status = 400
            else:
                session['user_token'] = logged_in_user.user_token
                # for the response
                user_token = session['user_token']
                username = user.username

    resp = jsonify({
        'user_token': user_token,
        'username': username,
        'error': error
    })
    resp.status_code = status
    return resp

@app.route('/api/v1/auth_check', methods=['GET'])
@util.authenticated
def auth_check():
    """
    Returns the user if authenticated, else None
    """
    status = 200
    # TODO: use exception
    error = ''
    resp = jsonify({
        'user' : getattr(g, 'user', None),
        'error' : error
    })
    resp.status_code = status
    return resp

@app.route('/api/v1/logout', methods=['GET'])
def logout():
    # remove the username from the session if it's there
    session.pop('user_token', None)
    return redirect(url_for('blog'))

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
