import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text} from 'base';
import images from 'images';
import {commonStyles, fonts, sizes} from 'styles';
import metrics from 'metrics';

export type Props = {
  onPress?: any;
};

const ItemComponent: React.FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}>
      <Image style={styles.image} source={images.avatars.picture_default} />
      <View style={styles.wrapInfo}>
        <Text
          props={{
            numberOfLines: sizes.SIZE_1,
          }}
          style={styles.title}>
          Chegg Study
        </Text>
        <Text
          props={{
            numberOfLines: sizes.SIZE_2,
          }}
          style={styles.subTitle}>
          Ứng dụng giúp làm bài tập về nhà, bài kiểm tra
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const WIDTH_CONTAINER_ITEM =
  (metrics.screenWidth - sizes.SIZE_50) / sizes.SIZE_2;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flexRowCenter,
    width: WIDTH_CONTAINER_ITEM,
    marginBottom: sizes.SIZE_10,
  },
  image: {
    width: sizes.SIZE_50,
    height: sizes.SIZE_50,
    resizeMode: 'contain',
    borderRadius: sizes.SIZE_10,
  },
  wrapInfo: {
    marginLeft: sizes.SIZE_8,
    ...commonStyles.flex1,
  },
  title: {
    fontSize: sizes.SIZE_14,
    fontFamily: fonts.lexendDeca.FONT_MEDIUM,
    textAlign: 'justify',
  },
  subTitle: {
    fontSize: sizes.SIZE_12,
    fontFamily: fonts.lexendDeca.FONT_LIGHT,
    textAlign: 'justify',
  },
});

export default ItemComponent;
