exports.config = {
  specs: ['built/test/*.e2e-spec.js'],
  capabilities: {browserName: 'chrome', chromeOptions: {args: ['--no-sandbox']}},
  directConnect: true,
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine',
  useAllAngular2AppRoots: true
};
