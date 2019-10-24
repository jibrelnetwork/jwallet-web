const TEST_SERVER_PORT = process.env.TEST_SERVER_PORT || 3000

exports.config = {
  port: 9515,
  path: '/',
  services: [
    'chromedriver',
  ],
  runner: 'local',

  chromeDriverArgs: [
    '--port=9515',
  ],

  capabilities: [
    {
      browserName: 'Chrome',
    },
  ],

  baseUrl: `http://localhost:${TEST_SERVER_PORT}`,
}
