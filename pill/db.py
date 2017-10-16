from pymongo import MongoClient
from flask import g
from pill.settings import conf

def conn():
    """
    Mongo database connection. Stored on app context (g).
    """
    _conn = getattr(g, '_conn', None)
    if _conn is None:
        _conn = g._conn = MongoClient(conf['mongo']['host'])[conf['mongo']['db']]
    return _conn