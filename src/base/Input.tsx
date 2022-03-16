import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import {colors, fonts, sizes} from 'styles';
import metrics from 'metrics';
import images from 'images';

export type Props = {
  customerInput?: any;
  value?: any;
  onChangeValue?: any;
  containerInput?: any;
  props?: any;
  placeholder?: any;
  icon?: any;
  iconComponent?: any;
};

const Input: React.FC<Props> = ({
  customerInput,
  value,
  onChangeValue,
  containerInput,
  props,
  placeholder,
}) => {
  const [textValue, setTextValue] = useState(value);
  return (
    <View style={[styles.container, containerInput]}>
      <View style={styles.wrapInput}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.COLOR_WHITE}
          value={value}
          onChangeText={text => {
            onChangeValue(text);
            setTextValue(text);
          }}
          style={[
            styles.input,
            customerInput,
            {
              fontFamily: textValue
                ? fonts.lexendDeca.FONT_REGULAR
                : fonts.lexendDeca.FONT_LIGHT,
              fontSize: textValue ? sizes.SIZE_14 : sizes.SIZE_13,
            },
          ]}
          selectionColor={colors.COLOR_WHITE}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          autoCapitalize="none"
          autoCompleteType={'off'}
          {...props}
        />
        <Image style={styles.imageIcon} source={images.icons.search} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: metrics.heightInput,
    backgroundColor: colors.COLOR_PRIMARY,
    borderRadius: sizes.SIZE_30,
    borderWidth: sizes.SIZE_1,
    borderColor: colors.COLOR_WHITE,
  },
  wrapInput: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: sizes.SIZE_15,
  },
  icon: {
    alignSelf: 'center',
  },
  imageIcon: {
    width: sizes.SIZE_20,
    height: sizes.SIZE_20,
    alignSelf: 'center',
  },
  input: {
    borderRadius: sizes.SIZE_20,
    flex: sizes.SIZE_1,
    backgroundColor: colors.COLOR_PRIMARY,
    paddingHorizontal: sizes.SIZE_5,
    color: colors.COLOR_WHITE,
    height: sizes.SIZE_42,
    fontSize: sizes.SIZE_14,
  },
});

export default Input;
