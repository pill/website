import random
import string

import functools
import logging
from datetime import timedelta
from functools import update_wrapper
from flask import session, request, current_app, g, make_response

from pill.exception import AuthException

logger = logging.getLogger(__name__)


def gen_random_string(size=10, chars=string.ascii_letters + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

class AttributeDict(dict):
    """
    A dictionary-like object allowing indexed and attribute access.
    """
    def __init__(self, *args, **kwargs):
        super(AttributeDict, self).__init__(*args, **kwargs)
        self.__dict__ = self

#=============
# Decorators
#=============

def authenticated(method):
    """
    Checks header or session for user_token and checks if it's valid
    Assigns that user to flask app context 'g'
    """
    @functools.wraps(method)
    def wrapper(*args, **kwargs):
        user_token = request.headers.get('user_token') or session.get('user_token')
        if not user_token:
            #raise AuthException('Not Authenticated')
            print ('Not Authenticated')

        user = current_app.S.user.get_user_by_token(user_token)
        if not user:
            #raise AuthException('Not Authenticated')
            print ('Not Authenticated')

        # assign to app context
        if user:
            g.user = user.to_dict(keys=['username', 'user_token'])

        return method(*args, **kwargs)
    return wrapper


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator
