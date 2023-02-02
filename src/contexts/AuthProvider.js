import React, { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import isValidToken from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const SIGNUP_SUCCESS = "AUTH.SIGNUP_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const authReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return { ...state, isInitialized: true, isAuthenticated, user };

    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };

    case SIGNUP_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };

    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const intialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await apiService.get("/employees?page=0&limit=10");
          const { user } = response.data.data;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);

        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });

        toast.error(error.message);
      }
    };
    intialize();
  }, []);

  const loginWithGmail = async (body, callback) => {
    try {
      const response = await apiService.post("/auth/loginWithGmail", body);
      const { user, accessToken } = response.data.data;
      setSession(accessToken);
      dispatch({ type: LOGIN_SUCCESS, payload: { user } });
      callback();
    } catch (error) {
      toast.error(error.message);
      navigate("/register");
    }
  };

  const login = async ({ email, password }, callback) => {
    try {
      const response = await apiService.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = response.data.data;

      setSession(accessToken);

      dispatch({ type: LOGIN_SUCCESS, payload: { user } });

      callback();
    } catch (error) {
      toast.error(error.message);
      navigate("/register");
    }
  };

  const register = async ({ name, email, password, companyName }, callback) => {
    try {
      await apiService.post("/users/register", {
        name,
        email,
        password,
        companyName,
      });

      callback();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyEmail = async ({ confirmationCode }, callback) => {
    try {
      const response = await apiService.post(
        `/auth/verification/${confirmationCode}`
      );

      const { user, accessToken } = response.data.data;

      setSession(accessToken);

      dispatch({ type: SIGNUP_SUCCESS, payload: { user } });

      toast.success("Verification Success");

      callback();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, loginWithGmail, register, verifyEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
