import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { getEmployeeList } from "../employee/employeeSlice";

const initialState = {
  isLoadingUser: false,
  errorUser: null,
  userList: [],
};

const slice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoadingUser = true;
    },

    hasError(state, action) {
      state.isLoadingUser = false;
      state.errorUser = action.payload;
    },

    getUserListSuccess(state, action) {
      state.isLoadingUser = false;
      state.errorUser = null;
      const { userList, totalPages, count } = action.payload.data;
      state.userList = userList;
      state.totalPages = totalPages;
      state.count = count;
    },

    activateUserSuccess(state, action) {
      state.isLoadingUser = false;
      state.errorUser = null;
    },

    resetPasswordSuccess(state, action) {
      state.isLoadingUser = false;
      state.errorUser = null;
    },
  },
});

export const getUserList =
  ({ page = 0, limit = 10, searchName, filter }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (searchName) params.name = searchName;
      if (filter) {
        const filterKeys = Object.keys(filter);
        filterKeys.forEach((key) => {
          if (filter[key].length > 0) {
            return (params[key] = filter[key]);
          }
        });
      }

      params.activated = params.activated.map((act) => {
        if (act === "Inactivated") {
          return "true";
        } else {
          return "false";
        }
      });

      const response = await apiService.get("/users", { params });

      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const activateUser =
  ({ id, body }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/users/activate/${id}`, body);
      dispatch(slice.actions.activateUserSuccess(response.data));

      dispatch(getEmployeeList({}));

      toast.success(
        "Activate User Success. Please ask employee to check their email for verification & login info."
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const resetPassword =
  ({ id, body }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/users/reset/${id}`, body);

      dispatch(slice.actions.resetPasswordSuccess(response.data));
      toast.success(
        `Reset Password Success. Password was sent to email ${body.email}`
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const resetPasswordViaEmail =
  ({ email }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.put(`/users/forgetPassword`, { email });

      toast.success(
        `Reset Password Success. Password was sent to email ${email}`
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteUser =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/users/${id}`);

      dispatch(getEmployeeList({}));

      toast.success("Delete User Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
