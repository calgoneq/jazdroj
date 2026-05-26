import React, {useState, createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ModalPortal} from 'react-native-modals';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {LogBox} from 'react-native';

import Places from './screens/Places';
import Settings from './screens/Settings';
import Calendar from './screens/Calendar';

import {InfoNavigator} from './InfoNavigator';
import {WaysNavigator} from './WaysNavigator';

import {lightTheme} from './themes/light.js';

import TabComponent from './components/Tab';
import Loader from './components/loader/LoaderStart';

import placesData from "./data/places.json"

LogBox.ignoreAllLogs();

enableFreeze(true);

const Tab = createBottomTabNavigator();

export const ThemeContext = createContext();
export const KategorieContext = createContext();
export const FirebaseDataContext = createContext();

function App() {
  const [firebaseData, setFirebaseData] = useState(placesData);
  const [firebaseImages, setFirebaseImages] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [theme, setTheme] = useState(lightTheme);

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
