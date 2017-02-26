import hashlib
import uuid
import logging

from pill import models
from pill.db import conn
from pill.services.base import BaseService
from pill.settings import conf

log = logging.getLogger(__file__)

class UserService(BaseService):

    def get_db_user(self, userdata):
        # userdata is a dict with user attrs
        # db_user returned with userdata overlaid
        assert userdata
        user = None
        cursor = conn['users'].find({'username': userdata['username']})
        try:
            db_user_data = cursor.next()
            if db_user_data:
                db_user_data.update(userdata)
                user = models.User(**db_user_data)
        except:
            log.debug('user not found')
        return user

    def encrypt_password(self, user):
        user.salt = uuid.uuid4().hex
        user.password_hash = self._encrypt_password(user.salt, user.password)

    def validate_password(self, user):
        is_valid = self.check_password(user)
        return is_valid

    def check_password(self, user):
        password_hash = self._encrypt_password(user.salt, user.password)
        return password_hash == user.password_hash

    def _encrypt_password(self, salt, password):
        return hashlib.sha512(salt + password).hexdigest()