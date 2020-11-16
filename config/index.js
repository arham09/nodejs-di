require('dotenv').config()

module.exports = {
  mongoUrl: process.env.MONGOURL,
  pgUrl: process.env.PGURL,
  port: process.env.PORT
}