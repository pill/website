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
        self.token = kwargs.get('token', '')
        self.salt = kwargs.get('salt', '')
        self.password_hash = kwargs.get('password_hash', '')

    def to_dict(self):
        # never put clear text password in here
        keys = ['_id', 'username', 'token', 'salt', 'password_hash']
        return {k : getattr(self, k) for k in keys}

