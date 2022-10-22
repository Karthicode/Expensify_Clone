import React, { useEffect } from "react";
 import {
  Button,
   //FormControl,
  // IconButton,
  // InputLabel,
  // MenuItem,
  //Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { actions } from "../../store/actions";
import { useDataFromStore } from "../../store/state/StateProvider";
import { ImageUpload } from "./ImageUpload";
import { ChangePassword } from "./ChangePassword";

export const Settings = () => {

  const [{ uploadedImage }, dispatch] = useDataFromStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };

    const handleRemoveImage = () => {
      dispatch({
        type: actions.REMOVE_IMAGE,
        image: null,
      });
    };

  return  (

<form
      id="single_expense_form"
      className="create_expense_form"
      onSubmit={handleSubmit(onSubmit)}
 >
    
    <div className="expense_form_left">
     <h3>Your Profile</h3>
      <div className="form-control">
       <TextField
            variant="outlined"
            label="First Name"
            size="small"
            {...register("First Name", { required: "First name is required" })}
            fullWidth
        />
      </div>

      <div className="form-control">
          <TextField
             variant="outlined"
             label="Last Name"
             size="small"
             fullWidth
             {...register("Last Name", { required: "Last Name is required" })}
          />
        </div>
            <Button
            variant="contained"
            color="primary"
            style={{ display: "block", margin: "auto" }}
            type="submit"
          >
            Update 
          </Button>
    </div>
     <div className="expense_form_right">
        <div className="receipt_image">
         {uploadedImage ? (
            <>
            <img src={uploadedImage} width={200} height={200} />
              <h2>Upload Image</h2>
              <Button
                variant="outlined"
                size="small"
                onClick={handleRemoveImage}
              >
                Remove Image
              </Button>
              </>
               ) : (
                <ImageUpload/>
              )}
        </div>
      </div> 
   </form>
   
  );
};
