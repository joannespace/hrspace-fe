import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoadingEmployee: true,
  errorEmployee: null,
  employeeList: [],
};

const slice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getEmployeeListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      let { employeeList, count, totalPages } = action.payload.data;
      state.employeeList = employeeList;
      state.count = count;
      state.totalPages = totalPages;
    },

    createEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getEmployeeDetailsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentEmployee = action.payload.data;
    },

    updateEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // state.currentEmployee = action.payload.data;
    },

    createManyEmployeesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getEmployeeList =
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

      const response = await apiService.get("/employees", { params });
      dispatch(slice.actions.getEmployeeListSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createEmployee = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/employees", data);
    dispatch(slice.actions.createEmployeeSuccess(response.data));

    dispatch(getEmployeeList({ page: 1, limit: 10 }));
    toast.success("Create Employee Success");

    return response.data;
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getEmployeeDetails = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    const response = await apiService.get(`/employees/${id}`);

    dispatch(slice.actions.getEmployeeDetailsSuccess(response.data));

    return response.data;
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateEmployee =
  ({ id, update }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await apiService.put(`/employees/${id}`, update);

      dispatch(slice.actions.updateEmployeeSuccess(response.data));

      dispatch(getEmployeeList({ page: 1, limit: 10 }));

      toast.success("Update Employee Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteEmployee = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    await apiService.delete(`/employees/${id}`);

    dispatch(
      getEmployeeList({
        page: 0,
        limit: 10,
        filter: {
          employmentStatus: ["Active"],
          department: [],
          employmentType: [],
        },
      })
    );
    toast.success("Delete Employee Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createManyEmployees = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/employees/upload", data);
    console.log("response", response);
    dispatch(slice.actions.createManyEmployeesSuccess(response.data));

    dispatch(
      getEmployeeList({
        page: 0,
        limit: 10,
        filter: {
          employmentStatus: ["Active"],
          department: [],
          employmentType: [],
        },
      })
    );

    toast.success("Create Employees Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
