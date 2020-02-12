import { AUTH_USER } from "../actions/types";

const initialState = {
    token: null,
  
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return{...state, token: action.token}
        default: 
            return state;
    }
}
export default user