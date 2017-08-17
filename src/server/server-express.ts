import * as express from 'express';
import {resolve} from 'path';

export function startServer(): void {
  const app = express();
  const port = 8000;

  const folder = resolve(__dirname, '../../dist');

  console.log('Serving from', folder);

  app.get('/', function(req, res) {
    res.sendFile(folder + '/index.html');
  });

  app.use('/', express.static(folder, {index: false}));

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}
