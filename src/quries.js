const Pool = require('pg').Pool;
const Hashids = require('hashids/cjs');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { 
      rejectUnauthorized: false 
    }
});

const hashids = new Hashids("Shittttttttttttttttt");

const getOriginalUrl = (request, response) => {
    try{
        pool.query('SELECT * FROM urls', (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    }catch(e){
        response.status(404).send(`something went wrong`);
    }
}

const createShortUrl = (request, response) => {
    const id = parseInt(request.params.id);
    const short_url = hashids.encode(1, 2, 3);
    const { original_url } = request.body;
    try{
        pool.query('INSERT INTO urls (short_url, original_url) VALUES ($1, $2)', [short_url, original_url], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`short url is : ${short_url}`);
        })
    }catch(e){
        response.status(404).send(`something went wrong`);
    }
}

module.exports = {
    createShortUrl,
    getOriginalUrl,
}