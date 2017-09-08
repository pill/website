import random
import string

import functools
import logging

from flask import session, request, current_app, g

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
