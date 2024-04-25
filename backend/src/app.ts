import express, { Application } from 'express';
import cors from 'cors';
import mainRouter from './routes';

class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.initializeMiddlewares();
    this.mountRoutes();
  }

  private initializeMiddlewares(): void {
    this.express.use(cors());  // Enable CORS
    this.express.use(express.json());  // For parsing application/json
    this.express.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
  }

  private mountRoutes(): void {
    this.express.use('/api', mainRouter);  // All routes are now under the /api base path
  }
}

export default new App().express;