import axios from 'axios';

const API_URL = 'https://backend-songs-service-341898809698.us-central1.run.app';

export const getSongs = async () => {
  const response = await axios.get(`${API_URL}/songs`);
  return response.data;
};

export const getSongById = async (id: number) => {
  const response = await axios.get(`${API_URL}/songs/${id}`);
  return response.data;
};

export const createSong = async (song: { song_name: string; song_path: string; plays?: number }) => {
  const response = await axios.post(`${API_URL}/songs`, song);
  return response.data;
};

export const updateSong = async (id: number, song: { song_name?: string; song_path?: string; plays?: number }) => {
  const response = await axios.put(`${API_URL}/songs/${id}`, song);
  return response.data;
};

export const deleteSong = async (id: number) => {
  const response = await axios.delete(`${API_URL}/songs/${id}`);
  return response.data;
};
