import logging
from bson.objectid import ObjectId

from pill.models import Post
from pill.db import conn
from pill.services.base import BaseService
from pill.settings import conf

log = logging.getLogger(__file__)

class PostService(BaseService):

    def create_post(self, user, post_form_data):
        if not user:
            raise Exception('Not logged in')
        if not post_form_data.get('title'):
            raise Exception('Missing title')
        if not post_form_data.get('body'):
            raise Exception('Missing body')

        res = conn()['posts'].insert(post_form_data)
        return res

    def get_posts(self, user, query, page=1, rpp=20):
        page = page or 1
        rpp = rpp or 10
        offset = (page - 1) * rpp
        cursor = conn()['posts'].find(query)[offset:offset+rpp]
        docs = [self._clean_doc(doc) for doc in cursor]
        print(docs)
        return docs

    def _clean_doc(self, doc):
        doc['_id'] = str(doc['_id'])
        return doc

    def get_post(self, user, post_id):
        res = conn()['posts'].find({'_id': ObjectId('post_id')})
        return res

    def delete_post(self, user, post_id):
        if not user:
            raise Exception('Not logged in')
        print ("delete post", post_id)

    def update_post(self, user, post_id, post_form_data):
        if not user:
            raise Exception('Not logged in')
        print ("update_post", post_id, post_form_data)