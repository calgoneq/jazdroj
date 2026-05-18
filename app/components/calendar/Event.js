import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {globalStyles} from '../../styles/GlobalStyles';
import noimg from '../../images/noimg.png';

const Event = props => {
  const [imageURLL, setimageURLL] = useState();
  const {colors} = useTheme();

  const onPressHandler = () => {
    Linking.openURL(props.url ? props.url : 'null');
  };

  const scrapeImageSrc = async link => {
    try {
      const response = await fetch(link);
      const html = await response.text();
      const imgSrcRegex = /<img.*?src="(.*?\/fileadmin\/.*?)".*?>/g;
      const imageSrcList = [];
      let match;
      while ((match = imgSrcRegex.exec(html)) !== null) {
        if (match[1]) {
          imageSrcList.push(match[1]);
          break;
        }
      }
      if (imageSrcList.length > 0) {
        setimageURLL(imageSrcList[0]);
      } else {
        console.log(
          "Nie znaleziono adresów URL obrazków zawierających '/fileadmin/'.",
        );
      }
      return imageSrcList;
    } catch (error) {
      console.error('Błąd podczas scrapowania obrazków:', error);
      return [];
    }
  };

  scrapeImageSrc(props.url);
  return (
    <View>
      <TouchableOpacity onPress={onPressHandler}>
        <Text style={[globalStyles.textStyle9, {color: colors.blackandwhite}]}>
          {props.data}
          {props.godz || !props.data === 'W trakcie ' ? ' Godzina:' : null}{' '}
          {props.godz}
        </Text>
        <View style={globalStyles.viewStyle11}>
          <Image
            source={
              props.godz || props.data === 'W trakcie '
                ? 1 == 1
                  ? {uri: 'https://www.jastrzebie.pl' + imageURLL}
                  : noimg
                : {uri: props.imageURL}
            }
            style={globalStyles.imageStyle11}
            resizeMode="contain"
          />
          <Text
            style={[globalStyles.textStyle10, {color: colors.blackandwhite}]}>
            {props.mainText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Event;
