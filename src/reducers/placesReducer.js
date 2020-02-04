import { FETCH_PLACES } from "../actions/types";

const initialState = {
    places: [],
  
  };

const places = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACES:
            return{ ...state, places: action.places }

        default: 
            return state;
    }
}
export default places