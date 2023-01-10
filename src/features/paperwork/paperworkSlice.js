import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  paperworkList: [],
};

const slice = createSlice({
  name: "paperworkSlice",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getPaperworkListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { paperworkList, count, totalPages } = action.payload.data;
      state.paperworkList = paperworkList;
      state.totalPages = totalPages;
      state.count = count;
    },

    createPaperworkSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getSinglePaperworkSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPaperwork = action.payload;
    },

    updatePaperworkSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getPaperworkList =
  ({ id, page = 0, limit = 10, type = undefined }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let params = { page, limit };
      if (type) params.type = type;
      const response = await apiService.get(`/paperwork/${id}`, { params });

      dispatch(slice.actions.getPaperworkListSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createPaperwork =
  ({ id, data }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/paperwork/${id}`, data);

      dispatch(slice.actions.createPaperworkSuccess(response.data));
      dispatch(getPaperworkList({ id }));
      toast.success("Create Paperwork Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSinglePaperwork =
  ({ id, idPaper }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/paperwork/${id}/${idPaper}`);

      dispatch(slice.actions.getSinglePaperworkSuccess(response.data));

      dispatch(getPaperworkList({ id }));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updatePaperwork =
  ({ id, idPaper, update }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(
        `/paperwork/${id}/${idPaper}`,
        update
      );

      dispatch(slice.actions.updatePaperworkSuccess(response.data));

      dispatch(getPaperworkList({ id, page: 1, limit: 10 }));
      toast.success("Update Paperwork Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deletePaperwork =
  ({ id, idPaper }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/paperwork/${id}/${idPaper}`);

      dispatch(getPaperworkList({ id, page: 1, limit: 10 }));
      toast.success("Delete Paperwork Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const uploadFileDrive = () => async (dispatch) => {
  await apiService.put(`/paperwork/upload`);
};

export default slice.reducer;
