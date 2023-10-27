import { data } from "autoprefixer";
import axiosWithConfig from "../../axiosWithConfig";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users");

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const getDetailUser = async (id_user) => {
  try {
    const response = await axiosWithConfig.get("/users/" + id_user);

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const createUser = async (data) => {
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.post("/users", newData);

    return response.data;
  } catch (error) {
    throw Error("Failed to create a new user");
  }
};

export const updateUser = async (data) => {
  const { id } = data;
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.put(`/users/${id}`, newData);

    return response.data;
  } catch (error) {
    throw Error("Failed to update a user");
  }
};

export const deleteUser = async (id_user) => {
  try {
    const response = await axiosWithConfig.delete("/users/" + id_user);

    return response.data;
  } catch (error) {
    throw Error("Failed to delete user");
  }
};
