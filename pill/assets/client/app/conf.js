const env = 'production'
const host = env == 'development'
                  ? 'http://127.0.0.1:8080'
                  : 'http://phil.avery.nyc'
console.log("host > ", host)
const Conf = {
  host: host,
  logging: {
    enabled: true,
    collapse: false
  }
}

export default Conf