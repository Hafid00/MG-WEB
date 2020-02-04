import { combineReducers } from "redux";
import towns from "./townsReducer";
import hotels from "./hotelsReducer";
import restaurants from "./restaurantsReducer";
import places from "./placesReducer";
import user from "./userReducer";
import avatars from "./avatarsReducer";

export default combineReducers({
  user,
  towns,
  restaurants,
  places,
  hotels,
  avatars
});
