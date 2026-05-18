import React, {useState, useEffect, createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ModalPortal} from 'react-native-modals';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Places from './screens/Places';
import Settings from './screens/Settings';
import Calendar from './screens/Calendar';

import {InfoNavigator} from './InfoNavigator';
import {WaysNavigator} from './WaysNavigator';

import {lightTheme} from './themes/light.js';
import TabComponent from './components/Tab';
import Loader from './components/loader/LoaderStart';

import {onValue, ref} from 'firebase/database';
import {db, getImagesFromFolders} from './config/config';

import {enableFreeze} from 'react-native-screens';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

enableFreeze(true);

const Tab = createBottomTabNavigator();

export const ThemeContext = createContext();
export const KategorieContext = createContext();
export const FirebaseDataContext = createContext();

function App() {
  const [firebaseData, setFirebaseData] = useState(null);
  const [firebaseImages, setFirebaseImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  function removeExtensionFromFilename(filename) {
    return filename.split('.')[0].split('%2F')[1].split('%')[0];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const daneReference = ref(db, 'Dane');
        onValue(daneReference, snapshot => {
          const dataDane = snapshot.val();

          const dataReference = ref(db, 'Data');
          onValue(dataReference, snapshot => {
            const dataData = snapshot.val();

            const mergedData = {...dataDane, ...dataData};
            setFirebaseData(mergedData);
          });
        });

        const selectedFolders = [
          'miejsca',
          'placowki',
          'sciezki',
          'karuzela1',
          'karuzela2',
          'karuzela3',
          'karuzela4',
          'karuzela5',
        ];
        const imagesFromFolders = await getImagesFromFolders(selectedFolders);

        if (imagesFromFolders.length > 0) {
          const imageNamesWithoutExtension = imagesFromFolders.map(filename =>
            removeExtensionFromFilename(filename.split('/').pop()),
          );

          const firebaseImage = {};
          imageNamesWithoutExtension.forEach((name, index) => {
            firebaseImage[name] = imagesFromFolders[index];
          });

          setFirebaseImages(firebaseImage);
        }

        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataTimeout = setTimeout(fetchData, 2500);

    return () => clearTimeout(fetchDataTimeout);
  }, []);

  const [all, setall] = useState(true);
  const [noclegidisplay, setnoclegidisplay] = useState(false);

  const [kawiarnie, setKawiarnie] = useState(false);
  const [cukiernie, setCukiernie] = useState(false);
  const [restauracje, setRestauracje] = useState(false);
  const [fastfood, setFastFood] = useState(false);

  const [lokale, setLokale] = useState(false);
  const [puby, setPuby] = useState(false);

  const [apteka, setApteka] = useState(false);
  const [szpital, setSzpital] = useState(false);
  const [rowery, setRowery] = useState(false);
  const [trasa, setTrasa] = useState(true);

  return (
    <SafeAreaProvider>
      <FirebaseDataContext.Provider
        value={{firebaseData, firebaseImages, isLoaded}}>
        <ThemeContext.Provider value={{theme, setTheme, isLoaded}}>
          <KategorieContext.Provider
            value={{
              kawiarnie,
              setKawiarnie,
              noclegidisplay,
              setnoclegidisplay,
              cukiernie,
              fastfood,
              setFastFood,
              restauracje,
              setRestauracje,
              setCukiernie,
              apteka,
              lokale,
              setLokale,
              puby,
              setPuby,
              setApteka,
              szpital,
              setSzpital,
              rowery,
              setRowery,
              trasa,
              setTrasa,
              setall,
              all,
            }}>
            <NavigationContainer theme={theme}>
              <Tab.Navigator screenOptions={{headerShown: false}}>
                <Tab.Screen
                  name="Warte zobaczenia"
                  component={InfoNavigator}
                  options={{
                    unmountOnBlur: true,
                    tabBarButton: props => (
                      <TabComponent
                        label="state"
                        tekst="Warte zobaczenia"
                        {...props}
                      />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Placówki"
                  component={Places}
                  options={{
                    unmountOnBlur: true,
                    tabBarButton: props => (
                      <TabComponent
                        label="shoppinglist"
                        tekst="Placówki"
                        {...props}
                      />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Ścieżki"
                  component={WaysNavigator}
                  options={{
                    unmountOnBlur: true,
                    tabBarButton: props => (
                      <TabComponent label="leaf" tekst="Ścieżki" {...props} />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Kalendarz"
                  component={Calendar}
                  options={{
                    unmountOnBlur: true,
                    tabBarButton: props => (
                      <TabComponent
                        label="calendar"
                        tekst="Kalendarz Wydarzeń"
                        {...props}
                      />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Ustawienia"
                  component={Settings}
                  options={{
                    unmountOnBlur: true,
                    tabBarButton: props => (
                      <TabComponent
                        label="ustawienia"
                        tekst="Ustawienia"
                        {...props}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
              <ModalPortal />
            </NavigationContainer>
            {isLoaded == false ? <Loader /> : null}
          </KategorieContext.Provider>
        </ThemeContext.Provider>
      </FirebaseDataContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
