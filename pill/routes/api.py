import os
from flask import (
    jsonify,
    g,
    make_response,
    redirect,
    render_template,
    request,
    session,
    url_for
)
from pill.util import authenticated, pluck
from pill.schema import *
from pill.server import app


@app.route('/api/v1/login', methods=['POST'])
def login():
    """
    Checks username/password
    Logs user in and issues session token if successful
    """
    status = 200
    error = user_token = ''
    username, password = pluck(request.get_json(), 'username', 'password')
    # user, but did not verify username/password yet
    user = app.S.user.get_db_user({'username': username, 'password': password})
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
            # success!
            session['user_token'] = user_token = logged_in_user['user_token']
            username = user['username']

    resp = jsonify({
        'user_token': user_token,
        'username': username,
        'error': error
    })
    resp.status_code = status
    return resp

@app.route('/api/v1/auth_check', methods=['GET'])
@authenticated
def auth_check():
    """
    Returns the user if authenticated, else None
    """
    status = 200
    user = getattr(g, 'user', None)
    error = ''
    if not user:
        error = 'Not Authenticated'
        status = 401

    resp = jsonify({'user': user, 'error': error})
    resp.status_code = status
    return resp

@app.route('/api/v1/logout', methods=['GET'])
def logout():
    session.pop('user_token', None)
    return redirect(url_for('blog'))

#---------
# graphQL
#---------

@app.route('/graphql', methods=['GET'])
def graphql_get_api():
    query = request.args.get('query')
    res = post_schema.execute(query)
    res = jsonify(res.data)
    return res

@app.route('/graphql', methods=['POST'])
@authenticated
def graphql_post_api():
    # mutatations require authentication
    user = getattr(g, 'user', None)
    if not user:
        # not authenticated
        res = jsonify({ 'errors' : 'Not Authenticated'})
        res.status = 401
        return res

    mutation = request.data
    res = post_schema.execute(mutation)
    res = jsonify(res.data)
    return res