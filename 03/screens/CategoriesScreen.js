import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
import { FlatList, StyleSheet } from 'react-native';



const CategoriesScreen = ({navigation}) => {

  function renderCategoryItem(itemData) {

    function pressHandler(){
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id,
      });
    }
  
    return (
      <CategoryGridTile 
      title={itemData.item.title} 
      color={itemData.item.color}
      onPress={pressHandler}
       />
    );
  }


  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id}
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </>
  );
};

export default CategoriesScreen;

