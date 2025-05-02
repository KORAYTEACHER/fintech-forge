import axios from "axios";

const BASE_URL = 'http://localhost:5050/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});



export const getNews = async () => {
  return apiClient.get('/news/getallnews');
}


export const getNewsSentiment = async (url: string) => {
  return apiClient.get('/news/getnewssentiment',{params: { url }});
}