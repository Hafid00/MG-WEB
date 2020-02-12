import { FETCH_HOTELS, DISPLAY_DIALOG } from "../actions/types";

const initialState = {
    hotels: [],
    displayDialog: false,
  
  };



  const hotels = (state = initialState, action) => {

    switch (action.type) {
      case FETCH_HOTELS:
        return{ ...state, hotels: action.hotels };
      case DISPLAY_DIALOG:
        return { ...state, displayDialog: action.bool}
  
      
      default:
  
        return state;
  
    }
  
  };
  
  export default hotels;
  
  