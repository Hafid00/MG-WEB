import { FETCH_AVATARS } from "../actions/types";

const initialState = {
  avatars: [],
  avatarSelect: null
};

const avatars = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AVATARS:
      let avatars = action.avatars.map(p => ({ name: p.name, code: p.id }));
      return { ...state, avatars: action.avatars, avatarSelect: avatars };
    default:
      return state;
  }
};
export default avatars;
