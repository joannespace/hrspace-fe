import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoadingReview: false,
  errorReview: null,
  reviewList: [],
};

const slice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getReviewListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { reviewList, totalPages, count } = action.payload.data;
      state.reviewList = reviewList;
      state.totalPages = totalPages;
      state.count = count;
    },

    createReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getSingleReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentReview = action.payload.data;
    },

    updateReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    shareReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getReviewList =
  ({ id, page = 1, limit = 10, searchName, filter }) =>
  async (dispatch) => {
    try {
      let params = { page, limit };
      if (searchName) params.reviewTitle = searchName;
      if (filter) {
        const filterKeys = Object.keys(filter);
        filterKeys.forEach((key) => {
          if (filter[key].length > 0) {
            return (params[key] = filter[key]);
          }
        });
      }

      const response = await apiService.get(`/reviews/${id}`, {
        params,
      });

      dispatch(slice.actions.getReviewListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createReview =
  ({ id, body }) =>
  async (dispatch) => {
    try {
      const response = await apiService.post(`/reviews/${id}`, body);
      dispatch(slice.actions.createReviewSuccess(response.data));
      dispatch(getReviewList({ id }));
      toast.success("Create Review Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleReview =
  ({ id, reviewId }) =>
  async (dispatch) => {
    try {
      const response = await apiService.get(`/reviews/${id}/${reviewId}`);
      dispatch(slice.actions.getSingleReviewSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateReview =
  ({ id, reviewId, body }) =>
  async (dispatch) => {
    try {
      const response = await apiService.put(`/reviews/${id}/${reviewId}`, body);

      dispatch(slice.actions.updateReviewSuccess(response.data));
      dispatch(getReviewList({ id, page: 1, limit: 10 }));
      toast.success("Update Review Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteReview =
  ({ id, reviewId }) =>
  async (dispatch) => {
    try {
      await apiService.delete(`/reviews/${id}/${reviewId}`);

      dispatch(getReviewList({ id, page: 0, limit: 10 }));
      toast.success("Delete Review Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const shareReview =
  ({ id, reviewId, body }) =>
  async (dispatch) => {
    try {
      await apiService.post(`/reviews/${id}/${reviewId}`, body);

      toast.success("Share Review Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export default slice.reducer;
