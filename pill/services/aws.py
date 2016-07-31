import logging

import boto
from boto.s3.key import Key

from pill.services.base import BaseService
from pill.settings import conf


log = logging.getLogger(__file__)

class AwsService(BaseService):

    def __init__(self):
        self._access_key_id = conf['aws']['key']
        self._secret_access_key = conf['aws']['secret']
        self._bucket_name = conf['aws']['bucket']
        self._bucket = None
        log.info('AWS service initialized')

    @property
    def bucket(self):
        if not self._bucket:
            log.info('Connecting to AWS...')

            aws_conn = boto.connect_s3(
                self._access_key_id, self._secret_access_key
            )

            self._bucket = aws_conn.get_bucket(self._bucket_name)
            log.info('S3 bucket connected')

        return self._bucket

    def s3_key(self):
        return Key(self.bucket)

