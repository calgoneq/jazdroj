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
import {ThemeContext, DataContext} from '../../App';
import {lightTheme} from '../../themes/light';
import {globalStyles} from '../../styles/GlobalStyles';
import Loader from '../../components/loader/LoaderStart';

const Way1 = props => {
  const {colors} = useTheme();
  const {theme} = useContext(ThemeContext);
  const {firebaseData, firebaseImages, isLoaded} =
    useContext(DataContext);

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
    "/Park+Zdrojowy+-+Jastrzębie+Zdrój,+Jastrzębie-Zdrój/Inhalatorium/Pomnik+'Tańcząca+Para'/Mikołaja+Witczaka+7/Dąbrówka,+1+Maja,+Jastrzębie-Zdrój/''/Ośrodek+Wypoczynku+Niedzielnego,+Kazimierza+Wielkiego,+44-335+Jastrzębie-Zdrój/@49.9468059,18.5708628,16z/data=!3m1!4b1!4m44!4m43!1m5!1m1!1s0x4711539f925f53bf:0x22c37fc87e147166!2m2!1d18.5665229!2d49.950185!1m5!1m1!1s0x4711539ff74c1889:0x1fdb729faf06083a!2m2!1d18.5683398!2d49.9505137!1m5!1m1!1s0x4711539feb0db4eb:0x5b6c9a603db0f5aa!2m2!1d18.5669036!2d49.9499536!1m5!1m1!1s0x471153bcee768ced:0x4d9a0d588f991709!2m2!1d18.5669561!2d49.9500181!1m5!1m1!1s0x471153a0221a16f5:0x93ec13f5160ee0f0!2m2!1d18.5677073!2d49.9513366!1m5!1m1!1s0x4711537593d62191:0xada7a5ad8497ffca!2m2!1d18.5683036!2d49.9473338!1m5!1m1!1s0x471154abe4b3f0d5:0x2c0e079d147ca6f4!2m2!1d18.5860991!2d49.9434614!3e2";

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
      <StartTrace dystans="3,6 km" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollViewStyle4}>
        <Text style={[globalStyles.textStyle2, {color: colors.blackandwhite}]}>
          Start 🏁
        </Text>
        <Trace
          image={firebaseImages['waysParkZdrojowy']}
          mainDesc="Park Zdrojowy"
          desc={firebaseData?.waysParkZdrojowy}
          lenght="150m"
        />
        <Trace
          image={firebaseImages['waysDomZdrojowy']}
          mainDesc="Dom Zdrojowy"
          desc={firebaseData?.waysDomZdrojowy}
          lenght="120m"
        />
        <Trace
          image={firebaseImages['waysInhalatoriumSolankowe']}
          mainDesc="Inhalatorium solankowe"
          desc={firebaseData?.waysInhalatoriumSolankowe}
          lenght="5m"
        />
        <Trace
          image={firebaseImages['waysRzezbaDuet']}
          mainDesc="Rzeźba Duet"
          desc={firebaseData?.waysRzezbaDuet}
          lenght="0,5km"
        />
        <Trace
          image={firebaseImages['waysLazienki']}
          mainDesc="Łazienki"
          desc={firebaseData?.waysLazienki}
          lenght="0,7km"
        />
        <Trace
          image={firebaseImages['waysDabrowka']}
          mainDesc="Dąbrówka"
          desc={firebaseData?.waysDabrowka}
          lenght="280m"
        />
        <Trace
          image={firebaseImages['waysWillaOpolanka']}
          mainDesc="Willa Opolanka"
          desc={firebaseData?.waysWillaOpolanka}
          lenght="2,1km"
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
