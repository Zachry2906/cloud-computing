import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'http://localhost:3000';
let token = "";
let expire = "";
let name = "";
let id = "";

// Membuat instance axios khusus untuk JWT
const axiosJWT = axios.create();

// Interceptor akan dijalankan SETIAP KALI membuat request dengan axiosJWT
// Fungsinya buat ngecek + memperbarui access token sebelum request dikirim
axiosJWT.interceptors.request.use(
  async (config) => {
    // Ambil waktu sekarang, simpan dalam variabel "currentDate"
    const currentDate = new Date();
    console.log("Current Date:", currentDate);
    // Bandingkan waktu expire token dengan waktu sekarang
    if (expire * 1000 < currentDate.getTime()) {
      // Kalo access token expire, Request token baru ke endpoint /token
      const response = await axios.get(`${BASE_URL}/api/token`, {
        withCredentials: true // <-- ini WAJIB agar cookie dikirim ke backend
      });
      console.log("Response:", response.data);

      // Update header Authorization dengan access token baru
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;

      // Update token di state
      token = response.data.accessToken;

      // Decode token baru untuk mendapatkan informasi user
      const decoded = jwtDecode(response.data.accessToken);
      expire = decoded.exp; // <- Set waktu expire baru
      name = decoded.name; // <- Set nama user baru
      id = decoded.id; // update id dari token
    }
    return config;
  },
  (err) => {
    // Kalo misal ada error, langsung balik ke halaman login
    alert("Session expired, please login again");
    return Promise.reject(err);
  }
);

// Helper untuk update user info dari token saat pertama kali load
function updateUserFromToken() {
  token = localStorage.getItem('token') || "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      expire = decoded.exp;
      name = decoded.name;
      id = decoded.id; // sesuaikan dengan payload JWT Anda
    } catch (e) {
      token = "";
      expire = "";
      name = "";
      id = "";
    }
  }
}
updateUserFromToken();

export const getNotes = async (search = "", id = null) => {
  try {
    if (id) {
      const response = await axiosJWT.get(`${BASE_URL}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      const response = await axiosJWT.get(`${BASE_URL}/api/notes?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const addNote = async (noteData) => {
  try {
    updateUserFromToken(); // pastikan id terbaru
    // Hapus id dari noteData jika ada
    const { id: _id, ...dataWithoutId } = noteData;
    const response = await axiosJWT.post(`${BASE_URL}/api/notes`, dataWithoutId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const updateNote = async (id, noteData) => {
  try {
    updateUserFromToken();
    const data = { ...noteData, id: id };
    const response = await axiosJWT.put(`${BASE_URL}/api/notes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axiosJWT.delete(`${BASE_URL}/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
