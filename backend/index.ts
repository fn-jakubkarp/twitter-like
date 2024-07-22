import express, { Request, Response, NextFunction } from 'express';
import jsonServer from 'json-server';
import cors from 'cors';
import path from 'path';
import chalk from 'chalk'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve('build')));

app.use(cors());

app.use(express.json());

app.use('/api', jsonServer.router('db.json'));

app.use((_: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(chalk.yellow('---------------------------'));
  console.log(chalk.dim('Press CTRL + C to stop the server'));
  console.log(`Server started on http://localhost:${port}`);
  console.log(chalk.dim(`Navigate to the posts endpoint: http://localhost:${port}/api/posts`));
  console.log(chalk.yellow('---------------------------'));
});