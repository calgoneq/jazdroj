import React, {useContext, useEffect, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import Information from '../components/info/Information';
import {lightTheme} from '../themes/light';
import {ThemeContext, DataContext} from '../App';
import {globalStyles} from '../styles/GlobalStyles';
import Loader from '../components/loader/LoaderStart';

function Info({navigation}) {
  const {theme} = useContext(ThemeContext);
  const {firebaseData, firebaseImages, isLoaded} =
    useContext(DataContext);
  const [placesData, setPlacesData] = useState([]);

  const image = {
    logo: require('../images/logo.png'),
    logo2: require('../images/logogold.png'),
  };

  useEffect(() => {
    if (firebaseData) {
      const fetchedPlacesData = Object.values(firebaseData);
      setPlacesData(fetchedPlacesData);
    }
  }, [firebaseData]);

  return (
    <View style={globalStyles.viewStyle26}>
      <Image
        source={theme == lightTheme ? image.logo : image.logo2}
        style={globalStyles.imageStyle3}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollViewStyle3}>
        {placesData.map(
          (info, index) =>
            info.typ === 'miejsce' && (
              <Information
                key={index}
                delay={300}
                mainText={info.nazwa}
                image={info.zdjecie}
                longDesc={info.opis}
                navigation={navigation}
                link={info.link}
              />
            ),
        )}
      </ScrollView>
      {isLoaded ? null : <Loader />}
    </View>
  );
}

export default Info;
