import React, {useContext} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {FirebaseDataContext} from '../App';
import WaySelector from '../components/ways/WaySelector';
import Loader from '../components/loader/LoaderStart';

function Ways({navigation}) {
  const {firebaseImages, isLoaded} = useContext(FirebaseDataContext);

  return (
    <View>
      <ScrollView>
        <WaySelector
          delay={isLoaded == false ? 1700 : 0}
          navigation={navigation}
          name="Ścieżka Przyrodnicza"
          distance="23,6 km"
          time="4 h 27 min"
          img={firebaseImages['przyrodnicza']}
        />
        <WaySelector
          delay={isLoaded == false ? 1900 : 300}
          navigation={navigation}
          name="Ścieżka Uzdrowiskowa"
          distance="3,6 km"
          time="46 min"
          img={firebaseImages['uzdrowiskowa']}
        />
        <WaySelector
          delay={isLoaded == false ? 2100 : 600}
          navigation={navigation}
          name="Ścieżka Z Uwzględnieniem Gastronomii"
          distance="3,7 km"
          time="45 min"
          img={firebaseImages['gastro']}
        />
      </ScrollView>
      {isLoaded == false ? <Loader /> : null}
    </View>
  );
}

export default Ways;
