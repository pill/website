from pymongo import MongoClient

from pill.settings import conf

conn = MongoClient(conf['mongo']['host'])[conf['mongo']['db']]

