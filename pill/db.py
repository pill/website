from pymongo import MongoClient

from pill.settings import conf

CONN = MongoClient(conf['mongo']['host'])[conf['mongo']['db']]
