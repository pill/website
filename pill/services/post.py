from bson.objectid import ObjectId
import datetime
import logging
from pill.db import conn
from pill.services.base import BaseService
from pill.settings import conf

log = logging.getLogger(__file__)

class PostService(BaseService):

    def _clean_doc(self, doc):
        if not doc:
            return None
        doc['_id'] = str(doc['_id'])
        return doc

    def create_post(self, user, post_form_data):
        if not user:
            raise Exception('Not logged in')
        if not post_form_data.get('title'):
            raise Exception('Missing title')
        if not post_form_data.get('body'):
            raise Exception('Missing body')

        post_form_data['created_on'] = datetime.datetime.now()
        post_form_data['updated_on'] = datetime.datetime.now()
        if post_form_data['publish_status'] == 'published':
            post_form_data['published_on'] = datetime.datetime.now()
        res = conn()['posts'].insert(post_form_data)
        return res

    def get_post(self, post_id):
        res = conn()['posts'].find({'_id': ObjectId(post_id)})
        return self._clean_doc(res.next())

    def get_posts(self, query, page=1, rpp=20):
        page = page or 1
        rpp = rpp or 10
        offset = (page - 1) * rpp
        cursor = conn()['posts'].find(query)[offset:offset+rpp]
        docs = [self._clean_doc(doc) for doc in cursor]
        return docs

    def delete_post(self, user, post_id):
        if not user:
            raise Exception('Not logged in')
        post = self.get_post(post_id)
        object_id = ObjectId(post_id)
        # post needs needs ObjectId to do an update
        post['_id'] = object_id
        conn()['posts_trash'].update({'_id': object_id}, post, True)
        conn()['posts'].delete_one({'_id': object_id})

    def update_post(self, user, post_id, post_form_data):
        if not user:
            raise Exception('Not logged in')

        post_data = post_form_data
        post_data['updated_on'] = datetime.datetime.now()
        if post_form_data['publish_status'] == 'published':
            post_data['published_on'] = datetime.datetime.now()
        conn().posts.update({'_id': ObjectId('post_id')}, {'$set', post_data})
