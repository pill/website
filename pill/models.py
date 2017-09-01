class Model(object):
    pass

class Post(Model):

    def __init__(self, *args, **kwargs):
        self._id = kwargs.get('_id', '')
        self.title = kwargs.get('title')
        self.body = kwargs.get('body')
        self.author = kwargs.get('author')

class User(Model):

    def __init__(self, *args, **kwargs):
        self._id = kwargs.get('_id', '')
        self.username = kwargs.get('username', '')
        self.password = kwargs.get('password', '')
        # security token
        self.user_token = kwargs.get('user_token', '')
        self.salt = kwargs.get('salt', '')
        self.password_hash = kwargs.get('password_hash', '')

    def to_dict(self, keys=None):
        # never put clear text password in here
        if not keys:
            keys = ['_id', 'username', 'user_token', 'salt', 'password_hash']

        return {k : getattr(self, k) for k in keys}

