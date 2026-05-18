import {Text, TouchableOpacity, View, Image, Animated} from 'react-native';
import React, {useContext, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {lightTheme} from '../../themes/light';
import {ThemeContext} from '../../App';
import {useTheme} from '@react-navigation/native';
import {globalStyles} from '../../styles/GlobalStyles';

const WaySelector = props => {
  const {theme} = useContext(ThemeContext);
  const {colors} = useTheme();

  const offsetY = useRef(new Animated.Value(hp('100%'))).current;
  let delay = props.delay;
  Animated.sequence([
    Animated.timing(offsetY, {
      toValue: 0,
      duration: 600,
      delay: delay,
      useNativeDriver: true,
    }),
  ]).start();

  return (
    <Animated.View
      style={{
        transform: [{translateY: offsetY}],
        alignItems: 'center',
        marginTop: hp('2%'),
        backgroundColor: colors.backgroundBlackAndWhite,
        borderRadius: wp('4%'),
      }}>
      <TouchableOpacity
        onPress={() => {
          switch (props.name) {
            case 'Ścieżka Przyrodnicza':
              props.navigation.navigate('Way1', {label: props.name});
              break;
            case 'Ścieżka Uzdrowiskowa':
              props.navigation.navigate('Way2', {label: props.name});
              break;
            case 'Ścieżka Z Uwzględnieniem Gastronomii':
              props.navigation.navigate('Way3', {label: props.name});
              break;
            default:
              break;
          }
        }}>
        <Image
          source={{
            uri: props.img,
          }}
          style={globalStyles.imageStyle16}
        />
        <View style={globalStyles.viewStyle27}>
          <Text
            style={{
              fontSize: hp('3%'),
              color: colors.blackandwhite,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {props.name}
          </Text>
          <View style={globalStyles.viewStyle28}>
            <View style={globalStyles.viewStyle29}>
              <Image
                source={
                  theme == lightTheme
                    ? require('../../images/distance.png')
                    : require('../../images/distanceG.png')
                }
                style={globalStyles.imageStyle17}
              />
              <Text
                style={{
                  fontSize: hp('2.1%'),
                  fontWeight: '500',
                  color: colors.blackandwhite,
                  marginRight: wp('2%'),
                }}>
                {props.distance}
              </Text>
            </View>
            <View style={globalStyles.viewStyle29}>
              <Image
                source={
                  theme == lightTheme
                    ? require('../../images/clock.png')
                    : require('../../images/clockG.png')
                }
                style={globalStyles.imageStyle17}
              />
              <Text
                style={{
                  fontSize: hp('2.1%'),
                  fontWeight: '500',
                  color: colors.blackandwhite,
                }}>
                {props.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WaySelector;
