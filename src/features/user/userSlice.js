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
      console.log(response);
      dispatch(slice.actions.activateUserSuccess(response.data));

      dispatch(getEmployeeList({}));

      toast.success("Activate User Success");
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
