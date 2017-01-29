from pill.models import Post
from pill.db import conn

def get_posts(query):
    conn['posts'].find(query)

def get_post():
    pass