/*
 * platform/application wide metrics for proper styling
 */
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {sizes} from 'styles';

const metrics = {
  screenWidth: width,
  screenHeight: height,
  heightInput: sizes.SIZE_44,
  widthBoxPaginate: width - sizes.SIZE_50,
};

export default metrics;
