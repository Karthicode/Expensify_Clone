"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = exports.pagination = exports.setErrorReponse = exports.setSuccessReponse = void 0;
//invoked when the promise gets resolved
const setSuccessReponse = (data, response) => {
    response.status(200);
    response.json(data);
};
exports.setSuccessReponse = setSuccessReponse;
//invoked when the promise gets rejected
const setErrorReponse = (error, response) => {
    response.status(500);
    response.json(error);
};
exports.setErrorReponse = setErrorReponse;
exports.pagination = Object.freeze({
    LIMIT: 3,
    OFFSET: 0,
});
const getDateString = () => {
    let date = new Date().toLocaleDateString();
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
exports.getDateString = getDateString;
