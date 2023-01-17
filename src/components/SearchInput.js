import React, { useState } from "react";

import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { alpha } from "@mui/system";
import { GREY } from "../theme/colorPallete";

function SearchInput({ handleSubmit, flexGrow }) {
  const [searchName, setSearchName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchName);
  };

  return (
    <Box direction="row" position="relative" flexGrow={flexGrow}>
      <form onSubmit={onSubmit}>
        <TextField
          name="search"
          defaultValue={searchName}
          placeholder="Search by name"
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
          sx={{
            "& fieldset": {
              borderRadius: "20px",
              backgroundColor: alpha(GREY[800], 0.09),
            },
            minWidth: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" size="medium" type="submit">
                  <Search fontSize="large" color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
}

export default SearchInput;
