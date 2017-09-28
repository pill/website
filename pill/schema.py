import graphene
from flask import current_app
import logging

logger = logging.getLogger(__name__)

class Post(graphene.ObjectType):
    _id = graphene.ID()
    title = graphene.String()
    body = graphene.String()
    publish_status = graphene.String()
    author = graphene.String()

class Query(graphene.ObjectType):
    post = graphene.Field(Post, _id=graphene.ID())
    posts = graphene.List(Post, page=graphene.Int(), rpp=graphene.Int())

    def resolve_post(self, info, _id=None):
        p_data = current_app.S.post.get_post(_id)
        # make graphene object
        return Post(**p_data)

    def resolve_posts(self, info, page=None, rpp=None):
        posts = current_app.S.post.get_posts({}, page=page, rpp=rpp)
        return [Post(**p) for p in posts]

post_schema = graphene.Schema(query=Query, types=[Post,], auto_camelcase=False)

