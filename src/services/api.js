import axios from "axios";
// import { useSelector } from "react-redux";


export const get = async (value, page, context) => {
  try {
    const response = await axios.get(
      `127.0.0.1:8000/api/cards`
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCard = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/cards/${id}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCardCont = async (page, context) => {
  try {
    const response = await axios.get(
      `127.0.0.1:8000/api/cards`
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};