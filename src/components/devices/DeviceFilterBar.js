import React from "react";
import { TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Refresh as RefreshIcon, Search as SearchIcon } from "@mui/icons-material";

const DeviceFilterBar = () => {
  return (
    <div className="flex justify-between items-center pb-4">
      <div className="flex items-center space-x-4">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="w-64"
        />

        <TextField
          select
          variant="outlined"
          size="small"
          label="Device Type"
          className="w-40"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="windows">Windows</MenuItem>
          <MenuItem value="mac">Mac</MenuItem>
          <MenuItem value="linux">Linux</MenuItem>
        </TextField>

        <TextField
          select
          variant="outlined"
          size="small"
          label="Sort by"
          className="w-56"
        >
          <MenuItem value="hdd-desc">HDD Capacity (Descending)</MenuItem>
          <MenuItem value="hdd-asc">HDD Capacity (Ascending)</MenuItem>
          <MenuItem value="name-asc">Name (A-Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z-A)</MenuItem>
        </TextField>
      </div>

      <IconButton>
        <RefreshIcon />
      </IconButton>
    </div>
  );
};

export default DeviceFilterBar;
