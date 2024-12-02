import axios from "axios";
// import { useSelector } from "react-redux";


export const getBySearch = async (searchTerme, page, limit) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/cards/search`,
    {
        params: { 
          page,  
          limit,
          searchTerme 
        },
      }
    
    
    );
    // console.log(response);
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

export const getCardPaginated = async (page=1, limit=30) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/cards/paginated/`,
      {
        params: { 
          page,  
          limit, 
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};