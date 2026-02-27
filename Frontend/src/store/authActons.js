import api from "../api/axios";
import { login, logout, stopLoading } from "./authSlice";

// LOGIN
export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", data);
    const token=res.data.token;
    const user=res.data.user;


    localStorage.setItem('token',token)
    localStorage.setItem('user',JSON.stringify(user))
    dispatch(
      login({
        token: res.data.token,
        user: res.data.user
      })
    );
  } catch (e) {
    dispatch(stopLoading());
    console.error(e.response?.data || e.message);
  }
};

// LOGOUT (frontend only)
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  localStorage.removeItem('token')
  localStorage.removeItem('user')
};

// NO CHECK AUTH (backend doesn’t support it)
export const checkAuth = () => (dispatch) => {
  dispatch(stopLoading());
};