import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton } from "@mui/material";
import React from "react";
//import firebase from "firebase/compat/app";
//import { db, storage } from "../../firebase/firebase-config";
import { useDataFromStore } from "../../store/state/StateProvider";
//import { actions } from "../../store/actions/actions";
import { UploadImage } from "../../utilities/UploadImage";

export const ImageUpload = () => {
  const [{ image }, dispatch] = useDataFromStore();

  return (
    <div className="image_upload_wrap">
      <label className="image_icon" htmlFor="icon-button-file">
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={async (e) => {
            UploadImage(e.target.files[0], dispatch);
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          style={{ marginTop: "40%" }}
        >
          <PhotoCamera style={{ fontSize: "10rem" }} />
        </IconButton>
      </label>
      <h3>Upload an Image</h3>
    </div>
  );
};
