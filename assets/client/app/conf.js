
const host = process.env.NODE_ENV === 'development'
                  ? 'http://127.0.0.1:8080'
                  : 'http://phil.avery.nyc'

console.log("webpack built js in NODE_ENV: ", process.env.NODE_ENV)

const Conf = {
  host: host,
  logging: {
    enabled: true,
    collapse: false
  }
}

export default Conf