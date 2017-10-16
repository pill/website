# Website

## From scratch
Install virtualenv, virtualenvwrapper
https://virtualenvwrapper.readthedocs.io/en/latest/
```
mkvirtualenv phil
```

Install mongodb
```
brew install mongodb
```

Start it
```
sudo mongod
```

Install python dependencies
```
pip install -r requirements.txtHi. Run the dev server like this:

export ENV='development'
export FLASK_APP=pill.server
export FLASK_DEBUG=1
flask run --host=0.0.0.0 --port=8080

and for assets:

NODE_ENV='development' npm run dev
```

Add to virtualenv .pth ( ~/.virtualenvs/phil/lib/python2.7/site-packages/phil.pth)
```
/Users/pavery/work/avery/website:
```

local server testing (in `/website directory`)
```
workon phil
python -m pill.server
```

## Setup Flask/uWSGI on the ubuntu server
follow this tutorial
http://vladikk.com/2013/09/12/serving-flask-with-nginx-on-ubuntu/

## Build assets
run this to build assets with webpack (in /website/pill)
```
npm run dev
```

# Run locally

Run the dev server like this (from root dir, where pill module lives)
```
export ENV='development'
export FLASK_APP=pill.server
export FLASK_DEBUG=1
flask run --host=0.0.0.0 --port=8080
```

Build assets like this via root dir (where package.json lives). NODE_ENV='development' is the switch for endpoint API urls and other settings.
```
NODE_ENV='development' npm run dev
```