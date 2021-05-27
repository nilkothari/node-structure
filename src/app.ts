import express, { Request, Response, NextFunction } from 'express';
import Logger from './core/Logger';
import helmet from 'helmet';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { corsUrl, environment } from './config';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import routesV1 from './routes/v1';
import { schema } from './graphql';
import authentication from './auth/authentication';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// // secure express app
// app.use(
//   helmet({
//     dnsPrefetchControl: false,
//     frameguard: false,
//     ieNoOpen: false,
//   }),
// );

// Authenticate Request
app.use('/', authentication);

// Routes
app.use('/v1', routesV1);

const graphQLServer = new ApolloServer({
  schema,
  debug: environment !== 'production' ? true : false,
  playground: environment !== 'production' ? true : false,
  context: (context) => {
    return context;
  },
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    // Otherwise return the original error. The error can also
    // be manipulated in other ways, as long as it's returned.
    return err;
  },
});

// Applied graphQL server as express middleware
graphQLServer.applyMiddleware({ app });

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
