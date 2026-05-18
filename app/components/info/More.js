import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../../App';
import {lightTheme} from '../../themes/light';
import {globalStyles} from '../../styles/GlobalStyles';

const More = props => {
  const image = props.route.params.karuzela
    ? Object.values(props.route.params.karuzela)
    : [props.route.params.image];

  const link = props.route.params.link;

  const {colors} = useTheme();
  const {theme} = useContext(ThemeContext);
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [observing, setObserving] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [number, setnumber] = useState(0);

  const watchId = useRef(null);
  let location = useState([]);

  useEffect(() => {
    getLocation();
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return true;
    }
    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }
    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }
    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      async position => {
        location = position;
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch(err => err);
  }, []);

  return (
    <View style={globalStyles.viewStyle21}>
      <TouchableOpacity
        onPress={() => {
          props.route.params.navigation.goBack();
        }}>
        <Image
          source={
            theme == lightTheme
              ? require('../../images/back.png')
              : require('../../images/backG.png')
          }
          style={globalStyles.imageStyle6}
        />
      </TouchableOpacity>
      <View
        style={globalStyles.buttonStyle4}>
        <Image
          source={{
            uri: image[number],
          }}
          style={globalStyles.imageStyle14}
        />
      </View>
      <View style={globalStyles.viewStyle22}>
        <Text style={globalStyles.textStyle16}>
          {props.route.params.mainText}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollViewStyle1}>
        <View style={globalStyles.viewStyle22}>
          <Text
            style={{
              color: colors.blackandwhite,
              fontSize: hp('2%'),
              width: wp('85%'),
              textAlign: 'center',
            }}>
            {props.route.params.longDesc}
          </Text>
        </View>
      </ScrollView>
      <View style={globalStyles.viewStyle23}>
        <TouchableOpacity
          style={globalStyles.buttonStyle5}
          onPress={() => {
            Linking.openURL(`${link}`);
          }}>
          <View style={globalStyles.viewStyle24}>
            <Text style={globalStyles.textStyle17}>Nawiguj do obiektu</Text>
          </View>
          <Image
            source={require('../../images/navigate.png')}
            style={globalStyles.imageStyle7}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default More;
