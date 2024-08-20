import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  rights: [],
  location: "",
  search: null,
  skip: 0,
  filterByPm: false,
  filterByCritical: false,
  status: null,
  toggleState: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.filterByCritical = false;
      state.filterByPm = false;
      state.location = action.payload;
      state.skip = 0;
    },
    skipIncrement: (state, action) => {
      if (state.skip >= action.payload) {
        state.filterByCritical = false;
        state.filterByPm = false;
        return action.payload;
      } else {
        state.skip += 10;
      }
    },
    skipDecrement: (state) => {
      state.filterByCritical = false;
      state.filterByPm = false;
      if (state.skip < 10) return;
      state.skip -= 10;
    },
    filterByPm: (state) => {
      if (state.filterByPm === true) return;
      state.filterByPm = !state.filterByPm;
      if (state.filterByPm === true) {
        state.filterByCritical = false;
      }
    },
    filterByCritical: (state) => {
      if (state.filterByCritical === true) return;
      state.filterByCritical = !state.filterByCritical;
      if (state.filterByCritical === true) {
        state.filterByPm = false;
      }
    },
    search: (state, action) => {
      if ((action.payload !== state.search) !== state.search) {
        state.filterByCritical = false;
        state.filterByPm = false;
        state.search = action.payload;
      }
    },
    resetSearch: (state) => {
      state.search = initialState.search;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRights: (state, action) => {
      state.rights = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
      state.rights = initialState.rights;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setToggleState: (state) => {
      state.toggleState = !state.toggleState;
    },
  },
});

export const {
  changeLocation,
  skipIncrement,
  skipDecrement,
  filterByPm,
  filterByCritical,
  search,
  resetSearch,
  setUser,
  setRights,
  resetUser,
  setStatus,
  setToggleState,
} = navSlice.actions;
export default navSlice.reducer;
