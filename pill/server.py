import os

from flask import Flask
from flask import render_template

from pill import db

app = Flask(
    __name__,
    static_folder='assets/static',
    template_folder='assets/templates')

@app.route('/')
def index():
    #COLLECTION = DB['test']
    #COLLECTION.update({'test' : 'onetwo'}, {'test' : 'onetwo'}, upsert=True)
    return render_template('index.html')

@app.route('/static/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(os.path.join('static', path))

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=8080)