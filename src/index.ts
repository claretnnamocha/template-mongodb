import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import formdata from "express-form-data";
import swaggerUi from "swagger-ui-express";
import { response } from "./helpers";
import { displayName } from "../package.json";
import { bullBoard, db, env, security, swagger } from "./configs";
import routes from "./routes";

const app = express();
const { port } = env;
db.authenticate({clear:true});

app.use(formdata.parse());
app.use(express.json({ limit: "100mb", type: "application/json" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger.config));
app.use("/bull-board", bullBoard.adapter.getRouter());

security.lock(app);

app.use("", routes);
app.use((err: Error, _: Request, res: Response, next: NextFunction) =>
  response(
    res,
    { status: false, message: `Internal server error: ${err.message}` },
    500
  )
);

if (require.main) {
  app.listen(port, () => {
    console.log(
      `${displayName} is running on http://localhost:${port} (${env.env})`
    );
  });
}

export default app;
