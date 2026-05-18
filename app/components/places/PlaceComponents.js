import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {globalStyles} from '../../styles/GlobalStyles';
import {FirebaseDataContext} from '../../App';

export const Information = props => {
  const {colors} = useTheme();

  return (
    <View style={globalStyles.viewStyle13}>
      <Image
        source={{
          uri: props.image,
        }}
        style={[
          globalStyles.imageStyle12,
          {backgroundColor: colors.backgroundScreen},
        ]}
      />
      <Text style={[globalStyles.textStyle18, {color: colors.blackandwhite}]}>
        {props.mainText}
      </Text>
      <View style={globalStyles.viewStyle12}>
        <Text style={[globalStyles.textStyle11, {color: colors.blackandwhite}]}>
          {props.description}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(props.opinion);
          }}>
          <Image
            source={require('../../images/comment.png')}
            style={globalStyles.imageStyle13}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Categories = ({
  setDisplayedItems,
  selectedCategory,
  setSelectedCategory,
}) => {
  const {colors} = useTheme();

  const {firebaseData} = useContext(FirebaseDataContext);
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    if (firebaseData) {
      const fetchedPlacesData = Object.values(firebaseData).filter(
        place => place.typ === 'placowka',
      );
      setPlacesData(fetchedPlacesData);
    }
  }, [firebaseData]);

  const filterByCategory = category => {
    if (selectedCategory === category) {
      setDisplayedItems(placesData);
      setSelectedCategory('');
    } else {
      const filteredItems = placesData.filter(
        item => item.kategoria === category,
      );
      setDisplayedItems(filteredItems);
      setSelectedCategory(category);
    }
  };

  return (
    <View style={globalStyles.viewStyle25}>
      <TouchableOpacity
        style={[
          globalStyles.buttonStyle2,
          selectedCategory === 'zdrowie' && globalStyles.buttonFocused,
        ]}
        onPress={() => filterByCategory('zdrowie')}>
        <Text style={[{color: colors.blackandwhite}, globalStyles.textStyle12]}>
          Zdrowie
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          globalStyles.buttonStyle2,
          selectedCategory === 'życie' && globalStyles.buttonFocused,
        ]}
        onPress={() => filterByCategory('życie')}>
        <Text style={[{color: colors.blackandwhite}, globalStyles.textStyle12]}>
          Życie
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          globalStyles.buttonStyle2,
          selectedCategory === 'jedzenie' && globalStyles.buttonFocused,
        ]}
        onPress={() => filterByCategory('jedzenie')}>
        <Text style={[{color: colors.blackandwhite}, globalStyles.textStyle12]}>
          Jedzenie
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          globalStyles.buttonStyle2,
          selectedCategory === 'rodzina' && globalStyles.buttonFocused,
        ]}
        onPress={() => filterByCategory('rodzina')}>
        <Text style={[{color: colors.blackandwhite}, globalStyles.textStyle12]}>
          Rodzina
        </Text>
      </TouchableOpacity>
    </View>
  );
};
