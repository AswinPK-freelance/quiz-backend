import dotenv from "dotenv";
import express from "express";
import setupMiddlewares from "./middleware/setup.middleware.js";
import routerMiddleware from "./middleware/router.middleware.js";

dotenv.config();

const app = express();

setupMiddlewares(app);
routerMiddleware(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));
