import React, {useRef} from 'react';
import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useTheme} from '@react-navigation/native';

import {globalStyles} from '../../styles/GlobalStyles';

const Information = props => {
  const {colors} = useTheme();

  const offsetY = useRef(new Animated.Value(hp('100%'))).current;
  let delay = props.delay;
  Animated.sequence([
    Animated.timing(offsetY, {
      toValue: 0,
      duration: 600,
      delay: delay ? delay : 2700,
      useNativeDriver: true,
    }),
  ]).start();

  return (
    <Animated.View style={{transform: [{translateY: offsetY}]}}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('More', {
            navigation: props.navigation,
            mainText: props.mainText,
            image: props.image,
            longDesc: props.longDesc,
            link: props.link,
            karuzela: props.karuzela,
          })
        }>
        <View style={globalStyles.viewStyle9}>
          <Image
            source={{
              uri: props.image,
            }}
            style={globalStyles.imageStyle8}
          />
          <Text
            style={[globalStyles.textStyle5, {color: colors.blackandwhite}]}>
            {props.mainText}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Information;
