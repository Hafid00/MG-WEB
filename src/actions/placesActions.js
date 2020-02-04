import PlacesServices from "../services/placesServices";
import * as actionTypes from './types'

export function fetchPlaces(){
    return (dispatch) => {
      PlacesServices.getPlaces()
        .then((res) => {
            console.log('res', res);
            if(res.data.success){
                dispatch(fetchPlacesSuccess(res.data.result))
            }
        })
        .catch((err) => {
            console.log(err);
        })
  
        ;
  }
}
export function fetchPlacesSuccess(places){
    return{
        type: actionTypes.FETCH_PLACES,
        places
    }
}
