import * as express from 'express';
import teamRouter from './Routers/TeamRouter';
import userRouter from './Routers/UserRouter';
// import UserMiddleware from './Middlewares/UserMiddleware';

class App {
  public app: express.Express;

  constructor(private team = teamRouter, private user = userRouter) {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/teams', this.team);
    this.app.use('/teams/:id', this.team);
    this.app.use('/login', this.user);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}
export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
