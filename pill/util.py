import random
import string

import functools
import logging

from flask import session

logger = logging.getLogger(__name__)


def gen_random_string(size=10, chars=string.ascii_letters + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

#=============
# Decorators
#=============

def authenticated(method):

    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        user_token = request.headers.get('user-token') or session.get('user-token')

        if not user_token:
            raise Exception('Authorization Exception')


        # self.current_user = yield self.app.service.user.get_by_token(user_token)
        #if not self.current_user:
        #    raise AuthorizationError

        return method(self, *args, **kwargs)
    return wrapper
