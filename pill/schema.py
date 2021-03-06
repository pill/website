import logging
from flask import current_app, g
import graphene
import mistune
from graphene.types import datetime
from pill.util import pluck_dict

log = logging.getLogger(__name__)
renderer = mistune.Renderer(escape=True, hard_wrap=True)
markdown = mistune.Markdown(renderer=renderer)

"""
GraphQL Schema for Post objects
"""

class Post(graphene.ObjectType):
    _id = graphene.ID()
    title = graphene.String()
    body = graphene.String() # markdown
    body_html = graphene.String()
    publish_status = graphene.String()
    author = graphene.String()
    created_on = datetime.DateTime()
    updated_on = datetime.DateTime()
    published_on = datetime.DateTime()

class Image(graphene.ObjectType):
    _id = graphene.ID()
    path = graphene.String()
    created_on = datetime.DateTime()

# -----------------
# Get query
# -----------------
class Query(graphene.ObjectType):
    post = graphene.Field(Post, _id=graphene.ID())
    posts = graphene.List(Post, page=graphene.Int(), rpp=graphene.Int())

    image = graphene.Field(Image, _id=graphene.ID())
    images = graphene.List(Image, page=graphene.Int(), rpp=graphene.Int())

    def resolve_post(self, info, _id=None):
        p_data = current_app.S.post.get_post(_id)

        # check info that 'body_html' in fields
        if 'body' in p_data:
            p_data['body_html'] = markdown(p_data['body'])

        # make graphene object
        return Post(**p_data)

    def resolve_posts(self, info, page=None, rpp=None):
        posts = current_app.S.post.get_posts({}, page=page, rpp=rpp)
        # body_html?
        return [Post(**p) for p in posts]

    def resolve_image(self, info, _id=None):
        pass

    def resolve_images(self, info, page=None, rpp=None):
        pass

# -----------------
# CRUD
# -----------------

# -----------------
# Post
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
        log.info("Create mutation %s", post_form_data)
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
            # body_html?
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
        log.info("Update mutation %s", post_form_data)
        # should already be authenticated
        user = getattr(g, 'user', None)
        # from PostInput to dict, do update
        keys = ['_id', 'title', 'body', 'publish_status', 'author']
        data_dict = pluck_dict(post_form_data, *keys)
        pid = current_app.S.post.update_post(user, data_dict['_id'], data_dict)
        # get newly updated post
        updated_post = current_app.S.post.get_post(pid)
        print(" updated post >> ", updated_post)
        p_data = pluck_dict(updated_post, *keys)
        p = Post(**p_data)
        ok = True
        return UpdatePost(post=p, ok=ok)

class DeletePost(graphene.Mutation):
    class Arguments:
        _id = graphene.ID()

    post_id = graphene.String()
    ok = graphene.Boolean()

    def mutate(self, info, _id=None):
        log.info("Delete mutation %s", _id)
        # should already be authenticated
        user = getattr(g, 'user', None)
        ok = True
        current_app.S.post.delete_post(user, _id)
        return DeletePost(post_id=_id, ok=ok)

class Mutations(graphene.ObjectType):
    create_post = CreatePost.Field()
    update_post = UpdatePost.Field()
    delete_post = DeletePost.Field()
    # create_image = CreateImage.Field()
    # delete_image = DeleteImage.Field()

# -----------------
# Final Post Schema
# -----------------
post_schema = graphene.Schema(
    query=Query,
    types=[Post,Image],
    mutation=Mutations,
    auto_camelcase=False
)

