import express from "express";

//invoked when the promise gets resolved
export const setSuccessReponse = (data: object, response: express.Response) => {
  response.status(200);
  response.json(data);
};

//invoked when the promise gets rejected
export const setErrorReponse = (error: unknown, response: express.Response) => {
  response.status(500);
  response.json(error);
};

export const pagination = Object.freeze({
  LIMIT: 3,
  OFFSET: 0,
});

export const getDateString = () => {
  let date: string = new Date().toLocaleDateString();
  date = date.split("/").reverse().join("-");
  let lastIndex = date.lastIndexOf("-");
  let length = date.length;
  if (lastIndex === length - 2) {
    date = date.slice(0, lastIndex + 1) + "0" + date.charAt(length - 1);
  }
  let dateArray = date.split("-");
  let temp = dateArray[1];
  dateArray[1] = dateArray[2];
  dateArray[2] = temp;
  date = dateArray.join("-");
  return date;
};
