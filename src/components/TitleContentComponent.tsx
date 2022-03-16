import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {sizes, fonts, commonStyles, colors} from 'styles';
import images from 'images';
import {Text} from 'base';

export type Props = {
  title?: any;
  customStyle?: any;
};

const TitleContentComponent: React.FC<Props> = ({
  title = 'Ứng dụng',
  customStyle,
}) => {
  return (
    <View style={[styles.wrapHeaderContent, customStyle]}>
      <View style={styles.verticalLine} />
      <Image style={styles.iconApplication} source={images.icons.application} />
      <Text style={styles.titleHeaderContent}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapHeaderContent: {
    ...commonStyles.flexRowCenter,
  },
  verticalLine: {
    width: sizes.SIZE_3,
    height: sizes.SIZE_20,
    backgroundColor: colors.COLOR_TEXT,
    borderRadius: sizes.SIZE_10,
  },
  iconApplication: {
    width: sizes.SIZE_15,
    height: sizes.SIZE_15,
    resizeMode: 'contain',
    marginLeft: sizes.SIZE_5,
  },
  titleHeaderContent: {
    fontFamily: fonts.lexendDeca.FONT_SEMI_BOLD,
    fontSize: sizes.SIZE_18,
    marginLeft: sizes.SIZE_5,
    paddingBottom: sizes.SIZE_2,
  },
});

export default TitleContentComponent;
