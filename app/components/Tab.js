import {lightTheme} from '../themes/light';
import Images from '../images';
import {ThemeContext} from '../App';
import React, {useRef, useContext} from 'react';
import styled from 'styled-components/native';
import {globalStyles} from '../styles/GlobalStyles';
import {useTheme} from '@react-navigation/native';

const Container = styled.TouchableWithoutFeedback``;

const Icon = styled.Image`
  height: 25px;
  width: 25px;
`;

const Label = styled.Text`
  font-weight: 600;
  margin-left: 8px;
  margin-right: 12px;
`;

const Background = styled.View`
  flex: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${props => (props.focused ? '#022f29' : props.backgroundColor)};
  border-radius: 100px;
  margin: 6px;
`;

function Tab({label, accessibilityState, onPress, tekst}) {
  const {theme} = useContext(ThemeContext);
  const {colors} = useTheme();
  const focused = accessibilityState.selected;
  const icon =
    theme == lightTheme
      ? !focused
        ? Images.icons[`${label}`]
        : Images.icons[`${label}Focused`]
      : Images.icons[`${label}Focused`];

  const ref = useRef();

  return (
    <Container
      onPress={() => {
        onPress();
      }}>
      <Background focused={focused} label={label} ref={ref} backgroundColor={colors.backgroundBlackAndWhite}>
        <Icon source={icon} />
        {focused && <Label style={globalStyles.labelStyle1}>{tekst}</Label>}
      </Background>
    </Container>
  );
}

export default Tab;
