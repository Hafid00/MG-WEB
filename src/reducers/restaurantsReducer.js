import { FETCH_RESTAURANTS, DISPLAY_DIALOG } from "../actions/types";
const initialState = {
  restaurants: [],
  displayDialog: false
};

const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      console.log("res");

      return { ...state, restaurants: action.restaurants };
    case DISPLAY_DIALOG:
      return { ...state, displayDialog: action.bool };

    default:
      return state;
  }
};
export default restaurants;
