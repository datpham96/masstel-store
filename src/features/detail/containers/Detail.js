import React, {useState, useRef, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  FlatList,
  Animated,
  useWindowDimensions,
  Linking,
} from 'react-native';
import {sizes, commonStyles, colors} from 'styles';
import images from 'images';
import styles from './styles';
import {Input, Text, Button} from 'base';
import {TitleContent, Item} from 'components';
import {useNavigation} from '@react-navigation/native';
import navigationTypes from 'navigationTypes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHtml from 'react-native-render-html';
import metrics from 'metrics';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import {useQuery} from 'react-query';
import keyTypes from 'keyTypes';
import {applicationDetail, applicationList} from 'src/api/methods/app';
import Share from 'react-native-share';
import {checkVar} from 'src/helpers/funcs';

const totalItemWidth = metrics.screenWidth - sizes.SIZE_40;

const Detail = ({route}) => {
  const params = route?.params;
  const typingTimoutRef = useRef(null);
  const [textSearch, setTextSearch] = useState('');
  const [debounceTextSearch, setDebounceTextSearch] = useState(false);
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [totalItemRow] = useState(16);
  const [activePage, setActivePage] = useState(0);
  const handleDetail = () => {
    navigation.replace(navigationTypes.detail.screen);
  };

  const {data, refetch, isSuccess, isLoading} = useQuery(
    [
      keyTypes.APPLICATION_DETAIL,
      {
        app_id: params?.app_id,
      },
    ],
    () => applicationDetail(params?.app_id),
    {
      keepPreviousData: true,
    },
  );

  const {
    data: dataAppList,
    refetch: refetchAppList,
    isSuccess: isSuccessAppList,
    isLoading: isLoadingAppList,
  } = useQuery(keyTypes.APPLICATION_LIST, () => applicationList(), {
    keepPreviousData: true,
  });

  const listDATA = useMemo(() => {
    let tmpList = [];
    if (dataAppList?.data && isSuccessAppList && totalItemRow) {
      let listDataSearch = [];
      if (textSearch === '') {
        listDataSearch = [];
      }
      let list = dataAppList?.data;
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
  }, [dataAppList, isSuccess, totalItemRow, activePage, debounceTextSearch]);

  const handleButtonShare = () => {
    Share.open({
      title: data?.data?.name,
      url: data?.data?.url_android,
      // message: data?.data?.name + ':', //?????ng tr?????c url
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

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

  const handleGooglePlay = () => {
    if (!data?.data?.url_android) {
      return;
    }
    Linking.openURL(data?.data?.url_android);
  };

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={commonStyles.flex1}>
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
        <View style={styles.contentContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerScroll}
            style={commonStyles.flex1}>
            <TitleContent />
            <View style={styles.wrapImage}>
              <Image
                style={styles.imageHeader}
                source={
                  data?.data?.icon
                    ? {uri: data?.data?.icon}
                    : images.avatars.picture_default
                }
              />
              <Button
                onPress={handleGooglePlay}
                customStyle={styles.buttonDownload}
                label="T???i file apk"
              />
            </View>
            <View style={styles.wrapContentHeader}>
              <View style={styles.wrapContentTitle}>
                <Text
                  props={{
                    numberOfLines: sizes.SIZE_1,
                  }}
                  style={styles.contentTitle}>
                  {data?.data?.name}
                </Text>
                <Text style={styles.contentSubTitle}>
                  Th??ng tin m?? t??? ???ng d???ng
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.buttonShare}
                onPress={handleButtonShare}>
                <Image
                  style={styles.iconButtonShare}
                  source={images.icons.share}
                />
              </TouchableOpacity>
            </View>
            {checkVar.isHTML(data?.data?.content) ? (
              <RenderHtml
                contentWidth={metrics.screenWidth - sizes.SIZE_40}
                source={{
                  html: data?.data?.content,
                }}
              />
            ) : (
              <Text>{data?.data?.content}</Text>
            )}
            {listDATA?.length > 0 && (
              <>
                <TitleContent
                  title="???ng d???ng kh??c"
                  customStyle={styles.titleDiffApp}
                />
                <View style={styles.flatListContainer}>
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
                      let pageNum = Math.trunc(
                        contentOffset.x / viewSize.width,
                      );
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
                                <Item
                                  onPress={() => handleDetail(ele)}
                                  item={ele}
                                />
                              </View>
                            );
                          })}
                        </View>
                      );
                    }}
                    contentContainerStyle={styles.contentContainerStyleFlatlist}
                  />
                  <ScalingDot
                    data={listDATA}
                    scrollX={scrollX}
                    containerStyle={styles.dotContainer}
                    activeDotScale={1.2}
                    dotStyle={styles.dot}
                    inActiveDotColor={colors.COLOR_GREY_WHITE}
                    activeDotColor={colors.COLOR_RED}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </View>
        <View style={styles.wrapBottom}>
          <TouchableOpacity
            onPress={handleGooglePlay}
            style={styles.btnPlay}
            activeOpacity={0.9}>
            <Image source={images.icons.chplay} style={styles.iconChplay} />
            <Text style={styles.textPlay}>Google Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
