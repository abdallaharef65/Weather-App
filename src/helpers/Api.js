import axios from "axios";

//get all data from api and return it to component
export const getData = async (query) => {
  try {
    let res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=fceb4db05a1c862a93031e13df34cef9`
    );
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
