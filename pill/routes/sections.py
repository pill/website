import os
from flask import (
    g,
    make_response,
    render_template,
    request
)
from pill import util
from pill.server import app

#----------
# homepage
#----------
@app.route('/')
def home():
    query = {}
    context = {'section': 'home'}
    return render_template('index.html', **context)

#------
# blog
#------
@app.route('/blog')
def blog():
    query = {}
    context = {'section': 'blog', 'subsection': 'posts_list'}
    return render_template('index.html', **context)

@app.route('/blog/posts/<post_id>')
def blog_post(post_id):
    query = {}
    context = {'section': 'blog', 'subsection': 'single_post_view'}
    return render_template('index.html', **context)

#------
# work
#------
@app.route('/work')
def work():
    query = {}
    context = {'section': 'work'}
    return render_template('index.html', **context)