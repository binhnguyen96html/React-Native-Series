import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";


function AddPlace({navigation}){

  function createPlaceHandler(place){

   insertPlace(place);

    navigation.navigate('AllPlaces')
  }

  return (
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  )
}

export default AddPlace;