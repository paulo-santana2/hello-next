import microCors from 'micro-cors';

const cors = microCors();

async function Quote(req, res) {
  res.status(200).json({
    quote: 'Write tests, not too many, mostly integration',
    author: 'Guillermo Rauch',
  });
}

export default cors(Quote);
