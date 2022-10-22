import firebase from "firebase/compat/app";
import { db, storage } from "../firebase/firebase-config";
import { actions } from "../store/actions/actions";

import * as fs from "fs";
const csv = require("csvtojson");
const { Parser } = require("json2csv");

export const UploadImage = (imageFile, dispatch) => {
  if (imageFile !== null) {
    const uploadTask = storage.ref(`receipts/${imageFile.name}`).put(imageFile);

    uploadTask.on(
      "state_changed",

      (snapshot) => {},
      (error) => {
        //error function
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("receipts")
          .child(imageFile.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("expensify-files").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
            });

            dispatch({
              type: actions.IMAGE_UPLOAD,
              image: url,
            });
          });
      }
    );
  }
};

export const loadDataFromCSV = async (file) => {
  try {
    return await csv().fromFile(file);
  } catch (error) {
    return error;
  }
};
