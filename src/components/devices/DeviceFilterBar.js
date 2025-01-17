import React from "react";
import { TextField, MenuItem, IconButton, InputAdornment, Checkbox, Autocomplete, Select} from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { useDevices } from "../../context/DeviceContext";
import { DEVICE_TYPE_OPTIONS, SORT_OPTIONS } from "../shared/constants";

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

  const placeHolderDevices = deviceTypes.length > 0 ? '' : 'Device Type: All';

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
                <img src="assets/images/search-icon.svg" alt="search" width={24} height={24}/>
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
          size="small"
          renderOption={(props, option, {selected}) => {
            const {key, ...optionProps} = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                  size="small"
                />
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              hiddenLabel
              variant="outlined"
              size="small"
              placeholder={placeHolderDevices}
            />
          )}
        />

        <Select
          value={sortBy}
          onChange={handleSortChange}
          name="orderBy"
          displayEmpty
          size="small"
          fullWidth
          variant="outlined"
          inputProps={{ 'aria-label': 'sort-select' }}
        >
          {SORT_OPTIONS.map((sortType) => (
            <MenuItem
              key={sortType.label}
              value={sortType.value}
            >
              Sorted By: {sortType.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex w-1/4 justify-end">
        <IconButton onClick={handleRefresh}>
          <img src="assets/images/refresh-icon.svg" alt="refresh" width={24} height={24}/>
        </IconButton>
      </div>
    </div>
  );
};

export default DeviceFilterBar;
