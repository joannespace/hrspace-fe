import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoadingTemplate: false,
  errorTemplate: null,
  templateList: [],
};

const slice = createSlice({
  name: "templateSlice",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoadingTemplate = true;
    },

    hasError(state, action) {
      state.isLoadingTemplate = false;
      state.errorTemplate = action.payload;
    },

    getTemplateListSuccess(state, action) {
      state.isLoadingTemplate = false;
      state.errorTemplate = null;
      const { templateList, count, totalPages } = action.payload.data;
      state.templateList = templateList;
      state.count = count;
      state.totalPages = totalPages;
    },

    createSingleTemplateSuccess(state, action) {
      state.isLoadingTemplate = false;
      state.errorTemplate = null;
    },

    updateSingleTemplateSuccess(state, action) {
      state.isLoadingTemplate = false;
      state.errorTemplate = null;
    },

    getSingleTemplateSuccess(state, action) {
      state.isLoadingTemplate = false;
      state.errorTemplate = null;
    },
  },
});

export const getTemplateList =
  ({ page = 0, limit = 10, searchName, filter }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let params = { page, limit };
      if (searchName) params.templateName = searchName;
      if (filter) {
        const filterKeys = Object.keys(filter);
        filterKeys.forEach((key) => {
          if (filter[key].length > 0) {
            return (params[key] = filter[key]);
          }
        });
      }

      const response = await apiService.get("/templates", { params });

      dispatch(slice.actions.getTemplateListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createSingleTemplate = (body) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/templates", body);

    dispatch(slice.actions.createSingleTemplateSuccess(response.data));
    dispatch(getTemplateList({ page: 0, limit: 10 }));
    toast.success("Create New Template Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSingleTemplate =
  ({ templateId, update }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/templates/${templateId}`, update);

      dispatch(slice.actions.updateSingleTemplateSuccess(response.data));
      dispatch(getTemplateList({ page: 0, limit: 10 }));
      toast.success("Update Template Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleTemplate = (templateId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/templates/${templateId}`);

    dispatch(slice.actions.getSingleTemplateSuccess(response.data));

    return response.data;
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteTemplate =
  ({ templateId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/templates/${templateId}`);

      dispatch(getTemplateList({ page: 0, limit: 10 }));
      toast.success("Delete Template Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
