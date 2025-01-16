import React from "react";
import { TextField, MenuItem, IconButton, InputAdornment, Checkbox, Autocomplete } from "@mui/material";
import { Refresh as RefreshIcon, Search as SearchIcon } from "@mui/icons-material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { useDevices } from "../../context/DeviceContext";
import { DEVICE_TYPE_OPTIONS } from "../shared/constants";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const DeviceFilterBar = () => {
  const {
    debouncedSetSearch,
    deviceTypes,
    setDeviceTypes,
    sortBy,
    setSortBy,
    fetchDevices
  } = useDevices();

  const handleSearchChange = (event) => {
    debouncedSetSearch(event.target.value);
  };

  const handleDeviceTypeChange = (event, newValue) => {
    setDeviceTypes(newValue.map((option) => option.value));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleRefresh = () => {
    fetchDevices();
  };

  return (
    <div className="flex items-center pb-4">
      <div className="grid grid-cols-3 gap-4 w-3/4">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Autocomplete
          multiple
          disableCloseOnSelect
          options={DEVICE_TYPE_OPTIONS}
          getOptionLabel={(option) => option.label}
          value={DEVICE_TYPE_OPTIONS.filter((opt) =>
            deviceTypes.includes(opt.value)
          )}
          onChange={handleDeviceTypeChange}
          renderOption={(props, option, {selected}) => {
            const {key, ...optionProps} = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              size="small"
              label="Device Type"
              placeholder="Select types"
            />
          )}
        />

        <TextField
          select
          fullWidth
          variant="outlined"
          size="small"
          label="Sort by"
          value={sortBy}
          onChange={handleSortChange}
        >
          <MenuItem value="hdd-desc">HDD Capacity (Descending)</MenuItem>
          <MenuItem value="hdd-asc">HDD Capacity (Ascending)</MenuItem>
          <MenuItem value="name-asc">Name (A-Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z-A)</MenuItem>
        </TextField>
      </div>

      <div className="flex w-1/4 justify-end">
        <IconButton onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default DeviceFilterBar;
