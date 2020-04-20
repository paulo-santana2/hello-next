const axios = require('axios');

const createServer = require('./helpers/server.js');

const server = createServer();

beforeAll(async () => {
  await server.start();
});

afterAll(async (done) => {
  await server.stop();
  done();
});

describe('/randomQuote (E2E)', () => {
  test('Retorna uma citação aleatória esperada', async () => {
    const requestUrl = `${server.getUrl()}/api/randomQuote`;
    const response = await axios.get(requestUrl);

    expect(response.data).toEqual({
      quote: 'Write tests, not too many, mostly integration',
      author: 'Guillermo Rauch',
    });
  });

  test('Teste inútil', () => {
    const a = 1;
    expect(a).toEqual(1);
  });

  test('Outro teste inútil', () => {
    const a = 2;
    expect(a).toEqual(2);
  });
  
  test('Teste horrível', () => {
    expect(2 + 2).toBe(5);
  });
});
