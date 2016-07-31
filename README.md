#Website
local testing (in `/website/site directory`)
```
python -m SimpleHTTPServer
```

#Flask (on ubuntu server)

sudo apt-get install python-virtualenv
sudo apt-get install build-essential python-dev
sudo apt-get install libxml2-dev
sudo apt-get install libxslt1-dev

sudo pip install uwsgi

instructions for uwsgi server:
http://vladikk.com/2013/09/12/serving-flask-with-nginx-on-ubuntu/

```
sudo apt-get install build-essential python python-dev python-pip
```

#Build assets
```
browserify -t [ babelify ] assets/static/js/main.js -o src/static/bundle.js
```