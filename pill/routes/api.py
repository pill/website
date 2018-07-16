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
from pill.util import authenticated, pluck, pluck_dict
from pill.schema import *
from pill.server import app


@app.route('/api/v1/login', methods=['POST'])
def login():
    """
    Checks username/password
    Logs user in and issues session token if successful
    """
    user_info = pluck_dict(request.get_json(), 'username', 'password')
    # user, but did not verify username/password yet
    user = app.S.user.get_db_user(user_info)
    if not user:
        resp = jsonify(dict(
            user_token='',
            username='',
            error='User not found'
        ))
        resp.status = 400
        return resp

    # this issues a new session if successful
    logged_in_user = app.S.user.login(user)
    if not logged_in_user:
        resp = jsonify(dict(
            user_token='',
            username='',
            error='Bad username/password'
        ))
        resp.status = 400
        return resp

    # success!
    user_token, username = pluck(logged_in_user, 'user_token', 'username')
    session['user_token'] = user_token
    session['username'] = username
    resp = jsonify(dict(user_token=user_token, username=username, error=''))
    resp.status_code = 200
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
        res = jsonify({'errors' : 'Not Authenticated'})
        res.status = 401
        return res

    mutation = request.data
    res = pill_schema.execute(mutation)
    res = jsonify(res.data)
    return res