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
  titleContentContainer: {
    marginVertical: sizes.SIZE_15,
    paddingHorizontal: sizes.SIZE_20,
  },
  contentContainer: {
    paddingHorizontal: sizes.SIZE_20,
  },

  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  contentContainerStyleFlatlist: {
    // paddingVertical: sizes.SIZE_10,
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
});

export default styles;
