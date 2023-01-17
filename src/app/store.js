import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employeeSlice";
import paperworkReducer from "../features/paperwork/paperworkSlice";
import reviewReducer from "../features/review/reviewSlice";
import templateReducer from "../features/template/templateSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    paperwork: paperworkReducer,
    review: reviewReducer,
    template: templateReducer,
    user: userReducer,
  },
});

export default store;
