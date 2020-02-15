import { FETCH_TOWNS, DISPLAY_DIALOG_TOWNS, ADD_TOWN} from '../actions/types'

const initialState = {
    towns: [],
    townSelect :null,
    displayDialog: false,

  
};

const towns = (state = initialState, action) => {
    let newTowns;
    switch (action.type) {
        case FETCH_TOWNS:
            let towns=action.towns.map(p =>({name:p.name,code:p.id}));
            return{...state, towns: action.towns, townSelect: towns};
        case DISPLAY_DIALOG_TOWNS:
                return { ...state, displayDialog: action.bool}
        case ADD_TOWN:
            newTowns = [ ...state.towns ];
            newTowns.push(action.newTown);
            return { ...state, towns: newTowns};
          
        default: 
            return state;
    }
}
export default towns