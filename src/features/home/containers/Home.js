import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Animated,
  Image,
  useWindowDimensions,
} from 'react-native';
import {sizes, commonStyles, colors} from 'styles';
import images from 'images';
import styles from './styles';
import {Input, Text} from 'base';
import {Item, TitleContent} from 'components';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent';
import {useNavigation} from '@react-navigation/native';
import navigationTypes from 'navigationTypes';
import metrics from 'metrics';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import keyTypes from 'keyTypes';
import {applicationList} from 'src/api/methods/app';

const TOTAL_PAGE = 3;

const totalItemWidth = metrics.screenWidth - sizes.SIZE_40;

const Home = () => {
  const insets = useSafeAreaInsets();
  const [textSearch, setTextSearch] = useState('');
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const [heightSlide, setHeightSlide] = useState(0);
  const [totalItemRow, setTotalItemRow] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const {data, isLoading, refetch, isSuccess} = useQuery(
    [
      keyTypes.APPLICATION_LIST,
      {
        limit: 100,
        start: 0,
      },
    ],
    () => applicationList(100, 0),
    {
      keepPreviousData: true,
      enabled: false,
    },
  );

  console.log(data?.length);

  React.useEffect(() => {
    if (totalItemRow) {
      refetch();
    }
  }, [totalItemRow, activePage, refetch]);

  const listDATA = React.useMemo(() => {
    let tmpList = [];
    if (data && isSuccess && totalItemRow) {
      for (let i = 0; i < Math.floor(data?.length / totalItemRow); i++) {
        tmpList.push({
          key: i,
          data: data.slice(
            totalItemRow * activePage,
            totalItemRow * (activePage + 1),
          ),
        });
      }
    }
    return tmpList;
  }, [data, isSuccess, totalItemRow, activePage]);

  console.log(listDATA, 'listDATA--');

  const renderItem = React.useCallback(
    ({item}) => {
      return (
        <View style={[styles.itemContainer, {width: width - 80}]}>
          <Text>{item.title}</Text>
          <Animated.Text>{item.description}</Animated.Text>
        </View>
      );
    },
    [width],
  );

  const keyExtractor = React.useCallback(item => item.key, []);

  // const totalPageList = React.useMemo(() => {
  //   let tmpList = [];
  //   if ((data, totalItemRow)) {
  //     for (let i = 0; i < Math.floor(data?.length / totalItemRow); i++) {
  //       tmpList.push(i);
  //     }
  //   }

  //   return tmpList;
  // }, [data, totalItemRow]);

  // console.log(totalPageList, 'totalPageList--');

  const handleDetail = () => {
    navigation.navigate(navigationTypes.detail.screen);
  };
  const handleBtnDot = item => {
    console.log(item, 'item');
  };
  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          console.log(height, 'height000');
          setHeightSlide(metrics.screenHeight - height - sizes.SIZE_24);
          setTotalItemRow(
            Math.floor(
              (metrics.screenHeight - height - sizes.SIZE_24) / sizes.SIZE_65,
            ) * 2,
          );
        }}>
        <View style={styles.headerContainer}>
          <View style={styles.wrapLogoTitle}>
            <Image
              source={images.logos.logo_default}
              style={styles.logoDefault}
            />
            <View style={styles.wrapTitle}>
              <Text style={styles.mainTitle}>Tablet Masstel</Text>
              <Text style={styles.subTitle}>Công cụ học tập an toàn</Text>
            </View>
            <Image
              source={images.logos.logo_masscom}
              style={styles.logoMasscom}
            />
          </View>
          <View style={styles.wrapInputSearch}>
            <Input
              value={textSearch}
              onChangeValue={text => setTextSearch(text)}
              placeholder="Nhập thông tin cần tìm"
              style={styles.inputSearch}
            />
          </View>
        </View>
        <TitleContent customStyle={styles.titleContentContainer} />
      </View>
      <View style={[styles.contentContainer, {height: heightSlide}]}>
        <FlatList
          refreshing={false}
          data={listDATA}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={totalItemWidth}
          decelerationRate="fast"
          bounces={true}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          onMomentumScrollEnd={e => {
            let contentOffset = e.nativeEvent.contentOffset;
            let viewSize = e.nativeEvent.layoutMeasurement;
            let pageNum = Math.ceil(contentOffset.x / viewSize.width);
            console.log(pageNum, 'pageNum----');
            setActivePage(pageNum);
          }}
          getItemLayout={(data, index) => ({
            length: totalItemWidth,
            offset: totalItemWidth * index,
            index,
          })}
          renderItem={({item}) => {
            return (
              <View style={styles.wrapList}>
                {item?.data?.map((ele, key) => {
                  return (
                    <View key={key}>
                      <Item onPress={() => handleDetail(ele)} item={ele} />
                    </View>
                  );
                })}
              </View>
            );
          }}
          contentContainerStyle={styles.contentContainerStyleFlatlist}
        />
      </View>
      <ScalingDot
        data={listDATA}
        scrollX={scrollX}
        containerStyle={styles.dotContainer}
        activeDotScale={1.2}
        dotStyle={styles.dot}
        inActiveDotColor={colors.COLOR_GREY_WHITE}
        activeDotColor={colors.COLOR_RED}
      />
    </SafeAreaView>
  );
};

export default Home;
