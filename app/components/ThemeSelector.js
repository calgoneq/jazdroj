import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {lightTheme} from '../themes/light';
import {darkTheme} from '../themes/dark';
import {ThemeContext} from '../App';
import {useTheme} from '@react-navigation/native';
import {globalStyles} from '../styles/GlobalStyles';

const ThemeSelector = props => {
  const {colors} = useTheme();
  const {setTheme} = useContext(ThemeContext);
  const [activelight, setactivelight] = useState(0);
  const [activedark, setactivedark] = useState(0);
  const images = {
    dark: require('../images/dark.png'),
    light: require('../images/light.png'),
    radioG: require('../images/radioG.png'),
    radio: require('../images/radio.png'),
  };

  return (
    <View style={globalStyles.viewStyle20}>
      <TouchableOpacity
        style={globalStyles.buttonStyle2}
        onPress={() => {
          setTheme(lightTheme);
          setactivelight(1);
          setactivedark(0);
        }}>
        <Text style={[{color: colors.blackAndWhiteSettingsPopup}]}>Jasny</Text>
        {activelight == 1 ? (
          <Image style={globalStyles.imageStyle5} source={images.light} />
        ) : (
          <Image style={globalStyles.imageStyle5} source={images.radioG} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.buttonStyle2}
        onPress={() => {
          setTheme(darkTheme);
          setactivedark(1);
          setactivelight(0);
        }}>
        <Text style={[{color: colors.blackAndWhiteSettingsPopup}]}>Ciemny</Text>
        {activedark == 1 ? (
          <Image style={globalStyles.imageStyle5} source={images.dark} />
        ) : (
          <Image style={globalStyles.imageStyle5} source={images.radioG} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ThemeSelector;
