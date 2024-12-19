import cors from "cors";
import logger from "morgan";
import compression from "compression";
import express from "express";
import { connect } from "../config/dbConnection.js";

function setupMiddlewares(app) {
    app.use(cors({ origin: "*" }));
    app.use(logger("dev"));
    app.use(compression({ level: 6 }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    connect();
}

export default setupMiddlewares;
