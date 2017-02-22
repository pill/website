import logging

from pill.models import Post
from pill.db import conn
from pill.services.base import BaseService
from pill.settings import conf

log = logging.getLogger(__file__)

class PostService(BaseService):

    def get_posts(self, query):
        conn['posts'].find(query)

    def get_post(self):
        pass