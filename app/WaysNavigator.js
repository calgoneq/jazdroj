import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ways from './screens/Ways';
import WaySelector from './components/ways/WaySelector';
import Way1 from './components/ways/Way1';
import Way2 from './components/ways/Way2';
import Way3 from './components/ways/Way3';

const Stack = createStackNavigator();

const WaysNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Ways" component={Ways} />

      <Stack.Screen name="WaySelector" component={WaySelector} />

      <Stack.Screen name="Way1" component={Way1} />
      <Stack.Screen name="Way2" component={Way2} />
      <Stack.Screen name="Way3" component={Way3} />
    </Stack.Navigator>
  );
};

export {WaysNavigator};
