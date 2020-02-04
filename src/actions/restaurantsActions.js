import RestaurantsServices from "../services/restaurantsServices";
import * as actionTypes from './types'

export function fetchRestaurants(){
    return (dispatch) => {
        RestaurantsServices.getRestaurants()
        .then((res) => {
            console.log('res', res);
            if(res.data.success){
                dispatch(fetchRestaurantsSuccess(res.data.result))
            }
        })
        .catch((err) => {
            console.log(err);
        })
  
        ;
  }
}
export function fetchRestaurantsSuccess(restaurants){
    return{
        type: actionTypes.FETCH_RESTAURANTS,
        restaurants
    }
}
