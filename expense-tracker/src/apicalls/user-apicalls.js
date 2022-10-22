import axios from "axios";
import { SERVER } from "../utilities/utilities";

/** This is giving undefined. resolve it later */
// const SERVER = process.env.REACT_APP_SERVER_HOST;

//pass the email and generated password hash as json data but not the pain text password
export const createUser = async (userData) => {
  try {
    return await axios.post(`${SERVER}/user`, userData);
  } catch (error) {
    return error;
  }
};

export const updateUser = async (userData) => {
  try {
    return await axios.put(`${SERVER}/user`, userData);
  } catch (error) {
    return error;
  }
};

/* export const deleteUser = async (userData) => {
  try {
    const deletedUser = await axios.delete(`${SERVER}/user`, userData, {
      
    });
    return deletedUser.data;
  } catch (error) {
    return error.message;
  }
}; */

export const getUserData = async (user_id) => {
  try {
    return await axios.get(`${SERVER}/user/${user_id}`, {});
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    return await axios.get(`${SERVER}/user/`);
  } catch (error) {
    return error;
  }
};

export const groupedUserData = async (email) => {
  try {
    return await axios.get(`${SERVER}/grouped-user-data?email=${email}`);
  } catch (error) {
    return error;
  }
};

export const getDashboardData = async (user_id, expense_id) => {
  try {
    return await axios.get(`${SERVER}/dashboard-data/`, {
      params: {
        user_id: user_id,
        expense_id: expense_id,
      },
    });
  } catch (error) {
    return error;
  }
};

export const userAuthSignup = async (email, password) => {
  return await axios.post(
    "http://localhost:9000/register",
    JSON.stringify({ email, password }),
    {
      headers: { "Content-Type": "application/json" },
      //withCredentials: true
    }
  );
};
