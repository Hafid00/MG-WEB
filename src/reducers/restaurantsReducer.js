import {FETCH_RESTAURANTS} from '../actions/types'
const initialState = {
    restaurants: [],
  
  };

const restaurants =  (state = initialState, action) =>{
    switch (action.type) {
        case FETCH_RESTAURANTS:
            return {...state, restaurants: action.restaurants}
        default: 
            return state;
    }
}
export default restaurants