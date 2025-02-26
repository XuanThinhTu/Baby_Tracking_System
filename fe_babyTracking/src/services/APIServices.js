import axios from "axios";

const token = sessionStorage.getItem("token");
const userId = sessionStorage.getItem("userId");

export const loginFucntion = async (mail, pass) => {
  try {
    const loginData = {
      email: mail,
      password: pass,
    };
    const response = await axios.post(
      "https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/auth/login",
      loginData
    );
    return response.data;
  } catch (error) {
    console.log(error);
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
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
