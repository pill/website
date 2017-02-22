# models.py

class Model(object):
    pass

class Post(Model):

    def __init__(self, *args, **kwargs):
        self.title = kwargs.get('title')
        self.body = kwargs.get('body')
        self.author = kwargs.get('author')

class User(Model):

    def __init__(self, *args, **kwargs):
        self.username = kwargs.get('username', '')
        self.password = kwargs.get('password', '')
        # security token
        self.token = kwargs.get('token', '')
        self.salt = kwargs.get('salt', '')
        self.password_hash = kwargs.get('password_hash', '')
