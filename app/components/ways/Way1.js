import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
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

import {Trace, EndTrace, StartTrace} from './TraceComponents';
import {useTheme} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {ThemeContext, FirebaseDataContext} from '../../App';
import {lightTheme} from '../../themes/light';
import {globalStyles} from '../../styles/GlobalStyles';
import Loader from '../../components/loader/LoaderStart';

const Way1 = props => {
  const {colors} = useTheme();
  const {theme} = useContext(ThemeContext);
  const {firebaseData, firebaseImages, isLoaded} =
    useContext(FirebaseDataContext);

  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [observing, setObserving] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);

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

  const link1 = 'https://www.google.pl/maps/dir/';
  const link2 =
    '/Szotkowicka,+Jastrzębie-Zdrój/Spacerowa,+44-337+Jastrzębie-Zdrój/Las+Pastuszyniec,+Żwirki+i+Wigury,+Jastrzębie-Zdrój/Las+Ruptawiec,+Jastrzębie-Zdrój/Las+Kyndra,+Jastrzębie-Zdrój/Ośrodek+Wypoczynku+Niedzielnego,+Kazimierza+Wielkiego,+Jastrzębie-Zdrój/@49.9182595,18.5618693,11.5z/data=!4m40!4m39!1m1!4e1!1m5!1m1!1s0x4711540a21f01539:0x38ae23ee044a4a67!2m2!1d18.5235746!2d49.9355652!1m5!1m1!1s0x4711549dbb109ef3:0x2ce46b07ccf416c1!2m2!1d18.5724035!2d49.9267118!1m5!1m1!1s0x471154bd88cbad8b:0x8f8f38767a3f800e!2m2!1d18.5763911!2d49.9143025!1m5!1m1!1s0x4716ab57a2159219:0x6a56582a76e3f90e!2m2!1d18.6236494!2d49.9182342!1m5!1m1!1s0x47115335027a21c7:0xc1fa5c73ff10b0b0!2m2!1d18.6224027!2d49.9466425!1m5!1m1!1s0x471154abe4b3f0d5:0x2c0e079d147ca6f4!2m2!1d18.5860991!2d49.9434614!3e2';

  return (
    <View style={globalStyles.viewStyle21}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Ways');
        }}>
        <Image
          source={
            theme == lightTheme
              ? require('../../images/back.png')
              : require('../../images/backG.png')
          }
          style={globalStyles.imageStyle15}
        />
      </TouchableOpacity>
      <StartTrace dystans="20 Km" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollViewStyle4}>
        <Text style={[globalStyles.textStyle2, {color: colors.blackandwhite}]}>
          Start 🏁
        </Text>

        <Trace
          image={firebaseImages['waysDolinaRzekiSzotkowki']}
          mainDesc="Dolina rzeki Szotkówki"
          desc={firebaseData?.waysDolinaRzekiSzotkowki}
          lenght="7 km"
        />
        <Trace
          image={firebaseImages['waysLasBiadoszek']}
          mainDesc="Las Biadoszek"
          desc={firebaseData?.waysLasBiadoszek}
          lenght="2 km"
        />
        <Trace
          image={firebaseImages['waysLasPastuszyniec']}
          mainDesc="Las Pastuszyniec"
          desc={firebaseData?.waysLasPastuszyniec}
          lenght="5 km"
        />
        <Trace
          image={firebaseImages['waysLasRuptawiec']}
          mainDesc="Las Ruptawiec"
          desc={firebaseData?.waysLasRuptawiec}
          lenght=""
        />
        <Trace
          image={firebaseImages['waysLasKyndra']}
          mainDesc="Las Kyndra"
          desc={firebaseData?.waysLasKyndra}
          lenght=""
        />
        <Trace
          image={firebaseImages['waysOsrodekWypoczynkuNiedzielnego']}
          mainDesc="Ośrodek Wypoczynku Niedzielnego"
          desc={firebaseData?.waysOsrodekWypoczynkuNiedzielnego}
          lenght=""
        />
        <EndTrace />
      </ScrollView>
      <View style={globalStyles.viewStyle23}>
        <TouchableOpacity
          style={globalStyles.buttonStyle5}
          onPress={() => {
            Linking.openURL(
              `${link1}${location.coords.latitude},${location.coords.longitude}${link2} `,
            );
          }}>
          <View style={globalStyles.viewStyle24}>
            <Text style={globalStyles.textStyle17}>Rozpocznij trasę</Text>
          </View>
          <Image
            source={require('../../images/navigate.png')}
            style={globalStyles.imageStyle7}
          />
        </TouchableOpacity>
      </View>
      {isLoaded == false ? <Loader /> : null}
    </View>
  );
};

export default Way1;
