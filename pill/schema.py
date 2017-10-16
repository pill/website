import logging
from flask import current_app, g
import graphene
from graphene.types import datetime

logger = logging.getLogger(__name__)

"""
GraphQL Schema for Post objects
"""

class Post(graphene.ObjectType):
    _id = graphene.ID()
    title = graphene.String()
    body = graphene.String()
    publish_status = graphene.String()
    author = graphene.String()
    created_on = datetime.DateTime()
    updated_on = datetime.DateTime()
    published_on = datetime.DateTime()

# -----------------
# Get query
# -----------------
class PostQuery(graphene.ObjectType):
    post = graphene.Field(Post, _id=graphene.ID())
    posts = graphene.List(Post, page=graphene.Int(), rpp=graphene.Int())

    def resolve_post(self, info, _id=None):
        p_data = current_app.S.post.get_post(_id)
        # make graphene object
        return Post(**p_data)

    def resolve_posts(self, info, page=None, rpp=None):
        posts = current_app.S.post.get_posts({}, page=page, rpp=rpp)
        return [Post(**p) for p in posts]

# -----------------
# CRUD
# -----------------
class PostInput(graphene.InputObjectType):
    _id = graphene.ID()
    title = graphene.String()
    body = graphene.String()
    publish_status = graphene.String()
    author = graphene.String()

class CreatePost(graphene.Mutation):
    class Arguments:
        post_form_data = PostInput()

    ok = graphene.Boolean()
    post = graphene.Field(lambda: Post)

    def mutate(self, info, post_form_data=None):
        # should already be authenticated
        user = getattr(g, 'user', None)
        pid = current_app.S.post.create_post(user, post_form_data)
        # get newly created post
        p_data = current_app.S.post.get_post(pid)
        # data back to client
        p = Post(
            _id = p_data.get('_id'),
            title = p_data.get('title'),
            body = p_data.get('body'),
            publish_status = p_data.get('publish_status'),
            author = p_data.get('author')
        )
        ok = True
        return CreatePost(post=p, ok=ok)

class UpdatePost(graphene.Mutation):
    class Arguments:
        post_form_data = PostInput()

    ok = graphene.Boolean()
    post = graphene.Field(lambda: Post)

    def mutate(self, info, post_form_data=None):
        # should already be authenticated
        user = getattr(g, 'user', None)
        post_id = post_form_data['_id']
        pid = current_app.S.post.update_post(user, post_id, post_form_data)
        # get updated post
        p_data = current_app.S.post.get_post(pid)
        # data back to client
        p = Post(
            _id = p_data.get('_id'),
            title = p_data.get('title'),
            body = p_data.get('body'),
            publish_status = p_data.get('publish_status'),
            author = p_data.get('author')
        )
        ok = True
        return CreatePost(post=p, ok=ok)

class DeletePost(graphene.Mutation):
    class Arguments:
        _id = graphene.ID()

    post_id = graphene.String()
    ok = graphene.Boolean()

    def mutate(self, info, _id=None):
        # should already be authenticated
        user = getattr(g, 'user', None)
        ok = True
        current_app.S.post.delete_post(user, _id)
        return DeletePost(post_id=_id, ok=ok)

class PostMutations(graphene.ObjectType):
    create_post = CreatePost.Field()
    update_post = UpdatePost.Field()
    delete_post = DeletePost.Field()

# -----------------
# Final Schema
# -----------------
post_schema = graphene.Schema(
    query=PostQuery,
    types=[Post,],
    mutation=PostMutations,
    auto_camelcase=False
)

