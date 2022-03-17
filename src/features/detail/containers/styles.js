import {StyleSheet} from 'react-native';
import metrics from 'metrics';
import {colors, commonStyles, fonts, sizes} from 'styles';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.COLOR_PRIMARY,
    paddingHorizontal: sizes.SIZE_20,
    paddingVertical: sizes.SIZE_20,
  },
  wrapLogoTitle: {
    ...commonStyles.flexRowCenter,
  },
  logoDefault: {
    width: metrics.screenWidth / sizes.SIZE_7,
    height: metrics.screenWidth / sizes.SIZE_7,
    resizeMode: 'contain',
  },
  wrapTitle: {
    ...commonStyles.flex1,
    marginLeft: sizes.SIZE_10,
    // flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainTitle: {
    fontFamily: fonts.lexendDeca.FONT_MEDIUM,
    color: colors.COLOR_WHITE,
    fontSize: sizes.SIZE_17,
  },
  subTitle: {
    marginTop: sizes.SIZE_5,
    color: colors.COLOR_WHITE,
    fontFamily: fonts.lexendDeca.FONT_LIGHT,
    fontSize: sizes.SIZE_13,
  },
  logoMasscom: {
    width: metrics.screenWidth / sizes.SIZE_6,
    height: metrics.screenWidth / sizes.SIZE_7,
    resizeMode: 'contain',
  },

  wrapInputSearch: {
    marginTop: sizes.SIZE_15,
  },
  inputSearch: {},

  contentContainer: {
    paddingTop: sizes.SIZE_15,
    paddingHorizontal: sizes.SIZE_20,
    ...commonStyles.flex1,
  },

  scrollContent: {
    // paddingVertical: sizes.SIZE_10,
    // paddingBottom: sizes.SIZE_20,
  },
  contentContainerScroll: {
    paddingTop: sizes.SIZE_10,
  },
  wrapImage: {
    position: 'relative',
    width: metrics.screenWidth - sizes.SIZE_40,
    height:
      ((metrics.screenWidth - sizes.SIZE_40) * sizes.SIZE_9) / sizes.SIZE_16,
    marginTop: sizes.SIZE_10,
  },
  imageHeader: {
    width: metrics.screenWidth - sizes.SIZE_40,
    height:
      ((metrics.screenWidth - sizes.SIZE_40) * sizes.SIZE_9) / sizes.SIZE_16,
    position: 'absolute',
    borderRadius: sizes.SIZE_10,
  },
  buttonDownload: {
    position: 'absolute',
    bottom: -sizes.SIZE_17,
    right: sizes.SIZE_10,
  },
  wrapContentHeader: {
    ...commonStyles.flexRowCenter,
    justifyContent: 'space-between',
    marginTop: sizes.SIZE_25,
  },
  wrapContentTitle: {
    ...commonStyles.flex1,
  },
  contentTitle: {
    fontSize: sizes.SIZE_20,
    fontFamily: fonts.lexendDeca.FONT_BOLD,
    color: colors.COLOR_BLACK,
  },
  contentSubTitle: {
    marginTop: sizes.SIZE_5,
    color: '#535353',
    fontFamily: fonts.lexendDeca.FONT_BOLD,
  },
  buttonShare: {
    backgroundColor: colors.COLOR_RED,
    width: sizes.SIZE_40,
    height: sizes.SIZE_40,
    borderRadius: sizes.SIZE_20,
    ...commonStyles.center,
  },
  iconButtonShare: {
    width: sizes.SIZE_20,
    height: sizes.SIZE_20,
    resizeMode: 'contain',
    marginBottom: sizes.SIZE_2,
  },
  wrapContentText: {
    // height: 500,
    // overflow: 'hidden',
    marginBottom: sizes.SIZE_30,
  },

  titleDiffApp: {
    marginTop: sizes.SIZE_20,
  },

  //flatlist
  flatListContainer: {
    marginTop: sizes.SIZE_10,
    height: 550,
  },
  wrapList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: metrics.widthBoxPaginate,
    marginRight: sizes.SIZE_10,
  },
  //dot
  dotContainer: {},
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  //bottom
  wrapBottom: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0,
    shadowRadius: 2.62,

    borderTopColor: colors.COLOR_GREY_WHITE,
    borderTopWidth: sizes.SIZE_1,
    paddingVertical: sizes.SIZE_8,
  },
  btnPlay: {
    ...commonStyles.flexRowCenter,
    backgroundColor: '#F03538',
    alignSelf: 'center',
    paddingHorizontal: sizes.SIZE_25,
    paddingVertical: sizes.SIZE_10,
    borderRadius: sizes.SIZE_10,
  },
  iconChplay: {
    width: sizes.SIZE_20,
    height: sizes.SIZE_20,
    resizeMode: 'contain',
  },
  textPlay: {
    color: colors.COLOR_WHITE,
    fontSize: sizes.SIZE_12,
    marginLeft: sizes.SIZE_5,
  },
});

export default styles;
