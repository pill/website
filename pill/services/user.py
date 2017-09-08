import hashlib
import uuid
import logging
from bson.objectid import ObjectId

from pill import models
from pill.db import conn
from pill.services.base import BaseService
from pill.settings import conf
from pill import util

log = logging.getLogger(__file__)

class UserService(BaseService):

    def get_user_by_token(self, user_token):
        """
        Gets a user by user_token, which is stored in
        a Flask session variable. The token is never exposed
        to the end user since session uses secure cookies.
        """
        if not user_token:
            return None

        user = None
        cursor = conn()['users'].find({'user_token': user_token})
        try:
            db_user_data = cursor.next()
            # TODO: make transient fields
            db_user_data.pop('salt')
            db_user_data.pop('password_hash')
            if db_user_data:
                user = models.User(**db_user_data)
        except:
            log.debug('user not found')
        return user

    def get_db_user(self, userdata):
        # userdata is a dict with user attrs
        # db_user returned with userdata overlaid
        assert userdata
        user = None
        cursor = conn()['users'].find({'username': userdata['username']})
        try:
            db_user_data = cursor.next()
            if db_user_data:
                # don't add token until login!
                if 'user_token' in db_user_data:
                    db_user_data.pop('user_token')
                db_user_data.update(userdata)
                # return a user Model
                user = models.User(**db_user_data)
        except:
            log.debug('user not found')
        return user

    def login(self, user):
        print ("login")
        is_valid = self.validate_password(user)
        if is_valid:
            user = self.get_db_user(user.to_dict())
            user.user_token = util.gen_random_string()
            user_dict = user.to_dict()
            conn()['users'].update(
                {'_id': ObjectId(user._id)},
                {'$set': user_dict}
            )
            return user
        return None

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
        if password == None:
            password = ''
        return hashlib.sha512(salt + password).hexdigest()
