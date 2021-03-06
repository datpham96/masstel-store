import React, {useState, useRef} from 'react';
import {SafeAreaView, View, Animated, Image} from 'react-native';
import {sizes, commonStyles, colors} from 'styles';
import images from 'images';
import styles from './styles';
import {Input, Text} from 'base';
import {Item, TitleContent, Loading, EmptyData} from 'components';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import navigationTypes from 'navigationTypes';
import metrics from 'metrics';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import {useQuery} from 'react-query';
import keyTypes from 'keyTypes';
import {applicationList} from 'src/api/methods/app';
import {checkVar} from 'src/helpers/funcs';

const totalItemWidth = metrics.screenWidth - sizes.SIZE_40;

const Home = () => {
  const [textSearch, setTextSearch] = useState('');
  const navigation = useNavigation();
  const typingTimoutRef = useRef(null);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [heightSlide, setHeightSlide] = useState(0);
  const [totalItemRow, setTotalItemRow] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [debounceTextSearch, setDebounceTextSearch] = useState(false);

  const {data, refetch, isSuccess, isLoading} = useQuery(
    keyTypes.APPLICATION_LIST,
    () => applicationList(),
    {
      keepPreviousData: true,
      enabled: false,
    },
  );

  React.useEffect(() => {
    if (totalItemRow) {
      refetch();
    }
  }, [totalItemRow, activePage, refetch]);

  const listDATA = React.useMemo(() => {
    let tmpList = [];
    if (data?.data && isSuccess && totalItemRow) {
      let listDataSearch = [];
      if (textSearch === '') {
        listDataSearch = [];
      }
      let list = data?.data;
      const regex = new RegExp(`${textSearch.trim()}`, 'i');
      listDataSearch = list.filter(obj => obj?.name.search(regex) >= 0);
      for (
        let i = 0;
        i < Math.ceil(listDataSearch.length / totalItemRow);
        i++
      ) {
        tmpList.push({
          key: i,
          data: listDataSearch.slice(
            totalItemRow * activePage,
            totalItemRow * (activePage + 1),
          ),
        });
      }
    }
    return tmpList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, totalItemRow, activePage, debounceTextSearch]);

  const handleSearchTermChange = val => {
    setTextSearch(val);
    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }
    typingTimoutRef.current = setTimeout(async () => {
      //typing code
      setDebounceTextSearch(!debounceTextSearch);
    }, 300);
  };

  const handleDetail = item => {
    navigation.navigate(navigationTypes.detail.screen, {app_id: item.id});
  };

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          setHeightSlide(metrics.screenHeight - height - sizes.SIZE_24);
          setTotalItemRow(
            Math.floor(
              (metrics.screenHeight - height - sizes.SIZE_24 - sizes.SIZE_15) /
                sizes.SIZE_65,
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
              <Text style={styles.subTitle}>C??ng c??? h???c t???p an to??n</Text>
            </View>
            <Image
              source={images.logos.logo_masscom}
              style={styles.logoMasscom}
            />
          </View>
          <View style={styles.wrapInputSearch}>
            <Input
              value={textSearch}
              onChangeValue={handleSearchTermChange}
              placeholder="Nh???p th??ng tin c???n t??m"
              style={styles.inputSearch}
            />
          </View>
        </View>
        <TitleContent customStyle={styles.titleContentContainer} />
      </View>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : isSuccess && !checkVar.isEmpty(data?.data) ? (
        <>
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
                let pageNum = Math.trunc(contentOffset.x / viewSize.width);
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
          <View style={styles.dotContainer}>
            <ScalingDot
              data={listDATA}
              scrollX={scrollX}
              activeDotScale={1.2}
              dotStyle={styles.dot}
              inActiveDotColor={colors.COLOR_GREY_WHITE}
              activeDotColor={colors.COLOR_RED}
            />
          </View>
        </>
      ) : (
        <EmptyData />
      )}
    </SafeAreaView>
  );
};

export default Home;
