import React, {useState, useEffect, useContext} from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {lightTheme} from '../themes/light';
import {ThemeContext, DataContext} from '../App';
import PopupSettings from '../components/PopupSettings';
import {Information} from '../components/places/PlaceComponents';
import {globalStyles} from '../styles/GlobalStyles';
import Loader from '../components/loader/LoaderStart';

function Places(props) {
  const {theme} = useContext(ThemeContext);
  const [bottomModalAndTitle, setBottomModalAndTitle] = useState(false);
  const [mainText, setmainText] = useState('');
  const {firebaseData, isLoaded} = useContext(DataContext);
  const [placesData, setPlacesData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (firebaseData) {
      const fetchedPlacesData = Object.values(firebaseData).filter(
        place => place.typ === 'placowka',
      );
      setPlacesData(fetchedPlacesData);
      setDisplayedItems(fetchedPlacesData);
    }
  }, [firebaseData]);

  const image = {
    logo: require('../images/logo.png'),
    logo2: require('../images/logogold.png'),
    filter: require('../images/nawigacjaIcony/ustawienia.png'),
    filter2: require('../images/nawigacjaIcony/ustawieniaG.png'),
  };

  const showModal = () => {
    setBottomModalAndTitle(true);
    setmainText('Wybierz kategorię');
  };

  return (
    <View>
      <View style={globalStyles.viewStyle5}>
        <Image
          style={globalStyles.imageStyle1}
          source={theme == lightTheme ? image.logo : image.logo2}
        />
        <TouchableOpacity
          style={globalStyles.buttonStyle1}
          onPress={() => showModal()}>
          <Image
            style={globalStyles.imageStyle2}
            source={theme == lightTheme ? image.filter : image.filter2}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollViewStyle2}>
        {displayedItems.map((info, index) => (
          <Information
            key={index}
            mainText={info.nazwa}
            image={info.zdjecie}
            description={info.opis}
            opinion={info.link}
          />
        ))}
      </ScrollView>

      <PopupSettings
        bottomModalAndTitle={bottomModalAndTitle}
        setBottomModalAndTitle={setBottomModalAndTitle}
        mainText={mainText}
        setDisplayedItems={setDisplayedItems}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {isLoaded == false ? <Loader /> : null}
    </View>
  );
}

export default Places;
