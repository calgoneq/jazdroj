import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import More from './components/info/More';
import Information from './components/info/Information';
import Info from './screens/Info';

const Stack = createStackNavigator();

const InfoNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Info" component={Info} />

      <Stack.Screen name="More" component={More} />

      <Stack.Screen name="Information" component={Information} />
    </Stack.Navigator>
  );
};

export {InfoNavigator};
