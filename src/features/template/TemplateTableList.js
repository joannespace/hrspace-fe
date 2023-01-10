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
import { fDate } from "../../utils/formatTime";

function ReviewTableList({ limit, page, setPage, setLimit }) {
  const { templateList, count } = useSelector((state) => state.template);

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 1 }}>
      <Table aria-label="employee table">
        <TableHead sx={{ backgroundColor: "primary.light" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>

            <TableCell
              sx={{ width: { xs: "20%", sm: "25%" }, fontWeight: "bold" }}
            >
              Template Name
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "15%", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Category
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "15%", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Created By
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "none", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Date Created
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {templateList
            .slice(page * limit, page * limit + limit)
            .map((template, index) => (
              <TableRow
                key={template._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {page * limit + 1 + index}
                </TableCell>

                <TableCell
                  sx={{
                    cursor: "pointer",
                    color: "success.dark",
                    fontWeight: "500",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => {
                    navigate(`/template/${template._id}`);
                  }}
                >
                  {template.templateName}
                </TableCell>

                <TableCell>
                  <Chip
                    label={template.category}
                    color={pickColor(template.category)}
                  />
                </TableCell>

                <TableCell>{template.creator.name}</TableCell>

                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {fDate(template.createdAt)}
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

export default ReviewTableList;

function pickColor(templateCategory) {
  if (templateCategory === "Full-time") {
    return "primary";
  } else if (templateCategory === "Probation") {
    return "secondary";
  } else {
    return "default";
  }
}
