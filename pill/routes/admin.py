import os
from flask import (
    g,
    make_response,
    render_template
)
from pill import util
from pill.server import app


@app.route('/office', methods=['GET'])
def office():
    context = {
        'section': 'office',
        'subsection': 'index'
    }
    return render_template('index.html', **context)

@app.route('/office/posts', methods=['GET'])
@util.authenticated
def posts_list():
    user = getattr(g, 'user', None)
    if not user:
        pass
    context = {
        'section': 'office',
        'subsection': 'post_list'
    }
    return render_template('index.html', **context)

@app.route('/office/posts/new', methods=['GET'])
def create_post():
    context = {
        'section': 'office',
        'subsection': 'post_new'
    }
    return render_template('index.html', **context)

@app.route('/office/posts/<post_id>', methods=['GET'])
def edit_single_post(post_id=None):
    context = {
        'section': 'office',
        'subsection': 'post_edit'
    }
    resp = render_template('index.html', **context)
    return resp
