import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginRequire from "./LoginRequire";
import HomeLayout from "../layouts/HomeLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

import EmployeeList from "../features/employee/EmployeeList";
import EmployeeDetails from "../features/employee/EmployeeDetails";
import PaperworkList from "../features/paperwork/PaperworkList";
import ReviewList from "../features/review/ReviewList";
import EmployeeInfo from "../features/employee/EmployeeInfo";
import UserList from "../features/user/UserList";
import TemplateList from "../features/template/TemplateList";

import VerificationPage from "../pages/VerificationPage";
import AccountPage from "../layouts/AccountPage";
import CreatePaperwork from "../features/paperwork/CreatePaperwork";
import PaperworkPage from "../features/paperwork/PaperworkPage";
import ViewPaperwork from "../features/paperwork/ViewPaperwork";
import ReviewPage from "../features/review/ReviewPage";
import ViewReview from "../features/review/ViewReview";
import AdminRequire from "./AdminRequire";
import TemplatePage from "../features/template/TemplatePage";
import ViewTemplate from "../features/template/ViewTemplate";
import NotFoundPage from "../pages/NotFoundPage";
import ForgetPassPage from "../pages/ForgetPassPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/reset" element={<ForgetPassPage />} />
        <Route
          path="/verification/:confirmationCode"
          element={<VerificationPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path="/"
        element={
          <LoginRequire>
            <MainLayout />
          </LoginRequire>
        }
      >
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeDetails />}>
          <Route path="/employee/:id/information" element={<EmployeeInfo />} />
          <Route path="/employee/:id/paperwork" element={<PaperworkPage />}>
            <Route index element={<PaperworkList />} />
            <Route
              path="/employee/:id/paperwork/create"
              element={<CreatePaperwork />}
            />
            <Route
              path="/employee/:id/paperwork/:idPaper"
              element={<ViewPaperwork />}
            />
          </Route>
          <Route path="/employee/:id/review" element={<ReviewPage />}>
            <Route index element={<ReviewList />} />
            <Route
              path="/employee/:id/review/:reviewId"
              element={<ViewReview />}
            />
          </Route>
        </Route>

        <Route
          path="/users"
          element={
            <AdminRequire>
              <UserList />
            </AdminRequire>
          }
        />

        <Route
          path="/template"
          element={
            <AdminRequire>
              <TemplatePage />
            </AdminRequire>
          }
        >
          <Route index element={<TemplateList />} />
          <Route path="/template/:templateId" element={<ViewTemplate />} />
        </Route>

        <Route path="/me" element={<AccountPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
