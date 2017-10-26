import random
import string

import functools
import logging
from datetime import timedelta
from functools import update_wrapper
from flask import session, request, current_app, g, make_response

from pill.exception import AuthException

log = logging.getLogger(__name__)


def pluck(data, *keys):
    """
    Returns `keys` values from a dict.
    Good for multi assigning variables straight from a dict.
    """
    return [data.get(k) for k in keys]

def pluck_dict(data, *keys):
    """
    Returns a smaller dict with just `keys`.
    """
    d = {}
    for k in keys:
        d[k] = data.get(k)
    return d

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
    Checks header or session for user_token and checks if it's valid.
    Assigns that user to flask app context 'g'.
    """
    @functools.wraps(method)
    def wrapper(*args, **kwargs):
        user_token = request.headers.get('user_token') or session.get('user_token')
        if not user_token:
            log.warning('Not Authenticated')

        user = current_app.S.user.get_user_by_token(user_token)
        if not user:
            log.warning('Not Authenticated')

        # assign to app context
        if user:
            g.user = {
                'username': user['username'],
                'user_token': user['user_token']
            }

        return method(*args, **kwargs)
    return wrapper

