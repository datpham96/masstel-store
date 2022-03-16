import {StyleSheet} from 'react-native';
import fonts from './fonts';
import sizes from './sizes';

const commonStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  mainTitle: {
    fontFamily: fonts.lexendDeca.FONT_BOLD,
    fontSize: sizes.SIZE_25,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: sizes.SIZE_15,
    paddingHorizontal: sizes.SIZE_20,
  },
});

export default commonStyles;
