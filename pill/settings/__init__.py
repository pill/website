import os

from pill.settings.default import conf

ENV = os.environ.get('ENV', 'dev')

update_conf = {}
if ENV == 'dev':
    from pill.settings.dev import conf as update_conf
elif ENV == 'prod':
    from pill.settings.prod import conf as update_conf

conf.update(update_conf)
