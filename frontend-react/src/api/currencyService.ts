import axios from "axios";

const BASE_URL = 'http://localhost:5050/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});



export const getAllCurrency = async () => {
  return apiClient.get('/currency/getallcurrency');
}

export const currencyConvert = async (amount: Number, from: String, to: String) => {
  return apiClient.get('/currency/convertcurrency',{params: { amount, from, to }});
}


