import { FETCH_RESTAURANTS, DISPLAY_DIALOG_RESTAURANT } from "../actions/types";
const initialState = {
  restaurants: [],
  displayDialog: false
};

const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      console.log("res");

      return { ...state, restaurants: action.restaurants };
    case DISPLAY_DIALOG_RESTAURANT:
      return { ...state, displayDialog: action.bool };

    default:
      return state;
  }
};
export default restaurants;
