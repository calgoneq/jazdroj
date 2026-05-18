import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {globalStyles} from '../../styles/GlobalStyles';

const ButtonSettings = props => {
  const {colors} = useTheme();

  const showModal = () => {
    props.setBottomModalAndTitle(true);
    props.setmainText(`${props.tekst}`);
  };

  return (
    <TouchableOpacity
      style={globalStyles.buttonStyle3}
      onPress={() => {
        showModal();
      }}>
      <View style={globalStyles.viewStyle2}>
        <Text style={[globalStyles.textStyle3, {color: colors.blackandwhite}]}>
          {props.tekst}
        </Text>
        <Text style={[globalStyles.textStyle4, {color: colors.blackandwhite}]}>
          &gt;
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonSettings;
