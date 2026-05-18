import React from 'react';
import {View} from 'react-native';
import {ModalTitle, ModalContent, BottomModal} from 'react-native-modals';
import {useTheme} from '@react-navigation/native';

import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import {Categories} from './places/PlaceComponents';
import {globalStyles} from '../styles/GlobalStyles';

export default function PopupSettings(props) {
  const {colors} = useTheme();

  return (
    <BottomModal
      visible={props.bottomModalAndTitle}
      onTouchOutside={() => {
        props.setBottomModalAndTitle(false);
      }}
      height={0.4}
      width={1}
      onSwipeOut={() => {
        props.setBottomModalAndTitle(false);
      }}
      modalTitle={
        <ModalTitle
          title={props.mainText}
          style={[
            globalStyles.modalStyle1,
            {backgroundColor: colors.backgroundBlackAndWhite},
          ]}
          hasTitleBar
          textStyle={[
            globalStyles.textStyle13,
            {color: colors.blackAndWhiteSettingsPopup},
          ]}
        />
      }>
      <ModalContent
        style={{flex: 1, backgroundColor: colors.backgroundBlackAndWhite}}>
        <View>
          {props.mainText == 'Motyw' ||
          props.mainText == 'Theme' ||
          props.mainText == 'Téma' ? (
            <ThemeSelector />
          ) : null}
          {props.mainText == 'Język' ||
          props.mainText == 'Jazyk' ||
          props.mainText == 'Language' ? (
            <LanguageSelector closeModal={props.setBottomModalAndTitle} />
          ) : null}
          {props.mainText == 'Wybierz kategorię' ||
          props.mainText == 'Choose Category' ||
          props.mainText == 'Vyberte kategorii' ? (
            <Categories
              setDisplayedItems={props.setDisplayedItems}
              selectedCategory={props.selectedCategory}
              setSelectedCategory={props.setSelectedCategory}
            />
          ) : null}
        </View>
      </ModalContent>
    </BottomModal>
  );
}
