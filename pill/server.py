import os
import json
import logging

from flask import Flask
from flask import (
    jsonify,
    make_response,
    redirect,
    render_template,
    request,
    session,
    url_for,
    g
)
from pill import util
from pill.services import (
    post as post_service,
    user as user_service
)

"""
Hi. Run the dev server like this:

export ENV='development'
export FLASK_APP=pill.server
export FLASK_DEBUG=1
flask run --host=0.0.0.0 --port=8080

and for assets:

NODE_ENV='development' npm run dev
"""

app = Flask(
    __name__,
    static_folder='../assets/client',
    template_folder='../assets/templates')

app.secret_key = '\xb3\xf1\xe8\xdc\x0fQ\xd6\xdc]\x8c\\\xea\xb4lL\x84o\xe9\xe3\xf8\xda\x1f\xfc\x16'
app.debug = True

#=============
# Services
#=============
app.S = util.AttributeDict()
app.S.post = post_service.PostService()
app.S.user = user_service.UserService()

#=============
# Routes
#=============

import pill.routes.admin
import pill.routes.api
import pill.routes.sections

#---------
# general
#---------
@app.route('/static/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('static', path))

@app.errorhandler(404)
def page_not_found(error):
    return 'This route does not exist {}'.format(request.url), 404

