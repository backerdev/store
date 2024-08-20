import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const storeSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addToStore: (state, action) => {
      action.payload?.forEach((item) => {
        state.push({
          id: item._id,
          critical: item.critical,
          pmScheduled: item.pmScheduled,
          uom: item.uom,
          store: item.location,
          material: item.material,
          materialDescription: item.materialDescription,
          group: item.materialGroup,
          price: item.unitPrice,
          stock: item.stock,
        });
      });
    },
    updateItemInStore: (state, action) => {
      const { material, updates } = action.payload;
      const itemIndex = state.findIndex((item) => item.material === material);
      if (itemIndex !== -1) {
        state[itemIndex] = { ...state[itemIndex], ...updates };
      }
    },
    deleteFromStore: (state, action) => {
      const material = action.payload;
      return state.filter((item) => item.material !== material);
    },
    resetStore: () => {
      return initialState;
    },
  },
});

export const { addToStore, resetStore, updateItemInStore, deleteFromStore } =
  storeSlice.actions;
export default storeSlice.reducer;
