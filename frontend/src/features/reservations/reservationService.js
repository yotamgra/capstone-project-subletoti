import axios from "axios";

const API_URL = "http://localhost:5000/reservations/";

//Get reservation by Id
const getReservationById = async (reservationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + reservationId, config);

  return response.data;
};
//Create new reservation
const createReservation = async (reservationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reservationData, config);

  return response.data;
};
//Update reservation
const updateReservation = async (reservationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + reservationData._id,
    reservationData,
    config
  );

  return response.data;
};
//Delete reservation
const deleteReservation = async (reservationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + reservationId, config);

  return response.data;
};

const reservationService = {
  createReservation,
  getReservationById,
  deleteReservation,
  updateReservation,
};

export default reservationService;
