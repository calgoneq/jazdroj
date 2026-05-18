import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const globalStyles = StyleSheet.create({
  viewStyle1: {
    height: '100%',
    paddingBottom: '10%',
    marginTop: '5%',
  },

  viewStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  viewStyle3: {
    justifyContent: 'flex-end',
    height: hp('15%'),
    width: wp('100%'),
    borderBottomWidth: hp('0.5%'),
    borderBottomColor: '#D2C799',
  },

  viewStyle4: {
    justifyContent: 'center',
    height: hp('70%'),
  },

  viewStyle5: {
    height: hp('15%'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewStyle6: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: wp('100%'),
    height: hp('100%'),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  viewStyle7: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%'),
    height: hp('50%'),
  },

  viewStyle8: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262626',
    width: wp('100%'),
    height: hp('100%'),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  viewStyle9: {
    width: wp('90%'),
    height: hp('30%'),
    borderBottomColor: '#D2C799',
    borderBottomWidth: hp('0.3%'),
    marginBottom: hp('5%'),
    justifyContent: 'space-between',
  },

  viewStyle10: {
    width: wp('100%'),
    height: hp('20%'),
    marginTop: hp('-1.95%'),
    flexDirection: 'row',
  },

  viewStyle11: {
    borderTopColor: '#D2C799',
    borderTopWidth: wp('0.5%'),
    alignItems: 'center',
    minHeight: hp('10%'),
    justifyContent: 'center',
  },

  viewStyle12: {
    width: '65%',
    height: '73%',
    position: 'absolute',
    top: hp('4.5%'),
    right: wp('1%'),
  },

  viewStyle13: {
    height: hp('23%'),
    width: wp('100%'),
    justifyContent: 'center',
    borderBottomColor: '#D2C799',
    borderBottomWidth: hp('0.3%'),
  },

  viewStyle14: {
    height: hp('4%'),
    borderBottomColor: '#D2C799',
    borderBottomWidth: wp('0.7%'),
  },

  viewStyle15: {
    alignSelf: 'center',
    width: wp('65%'),
  },

  viewStyle16: {
    height: hp('20%'),
    marginBottom: hp('-4%'),
    zIndex: -2,
  },

  viewStyle17: {
    width: wp('1.9%'),
    height: '141.5%',
    zIndex: -1,
    marginLeft: wp('16.3%'),
    marginTop: hp('-10%'),
  },

  viewStyle18: {
    height: hp('10%'),
  },

  viewStyle19: {
    width: '35%',
    marginTop: '-2%',
  },

  viewStyle20: {
    justifyContent: 'space-evenly',
    height: '100%',
  },

  viewStyle21: {
    height: hp('100%'),
  },

  viewStyle22: {
    alignSelf: 'center',
  },

  viewStyle23: {
    height: '10%',
    marginBottom: '7.5%',
    backgroundColor: 'rgba(2, 47, 41, 0.9)',
  },

  viewStyle24: {
    width: 'auto',
  },

  viewStyle25: {
    justifyContent: 'space-evenly',
    height: '100%',
  },

  viewStyle26: {
    alignItems: 'center',
  },

  viewStyle27: {
    alignSelf: 'center',
    width: 'auto',
    padding: hp('1%'),
  },

  viewStyle28: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  viewStyle29: {
    flexDirection: 'row',
  },

  textStyle1: {
    color: '#222',
    fontSize: hp('4%'),
    padding: wp('3%'),
  },

  textStyle2: {
    marginLeft: wp('11%'),
    fontSize: hp('3%'),
    color: '#022f29',
    fontWeight: '500',
    marginTop: hp('2%'),
  },

  textStyle3: {
    fontSize: hp('3.2%'),
    padding: wp('3%'),
  },

  textStyle4: {
    fontSize: hp('3.2%'),
    alignSelf: 'center',
    marginRight: wp('2%'),
  },

  textStyle5: {
    fontWeight: '700',
    color: '#022f29',
    fontSize: hp('2.6%'),
    width: '100%',
    textAlign: 'center',
    marginBottom: '3%',
  },

  textStyle6: {
    fontSize: hp('3%'),
    color: '#022f29',
    fontWeight: '500',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },

  textStyle7: {
    fontSize: hp('1.9%'),
    textAlign: 'center',
  },

  textStyle8: {
    position: 'absolute',
    right: wp('65%'),
    marginTop: hp('3%'),
    fontSize: hp('2.5%'),
    fontWeight: '700',
    color: '#D2C799',
  },

  textStyle9: {
    fontSize: hp('2.55%'),
    marginLeft: wp('1%'),
  },

  textStyle10: {
    fontWeight: '500',
    color: '#022f29',
    fontSize: hp('2.6%'),
    width: '100%',
    textAlign: 'center',
    marginBottom: '3%',
  },

  textStyle11: {
    width: '75%',
    height: '100%',
    fontSize: hp('1.8%'),
    position: 'absolute',
    textAlign: 'left',
    color: '#222',
    paddingTop: hp('1%'),
    paddingLeft: wp('3%'),
  },

  textStyle12: {
    alignSelf: 'center',
  },

  textStyle13: {
    fontSize: wp('5%'),
  },

  textStyle14: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: '#022f29',
    width: wp('60%'),
  },

  textStyle15: {
    width: wp('60%'),
    fontSize: hp('1.9%'),
    textAlign: 'left',
  },

  textStyle16: {
    color: '#D2C799',
    fontSize: hp('3.5%'),
    textAlign: 'center',
    backgroundColor: '#022f29',
    width: wp('91.75%'),
    borderBottomLeftRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
  },

  textStyle17: {
    color: '#D2C799',
    fontSize: hp('2.5%'),
    alignSelf: 'center',
    textAlign: 'center',
  },

  textStyle18: {
    fontWeight: 'bold',
    color: '#D2C799',
    fontSize: hp('2.6%'),
    position: 'absolute',
    top: 0,
    width: '100%',
    textAlign: 'center',
  },

  imageStyle1: {
    width: wp('25%'),
    height: wp('25%'),
    marginLeft: wp('3%'),
  },

  imageStyle2: {
    width: wp('8%'),
    height: wp('8%'),
  },

  imageStyle3: {
    width: wp('30%'),
    height: wp('30%'),
    top: 0,
  },

  imageStyle4: {
    height: wp('5%'),
    width: hp('4%'),
    alignSelf: 'center',
    position: 'absolute',
    right: wp('2%'),
  },

  imageStyle5: {
    width: wp('6%'),
    height: hp('3%'),
    resizeMode: 'contain',
  },

  imageStyle6: {
    marginTop: wp('4%'),
    marginLeft: wp('1%'),
    width: wp('5%'),
    height: wp('5%'),
  },

  imageStyle7: {
    width: wp('5%'),
    height: wp('5%'),
    marginTop: '1%',
    marginLeft: '2%',
  },

  imageStyle8: {
    width: '100%',
    height: '80%',
    alignSelf: 'flex-start',
    borderRadius: hp('1%'),
  },

  imageStyle9: {
    marginTop: hp('2%'),
    marginLeft: hp('1%'),
    marginRight: hp('3%'),
    borderRadius: wp('100%'),
    borderWidth: wp('1.5%'),
    width: wp('30%'),
    height: wp('30%'),
  },

  imageStyle10: {
    marginTop: hp('-6%'),
    marginLeft: hp('1.2%'),
    marginRight: hp('3%'),
    width: wp('30%'),
    height: wp('30%'),
  },

  imageStyle11: {
    width: wp('90%'),
    height: undefined,
    aspectRatio: 16 / 9,
    alignSelf: 'center',
    borderRadius: hp('1%'),
    marginTop: hp('1%'),
  },

  imageStyle12: {
    width: wp('20%'),
    height: wp('20%'),
    marginLeft: wp('6%'),
    borderRadius: hp('0.7%'),
  },

  imageStyle13: {
    position: 'absolute',
    width: wp('8%'),
    height: wp('8%'),
    right: 0,
    top: 0,
  },

  imageStyle14: {
    width: wp('91.75%'),
    height: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },

  imageStyle15: {
    marginTop: wp('4%'),
    marginLeft: wp('1%'),
    width: wp('5%'),
    height: wp('5%'),
  },

  imageStyle16: {
    width: wp('95%'),
    height: hp('30%'),
    borderTopLeftRadius: wp('4%'),
    borderTopRightRadius: wp('4%'),
  },

  imageStyle17: {
    width: wp('7%'),
    height: wp('7%'),
    marginRight: wp('1%'),
  },

  buttonFocused: {
    backgroundColor: '#D2C799',
  },

  buttonStyle1: {
    position: 'absolute',
    right: wp('3%'),
  },

  buttonStyle2: {
    borderBottomWidth: wp('0.5%'),
    justifyContent: 'space-between',
    textAlign: 'center',
    height: hp('5%'),
    borderBottomColor: '#D2C799',
    flexDirection: 'row',
  },

  buttonStyle3: {
    justifyContent: 'center',
    marginTop: hp('1%'),
    borderBottomWidth: wp('0.5%'),
    borderBottomColor: '#D2C799',
  },

  buttonStyle4: {
    height: '40%',
  },

  buttonStyle5: {
    height: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: '1%',
  },

  modalStyle1: {
    borderBottomColor: '#D2C799',
    borderBottomWidth: wp('0.5%'),
  },

  labelStyle1: {
    color: '#D2C799',
  },

  scrollViewStyle1: {
    height: '90%',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },

  scrollViewStyle2: {
    marginBottom: hp('20%'),
  },

  scrollViewStyle3: {
    marginBottom: hp('15%'),
  },

  scrollViewStyle4: {
    height: '82%',
  },
});
