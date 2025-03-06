import axios from "axios";

const token = sessionStorage.getItem("token");
const userId = sessionStorage.getItem("userId");
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const loginFucntion = async (mail, pass) => {
  try {
    const loginData = {
      email: mail,
      password: pass,
    };
    const response = await axios.post(`${baseUrl}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Some thing when wrong!");
    }
  }
};

export const registerFunction = async (
  email,
  password,
  firstName,
  lastName,
  phone,
  address
) => {
  try {
    const regisData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
    };
    const result = await axios.post(`${baseUrl}/user/register`, regisData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInformation = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const result = await axios.get(`${baseUrl}/user/p`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllBabies = async () => {
  try {
    const result = await axios.get(`${baseUrl}/children/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log("API Call Error:", error);
  }
};

export const getBabyInfo = async (babyId) => {
  try {
    const result = await axios.get(`${baseUrl}/children/info/${babyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewBaby = async (babyName, birthday, gender) => {
  try {
    const result = await axios.post(
      `${baseUrl}/children/add?name=${babyName}&birthDate=${birthday}&gender=${gender}`,
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

export const updateBabyProfile = async (babyId, name, birthday, gender) => {
  try {
    const result = await axios.put(
      `${baseUrl}/children/update/${babyId}?name=${name}&birthDate=${birthday}&gender=${gender}`,
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

export const addBabyGrowthData = async (
  babyId,
  height,
  weight,
  headCir,
  date
) => {
  try {
    const growthData = {
      height: height,
      weight: weight,
      headCircumference: headCir,
      measuredAt: date,
    };
    const result = axios.post(
      `${baseUrl}/api/grow-tracker/${babyId}`,
      growthData
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBoyStandardIndex = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/standard-index/pro`);
    const standard = result.data.data;
    const boyStandard = standard.filter((item) => item.gender === "boys");
    return boyStandard;
  } catch (error) {
    console.log(error);
  }
};

export const getGirlStandardIndex = async () => {
  try {
    const result = await axios.get(`${baseUrl}/api/standard-index/pro`);
    const standard = result.data.data;
    const girlStandard = standard.filter((item) => item.gender === "girl");
    return girlStandard;
  } catch (error) {
    console.log(error);
  }
};

export const getBabyGrowthData = async (babyId) => {
  try {
    const result = await axios.get(`${baseUrl}/api/grow-tracker/${babyId}`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDoctors = async () => {
  try {
    const result = await axios.get(`${baseUrl}/user/get-doctors?page=0&size=5`);
    return result.data.data.content;
  } catch (error) {
    console.log(error);
  }
};

//============ADMIN API ================
export const getAllUserAccounts = async () => {
  try {
    const result = await axios.get(`${baseUrl}/user/admin/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
