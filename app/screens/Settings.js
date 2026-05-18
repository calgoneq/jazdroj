import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {globalStyles} from '../styles/GlobalStyles';

import PopupSettings from '../components/PopupSettings';
import ButtonSettings from '../components/settings/ButtonSettings';

function Settings({props}) {
  const {colors} = useTheme();
  const [bottomModalAndTitle, setBottomModalAndTitle] = useState(false);
  const [mainText, setmainText] = useState(['WIFI MORDO']);

  return (
    <View>
      <View style={globalStyles.viewStyle3}>
        <Text style={[globalStyles.textStyle1, {color: colors.blackandwhite}]}>
          Ustawienia
        </Text>
      </View>
      <View style={globalStyles.viewStyle4}>
        <ButtonSettings
          tekst="Motyw"
          setBottomModalAndTitle={setBottomModalAndTitle}
          setmainText={setmainText}
        />
      </View>
      <PopupSettings
        bottomModalAndTitle={bottomModalAndTitle}
        setBottomModalAndTitle={setBottomModalAndTitle}
        mainText={mainText}
      />
    </View>
  );
}

export default Settings;
