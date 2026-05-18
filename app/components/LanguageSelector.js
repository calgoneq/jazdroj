import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {globalStyles} from '../styles/GlobalStyles';

const LanguageSelector = props => {
  const {colors} = useTheme();
  const {t, i18n} = useTranslation();
  const images = {
    pl: require('../images/flag_pl.png'),
    en: require('../images/flag_gb.png'),
    cz: require('../images/czech.png'),
  };

  return (
    <View style={globalStyles.viewStyle20}>
      <TouchableOpacity
        style={globalStyles.buttonStyle2}
        onPress={() => {
          i18n.changeLanguage('pl'), props.closeModal(false);
        }}>
        <Text style={[{color: colors.blackandwhite, alignSelf: 'center'}]}>
          Polski
        </Text>
        <Image style={globalStyles.imageStyle4} source={images.pl} />
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.buttonStyle2}
        onPress={() => {
          i18n.changeLanguage('en'), props.closeModal(false);
        }}>
        <Text style={[{color: colors.blackandwhite, alignSelf: 'center'}]}>
          Angielski
        </Text>
        <Image style={globalStyles.imageStyle4} source={images.en} />
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.buttonStyle2}
        onPress={() => {
          i18n.changeLanguage('ch'), props.closeModal(false);
        }}>
        <Text style={[{color: colors.blackandwhite, alignSelf: 'center'}]}>
          Czeski
        </Text>
        <Image style={globalStyles.imageStyle4} source={images.cz} />
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSelector;
