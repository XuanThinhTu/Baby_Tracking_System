<<<<<<< HEAD
import axios from 'axios';
=======
import axios from "axios";

const token = sessionStorage.getItem("token");
const userId = sessionStorage.getItem("userId");
>>>>>>> 490dc9ed790cad55ffa6092bde8e7f3cf05cf814

export const loginFucntion = async (mail, pass) => {
  try {
    const loginData = {
      email: mail,
      password: pass,
    };
    const response = await axios.post(
<<<<<<< HEAD
      'https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/auth/login',
=======
      "https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/auth/login",
>>>>>>> 490dc9ed790cad55ffa6092bde8e7f3cf05cf814
      loginData
    );
    return response.data;
  } catch (error) {
<<<<<<< HEAD
    console.log(error);
  }
};

export const registerFunction = async (formValues) => {
  try {
    const response = await axios.post(
      'https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/user/register',
      formValues
    );
    return response.data; // Trả về data để xử lý tiếp
  } catch (error) {
    console.log(error);
    // Nếu muốn, có thể return null hoặc throw error
    return null;
  }
};

export const getUserInformation = async (token) => {
  try {
    const result = await axios.get(
      'https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/user/p',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
=======
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Some thing when wrong!");
    }
  }
};

export const getUserInformation = async () => {
  try {
    const result = await axios.get(
      "https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/user/p",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
>>>>>>> 490dc9ed790cad55ffa6092bde8e7f3cf05cf814
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

<<<<<<< HEAD
export const getAllBabies = async (id) => {
  try {
    const result = await axios.get(
      `https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/children/list/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewBaby = async (babyName, birhtday, gender) => {
  try {
    const result = await axios.post(
      `https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/children/add?name=${babyName}&birthDate=${birhtday}&gender=${gender}`
=======
export const getAllBabies = async () => {
  try {
    const result = await axios.get(
      `https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/children/list/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("API Call Error:", error);
  }
};

export const addNewBaby = async (babyName, birthday, gender) => {
  try {
    const result = await axios.post(
      `https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/children/add?name=${babyName}&birthDate=${birthday}&gender=${gender}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
>>>>>>> 490dc9ed790cad55ffa6092bde8e7f3cf05cf814
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
