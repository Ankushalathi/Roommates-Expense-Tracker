// / src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CardState {
  cardData: any;
  totalItems: number;
  page: number;
  rowsPerPage: number;
}
const initialState: CardState = {
  cardData: [],
  totalItems: 0,
  page: 1,
  rowsPerPage: 20,
};
const dataSlice: any = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
  },
});
export const { 
  setCardData ,
  setItems,
  setPage,
  setRowsPerPage,
  setTotalItems,
} = dataSlice.actions;
export default dataSlice.reducer;