import { FETCH_TOWNS} from '../actions/types'

const initialState = {
    towns: [],
    townSelect :null
  
};

const towns = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOWNS:
            let towns=action.towns.map(p =>({name:p.name,code:p.id}));
            return{...state, towns: action.towns, townSelect: towns}
        default: 
            return state;
    }
}
export default towns