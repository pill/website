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

    def resolve_post(self, info, _id=None):
        print('resolving post:', _id)
        # get data from mongodb
        p_data = current_app.S.post.get_post(_id)
        # make graphene object
        return Post(**p_data)

schema = graphene.Schema(query=Query, auto_camelcase=False)

"""
ResolveInfo
        self.field_name = field_name
        self.field_asts = field_asts
        self.return_type = return_type
        self.parent_type = parent_type
        self.schema = schema
        self.fragments = fragments
        self.root_value = root_value
        self.operation = operation
        self.variable_values = variable_values
        self.context = context
"""