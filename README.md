#Website
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
pip install -r requirements.txt
```

Add to virtualenv .pth ( ~/.virtualenvs/phil/lib/python2.7/site-packages/phil.pth)
```
/Users/pavery/work/avery/website:
```

local testing (in `/website directory`)
```
workon phil
python -m pill.server
```

#Setup Flask/uWSGI on the ubuntu server
follow this tutorial
http://vladikk.com/2013/09/12/serving-flask-with-nginx-on-ubuntu/

#Build assets
run this to build assets
```
browserify -t [ babelify ] assets/static/js/main.js -o assets/static/bundle.js
```