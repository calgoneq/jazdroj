import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import loader from './loader.json';
import {globalStyles} from '../../styles/GlobalStyles';

const Loader = () => {
  return (
    <View style={globalStyles.viewStyle6}>
      <View style={globalStyles.viewStyle7}>
        <LottieView
          style={{flex: 1, width: 100, height: 100}}
          source={loader}
          autoPlay
          loop
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Loader;
