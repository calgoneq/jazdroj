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
  const {waysData, firebaseImages, isLoaded} =
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
    '/Park+Zdrojowy,+44-330+Jastrz%C4%99bie-Zdr%C3%B3j/Jag%C3%B3dka/1+Maja+61,+44-330+Jastrz%C4%99bie-Zdr%C3%B3j/Pa%C5%84stwowa+Szko%C5%82a+Muzyczna+I+i+II+st.+im.+prof.+J%C3%B3zefa+%C5%9Awidra+w+Jastrz%C4%99biu-Zdroju/Stary+Zdr%C3%B3j/Hala+Widowiskowo-Sportowa/O%C5%9Brodek+Wypoczynku+Niedzielnego/@49.9455422,18.5641728,15.75z/data=!4m50!4m49!1m5!1m1!1s0x471153993f4ce361:0xfd80f373eaff6b60!2m2!1d18.5582525!2d49.9484505!1m5!1m1!1s0x4711539f925f53bf:0x22c37fc87e147166!2m2!1d18.5665229!2d49.950185!1m5!1m1!1s0x4711539fe215e20b:0x458359c54a0bdb40!2m2!1d18.5702121!2d49.9494629!1m5!1m1!1s0x4711539e1c3a5811:0x9df500f90f5940a4!2m2!1d18.5662344!2d49.9467915!1m5!1m1!1s0x4711537447e48b71:0xa2696f85587ae235!2m2!1d18.5716117!2d49.9464868!1m5!1m1!1s0x471153751b8f81a1:0xf4ed0f1cb62e4b0f!2m2!1d18.5712769!2d49.9485603!1m5!1m1!1s0x471153724e08e551:0x96f7c106d00fcf67!2m2!1d18.5787368!2d49.9455653!1m5!1m1!1s0x471154abe4b3f0d5:0x2c0e079d147ca6f4!2m2!1d18.5860991!2d49.9434614!3e2';

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
      <StartTrace dystans="3,7 Km" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollViewStyle4}>
        <Text style={[globalStyles.textStyle2, {color: colors.blackandwhite}]}>
          Start 🏁
        </Text>
        <Trace
          image={firebaseImages['waysParkZdrojowy']}
          mainDesc="Park Zdrojowy"
          desc={waysData?.waysParkZdrojowy}
          lenght="400m"
        />
        <Trace
          image={firebaseImages['waysJagodka']}
          mainDesc="Jagódka"
          desc={waysData?.waysJagodka}
          lenght="450m"
        />
        <Trace
          image={firebaseImages['waysGaleriaDzwonkow']}
          mainDesc="Galeria Dzwonków"
          desc={waysData?.waysGaleriaDzwonkow}
          lenght="600m"
        />
        <Trace
          image={firebaseImages['waysSalaKoncertowa']}
          mainDesc="Sala koncertowa"
          desc={waysData?.waysSalaKoncertowa}
          lenght="1,3km"
        />
        <Trace
          image={firebaseImages['waysLodowisko']}
          mainDesc="Lodowisko"
          desc={waysData?.waysLodowisko}
          lenght="1km"
        />
        <Trace
          image={firebaseImages['waysOsrodekWypoczynkuNiedzielnego']}
          mainDesc="Ośrodek Wypoczynku Niedzielnego"
          desc={waysData?.waysOsrodekWypoczynkuNiedzielnego}
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
