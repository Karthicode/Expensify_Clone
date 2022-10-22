import Routes from "./routes";
import express from "express";

// exports default as a function with express() as argument
export default (app: any) => {
  //sets itemRouter component to search for all routes
  app.use("/", Routes);
  app.get("*", function (req: express.Request, res: express.Response) {
    res.status(404).send({ message: "404 : Not Found" });
  });
};
