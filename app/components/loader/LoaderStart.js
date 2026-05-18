import React, {useRef} from 'react';
import {View, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import startapp from './startapp.json';
import {globalStyles} from '../../styles/GlobalStyles';

const Loader = ({isLoaded}) => {
  const fading = useRef(new Animated.Value(1)).current;

  Animated.timing(fading, {
    toValue: isLoaded ? 0 : 1,
    duration: 500,
    delay: 1500,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={[
        globalStyles.viewStyle8,
        {
          opacity: fading,
          marginLeft: isLoaded ? wp('100%') : 0,
        },
      ]}>
      <View style={globalStyles.viewStyle7}>
        <LottieView
          style={{flex: 1, width: 100, height: 100}}
          source={startapp}
          autoPlay
          loop
          resizeMode="cover"
        />
      </View>
    </Animated.View>
  );
};

export default Loader;
