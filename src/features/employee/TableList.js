import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

function TableList({ limit, page, setPage, setLimit }) {
  const auth = useAuth();
  const { employeeList, count } = useSelector((state) => state.employee);
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 1 }}>
      <Table aria-label="employee table">
        <TableHead sx={{ backgroundColor: "primary.light" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>

            <TableCell
              sx={{
                width: { xs: "20%", sm: "15%", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Fullname
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "none", md: "table-cell" },
                fontWeight: "bold",
              }}
              align="center"
            >
              Employment Status
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "15%", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Department
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "15%", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Employment Type
            </TableCell>
            <TableCell
              sx={{
                display:
                  auth.user.role === "Admin"
                    ? { xs: "none", md: "table-cell" }
                    : "none",
                fontWeight: "bold",
              }}
            >
              Recent Paperwork
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employeeList
            .slice(page * limit, page * limit + limit)
            .map((employee, index) => (
              <TableRow
                key={employee._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {page * limit + 1 + index}
                </TableCell>

                <TableCell
                  onClick={() => {
                    navigate(`/employee/${employee._id}/information`);
                  }}
                  sx={{
                    width: { xs: "20%", sm: "15%", md: "table-cell" },
                    height: "5rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "success.main",
                    whiteSpace: "wrap",
                    overflow: "hidden",
                    textOverflow: "clip",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {employee.name}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  <Chip
                    label={employee.employmentStatus}
                    color={
                      employee.employmentStatus === "Active"
                        ? "success"
                        : "default"
                    }
                  />
                </TableCell>

                <TableCell align="left">
                  {employee.department ? employee.department : ""}
                </TableCell>

                <TableCell align="left">
                  {employee.employmentType ? (
                    <Chip
                      variant="outlined"
                      label={employee.employmentType}
                      color={!employee.employmentType ? "warning" : "info"}
                      sx={{ minWidth: 0.5 }}
                    />
                  ) : (
                    ""
                  )}
                </TableCell>

                <TableCell
                  sx={{
                    display:
                      auth.user.role === "Admin"
                        ? { xs: "none", md: "table-cell" }
                        : "none",
                    color:
                      employee.paperwork.length === 0
                        ? "red"
                        : "secondary.darker",
                    ":hover": {
                      cursor: "pointer",
                      textDecoration:
                        employee.paperwork.length > 0 ? "underline" : "none",
                    },
                  }}
                  onClick={() => {
                    if (employee.paperwork.length > 0) {
                      navigate(
                        `/employee/${employee._id}/paperwork/${employee.paperwork[0]._id}`
                      );
                    } else {
                      navigate(`/employee/${employee._id}/paperwork/create`);
                    }
                  }}
                >
                  {employee.paperwork.length > 0 ? (
                    employee.paperwork[0].paperworkTitle
                  ) : (
                    <Chip
                      label="Create paperwork"
                      sx={{ ":hover": { cursor: "pointer" } }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10, 25, 35]}
        component="div"
        count={count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(e, newPage) => {
          console.log(newPage);
          setPage(newPage);
        }}
        onRowsPerPageChange={(e) => {
          setLimit(+e.target.value);
          setPage(0);
        }}
      />
    </TableContainer>
  );
}

export default TableList;
