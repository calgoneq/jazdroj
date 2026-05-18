import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {lightTheme} from '../../themes/light';
import {ThemeContext} from '../../App';
import {globalStyles} from '../../styles/GlobalStyles';

export const StartTrace = props => {
  const {colors} = useTheme();

  return (
    <View style={globalStyles.viewStyle14}>
      <Text style={[globalStyles.textStyle7, {color: colors.blackandwhite}]}>
        Dystans do pokonania: {props.dystans}{' '}
      </Text>
    </View>
  );
};

export const Trace = props => {
  const {colors} = useTheme();

  return (
    <View>
      <View style={globalStyles.viewStyle10}>
        <Image
          source={{
            uri: props.image,
          }}
          style={[
            globalStyles.imageStyle9,
            {borderColor: colors.blackandwhite},
          ]}
        />
        <View style={globalStyles.viewStyle15}>
          <Text
            style={[globalStyles.textStyle14, {color: colors.blackandwhite}]}>
            {props.mainDesc}
          </Text>
          <Text
            style={[globalStyles.textStyle15, {color: colors.blackandwhite}]}>
            {props.desc}
          </Text>
        </View>
      </View>
      <View style={globalStyles.viewStyle16}>
        <View
          style={[
            globalStyles.viewStyle17,
            {backgroundColor: colors.blackandwhite},
          ]}></View>
        <Text style={globalStyles.textStyle8}>{props.lenght}</Text>
      </View>
    </View>
  );
};

export const EndTrace = props => {
  const {colors} = useTheme();
  const {theme} = useContext(ThemeContext);

  return (
    <View style={globalStyles.viewStyle18}>
      <View style={globalStyles.viewStyle19}>
        <Image
          source={
            theme == lightTheme
              ? require('../../images/arrow.png')
              : require('../../images/arrowG.png')
          }
          style={globalStyles.imageStyle10}
        />
        <Text style={[globalStyles.textStyle6, {color: colors.blackandwhite}]}>
          Koniec
        </Text>
      </View>
    </View>
  );
};
