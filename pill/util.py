import random
import string

def gen_random_string(size=10, chars=string.ascii_letters + string.digits):
    return ''.join(random.choice(chars) for x in range(size))