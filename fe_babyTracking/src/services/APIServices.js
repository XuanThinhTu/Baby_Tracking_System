import axios from 'axios';

export const loginFucntion = async (mail, pass) => {
  try {
    const loginData = {
      email: mail,
      password: pass,
    };
    const response = await axios.post(
      'https://azbtsappdp.livelydesert-5fef761c.eastasia.azurecontainerapps.io/auth/login',
      loginData
    );
    return response.data;
  } catch (error) {
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
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
