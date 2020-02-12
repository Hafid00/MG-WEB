import { FETCH_PLACES, DISPLAY_DIALOG } from "../actions/types";
const initialState = {
  places: [],
  displayDialog: false
};

const places = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      console.log("res");

      return { ...state, places: action.places };
    case DISPLAY_DIALOG:
      return { ...state, displayDialog: action.bool };

    default:
      return state;
  }
};
export default places;
