import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import Event from '../components/calendar/Event';
import Loader from '../components/loader/Loader';
import {globalStyles} from '../styles/GlobalStyles';

function Calendar() {
  const [data, setData] = useState([]);
  const [datacinema, setDatacinema] = useState([]);
  const [pending, setpending] = useState(false);
  const [nowadata, setnowadata] = useState();
  const [showcinema, setshowcinema] = useState(true);

  const monthNames = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Pażdziernik',
    'Listopad',
    'Grudzień',
  ];

  const HourhNames = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
  ];

  const fetchData = async () => {
    Promise.all([
      fetch(`https://www.jastrzebie.pl/json/`).then(value => value.json()),
      fetch(`https://mok.jastrzebie.pl/kino/`).then(value => value.text()),
    ])
      .then(value => {
        let cinemaText = value[1].split('>').join('!');
        let htmlSegments = cinemaText.split('!');
        let datacinemaa = [];
        for (let j = 0; j < 1000; j++) {
          let datastart = htmlSegments[j];
          try {
            if (datastart.includes('tile--img-main')) {
              let array2 = htmlSegments[j - 1].split('"');
              let array1 = htmlSegments[j].split('"');
              let linkimage = 'https://mok.jastrzebie.pl' + array1[1];
              let tittle = array1[3];
              let link = 'https://mok.jastrzebie.pl' + array2[1];
              datacinemaa.push({
                txt: tittle,
                img: linkimage,
                href: link,
              });
            }
          } catch {}
        }
        setDatacinema(datacinemaa);
        const fetchedEvents = [...value[0]];
        setpending(false);
        const sorted = fetchedEvents.sort((a, b) => {
          const dateA = new Date(`${a.date}`).valueOf();
          const dateB = new Date(`${b.date}`).valueOf();
          if (dateA > dateB) {
            return 1;
          }
          return -1;
        });
        setData(sorted);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setpending(true);
    setnowadata(new Date());
    fetchData();
  }, []);
  let datastart, filtr;

  return (
    <View>
      <View style={globalStyles.viewStyle1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {showcinema
            ? Object.entries(datacinema).map(([key, name]) => (
                <Event
                  url={name.href}
                  godz={false}
                  data="W kinie"
                  mainText={name.txt}
                  imageURL={name.img}
                  key={key}
                />
              ))
            : null}
          {Object.entries(data).map(
            ([key, name]) => (
              (datastart = new Date(name.start)),
              (stalyend = new Date(name.end ? name.end : true)),
              (filtr = name.text
                .replace('<p>', ' kasuj')
                .replace('<h3>', ' kasuj')
                .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')
                .replace(/&quot;/g, '')
                .split('kasuj')[1]
                .replace(':', '')
                .toString()),
              (link =
                (name.text.includes('mosir')
                  ? 'https://www.mosir.jastrzebie.pl'
                  : 'https://www.jastrzebie.pl') +
                name.text
                  .replace("<a href='", 'kasuj')
                  .replace("'>", 'kasuj')
                  .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')
                  .split('kasuj')[1]),
              (datastart <= nowadata && stalyend >= nowadata) ||
              datastart > nowadata ? (
                <View key={key}>
                  <Event
                    url={link}
                    godz={
                      datastart <= nowadata && stalyend >= nowadata
                        ? null
                        : (datastart.getHours().toString() < 10
                            ? HourhNames[datastart.getHours().toString()]
                            : datastart.getHours().toString()) +
                          ':' +
                          (datastart.getMinutes().toString() == 0
                            ? '00'
                            : datastart.getMinutes().toString())
                    }
                    data={
                      datastart <= nowadata && stalyend >= nowadata
                        ? 'W trakcie '
                        : (datastart.getDate() < 10
                            ? HourhNames[datastart.getDate()]
                            : datastart.getDate()) +
                          ' ' +
                          monthNames[datastart.getMonth().toString()]
                    }
                    mainText={filtr}
                  />
                </View>
              ) : null
            ),
          )}
        </ScrollView>
      </View>
      {pending ? <Loader /> : null}
    </View>
  );
}

export default Calendar;
