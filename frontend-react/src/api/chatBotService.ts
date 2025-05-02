import axios from "axios";

const BASE_URL = 'http://localhost:5050/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});



export const getChatbotResponse = async (query: string) => {
  return apiClient.get('/financechatbot/chat',{params: { query }});
}


