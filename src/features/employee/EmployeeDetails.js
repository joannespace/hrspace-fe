import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RouterLink, Outlet, useParams } from "react-router-dom";

import styled from "@emotion/styled";
import { Chip, Link } from "@mui/material";
import { Stack } from "@mui/system";

import { getEmployeeDetails } from "./employeeSlice";
import useAuth from "../../hooks/useAuth";

function EmployeeDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const auth = useAuth();

  useEffect(() => {
    dispatch(getEmployeeDetails(params.id));
  }, [dispatch, params.id]);

  const { currentEmployee } = useSelector((state) => state.employee);

  return (
    <Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "none", md: "space-between" }}
        alignItems={{ xs: "center", md: "none" }}
        spacing={3}
        my={1}
      >
        <Chip
          label={currentEmployee ? currentEmployee.name : ""}
          color="secondary"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            p: 3,
            maxWidth: { xs: 1, md: 0.5 },
          }}
        />

        <Stack direction="row" spacing={5}>
          <StyledLink
            component={RouterLink}
            variant="h6"
            to={`/employee/${params.id}/information`}
            style={({ isActive }) =>
              isActive ? { borderBottom: "4px solid #e65100" } : undefined
            }
          >
            Information
          </StyledLink>

          {(auth.user.role === "Admin" || auth.user._id === params.id) && (
            <StyledLink
              component={RouterLink}
              variant="h6"
              to={`/employee/${params.id}/paperwork`}
              style={({ isActive }) =>
                isActive ? { borderBottom: "4px solid #e65100" } : undefined
              }
            >
              Paperwork
            </StyledLink>
          )}

          <StyledLink
            component={RouterLink}
            variant="h6"
            to={`/employee/${params.id}/review`}
            style={({ isActive }) =>
              isActive ? { borderBottom: "4px solid #e65100" } : undefined
            }
          >
            Review
          </StyledLink>
        </Stack>
      </Stack>

      <Outlet />
    </Stack>
  );
}

export default EmployeeDetails;

const StyledLink = styled(Link)({
  display: "inline-block",
  textDecoration: "none",
  ":hover": {
    borderBottom: "4px solid #311b92",
  },
});
