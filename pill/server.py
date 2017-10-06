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
#from flask_cors import CORS

from pill import models
from pill import util
from pill.services import (
    post as post_service,
    user as user_service
)

from pill.schema import *

"""
Hi. Run the dev server like this:

export ENV='development'
export FLASK_APP=pill.server
export FLASK_DEBUG=1
flask run --host=0.0.0.0 --port=8080

and for assets:

NODE_ENV='development' npm run dev
"""

app = Flask(
    __name__,
    static_folder='assets/client',
    template_folder='assets/templates')

app.secret_key = '\xb3\xf1\xe8\xdc\x0fQ\xd6\xdc]\x8c\\\xea\xb4lL\x84o\xe9\xe3\xf8\xda\x1f\xfc\x16'
app.debug = True

# allow cross domain
#CORS(app)

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
@util.authenticated
def posts_list():
    user = getattr(g, 'user', None)
    if not user:
        pass
    context = {
        'section': 'office',
        'subsection': 'post_list'
    }
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
    context = {'section': 'blog', 'subsection': 'posts_list'}
    return render_template('index.html', **context)

@app.route('/blog/posts/<post_id>')
def blog_post(post_id):
    query = {}
    context = {'section': 'blog', 'subsection': 'single_post_view'}
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

    # only accepts POST
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
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/api/v1/logout', methods=['GET'])
def logout():
    # remove the username from the session if it's there
    session.pop('user_token', None)
    return redirect(url_for('blog'))

# @app.route('/api/v1/posts', methods=['POST'])
# @util.authenticated
# def create_post_api():
#     success = error = ''
#     user = getattr(g, 'user', None)
#     data = request.get_json()
#     try:
#         pid = app.S.post.create_post(user, data)
#         res = jsonify(
#             {'success': 'Post Created with id: {}'.format(pid)}
#         )
#         res.status_code = 200
#     except Exception as e:
#         res = jsonify({'error': str(e)})
#         res.status_code = 400
#     return res

# @app.route('/api/v1/posts/<string:post_id>', methods=['POST'])
# @util.authenticated
# def update_post_api(post_id):
#     success = error = ''
#     user = getattr(g, 'user', None)
#     data = request.get_json()
#     try:
#         pid = app.S.post.update_post(user, post_id, data)
#         res = jsonify(
#             {'success': 'Post Updated with id: {}'.format(pid)}
#         )
#         res.status_code = 200
#     except Exception as e:
#         res = jsonify({'error': str(e)})
#         res.status_code = 400
#     return res

# @app.route('/api/v1/posts/<string:post_id>', methods=['DELETE'])
# @util.authenticated
# def delete_post_api(post_id):
#     success = error = ''
#     user = getattr(g, 'user', None)
#     #try:
#     pid = app.S.post.delete_post(user, post_id)
#     res = jsonify(
#         {'success': 'Post Deleted with id: {}'.format(post_id)}
#     )
#     res.status_code = 200
#     # except Exception as e:
#     #     print (e)
#     #     res = jsonify({'error': str(e)})
#     #     res.status_code = 400
#     return res

# @app.route('/api/v1/posts', methods=['GET'])
# def get_posts_api():
#     success = error = ''
#     page = int(request.args.get('page', 1))
#     rpp = int(request.args.get('rpp', 10))
#     query = {}
#     print("getting posts")
#     posts = app.S.post.get_posts(query, page=page, rpp=rpp)
#     res = jsonify({'posts': posts})
#     res.status_code = 200
#     return res

# @app.route('/api/v1/posts/<string:post_id>', methods=['GET'])
# def get_post_api(post_id):
#     success = error = ''
#     post = app.S.post.get_post(post_id)
#     res = jsonify({'post': post})
#     res.status_code = 200
#     return res

@app.route('/graphql', methods=['GET'])
def graphql_get_api():
    query = request.args.get('query')
    print('raw query', query)
    res = post_schema.execute(query)
    res = jsonify(res.data)
    return res

@app.route('/graphql', methods=['POST'])
@util.authenticated
def graphql_post_api():
    user = getattr(g, 'user', None)
    if not user:
        # not authenticated
        res = jsonify({ 'errors' : 'Not Authenticated'})
        res.status = 401
        return res

    # query as a string
    query = request.data
    res = post_schema.execute(query)
    print('res', res.errors, res.data, res.invalid)
    res = jsonify(res.data)
    return res

# app.config.update(dict(
#     # SERVER_NAME = 'localhost:8080',
#     # SESSION_COOKIE_NAME = '127.0.0.1:8080',
#     # SESSION_COOKIE_DOMAIN = '127.0.0.1:8080'
# ))


# if __name__ == "__main__":
#     app.debug = True
#     app.run(host='0.0.0.0', port=8080)
