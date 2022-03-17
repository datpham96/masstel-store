import React, {useState, useRef, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  FlatList,
  Animated,
  useWindowDimensions,
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
import {applicationDetail} from 'src/api/methods/app';
import Share from 'react-native-share';

const totalItemWidth = metrics.screenWidth - sizes.SIZE_40;

const Detail = ({route}) => {
  const params = route?.params;
  const typingTimoutRef = useRef(null);
  const [textSearch, setTextSearch] = useState('');
  const [debounceTextSearch, setDebounceTextSearch] = useState(false);
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const [totalItemRow, setTotalItemRow] = useState(16);
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

  console.log(data, 'data---');

  const listDATA = useMemo(() => {
    let tmpList = [];
    if (data?.data && isSuccess && totalItemRow) {
      for (let i = 0; i < Math.ceil(data.data.length / totalItemRow); i++) {
        tmpList.push({
          key: i,
          data: data.data.slice(
            totalItemRow * activePage,
            totalItemRow * (activePage + 1),
          ),
        });
      }
    }
    return tmpList;
  }, [data, isSuccess, totalItemRow, activePage]);

  const websiteList = useMemo(() => {
    let tmpList = [];
    if (textSearch === '') {
      tmpList = [];
    }
    if (isSuccess && data?.data) {
      let list = data?.data;
      const regex = new RegExp(`${textSearch.trim()}`, 'i');
      tmpList = list.filter(obj => obj.title.search(regex) >= 0);
    }
    return tmpList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, debounceTextSearch, isSuccess]);

  console.log(data?.data, 'data?.data--');

  const handleButtonShare = () => {
    Share.open({
      title: 'Đạt share',
      url: 'https://google.com',
      message: 'Đạt đang share', //Đứng trước url
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
              onChangeValue={handleSearchTermChange}
              placeholder="Nhập thông tin cần tìm"
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
                source={images.avatars.picture_default}
              />
              <Button
                customStyle={styles.buttonDownload}
                label="Tải file apk"
              />
            </View>
            <View style={styles.wrapContentHeader}>
              <View style={styles.wrapContentTitle}>
                <Text style={styles.contentTitle}>Chegg Study</Text>
                <Text style={styles.contentSubTitle}>
                  Thông tin mô tả ứng dụng
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
            <RenderHtml
              contentWidth={metrics.screenWidth - sizes.SIZE_40}
              source={{
                html: '<p>Ngày 15/3, trao đổi với PV <a href="https://www.24h.com.vn/an-toan-giao-thong-c51e3795.html">Báo Giao thông</a>, Thiếu tá Lý Thị Thu Trang, Phó đội trưởng Đội Chỉ huy <a href="https://www.24h.com.vn/an-toan-giao-thong-c51e3795.html">giao thông</a> và điều khiển đèn tín hiệu giao thông, (Phòng CSGT Công an TP Hà Nội) thông tin, năm 2021, hệ thống camera giao thông ở Hà Nội đã ghi nhận 246 xe biển xanh và biển đỏ vi phạm giao thông trên đường phố Thủ đô.</p> <p><img alt="Hàng trăm xe biển xanh, đỏ &#34;dính&#34; phạt nguội vi phạm giao thông ở Thủ đô - 1" src="https://cdn.24h.com.vn/upload/1-2022/images/2022-03-15//1647320960-img-bgt-2021-275727761-254705580205132-4477202276526383434-n-1647313358-width1280height720-width700height393.jpg" style="width:660px" /></p> <p>CSGT rà soát, kiểm tra đối với phương tiện vi phạm qua hình ảnh</p> <p>Cụ thể, đã có 143 ô tô biển đỏ, 103 ô tô biển xanh vi phạm giao thông bị hệ thống camera ghi lại để phạt nguội, với các hành vi vi phạm như đi sai làn đường, không chấp hành hiệu lệnh của đèn tín hiệu chỉ huy giao thông...</p> <p>Chỉ tính 1 tháng gần đây, qua hệ thống camera giao thông đã ghi lại hình ảnh 7 phương tiện biển xanh, biển đỏ vi phạm, trong đó 6 phương tiện biển đỏ, 1 phương tiện biển xanh.</p> <p>"Các vi phạm giao thông phát hiện qua camera đều được Đội Chỉ huy giao thông và điều khiển đèn tín hiệu giao thông đã tiến hành gửi thông báo vi phạm về nơi cư trú, công tác, yêu cầu người điều khiển phương tiện vi phạm tới lập biên bản xử lý", Thiếu tá Trang cho hay.</p> <p>Còn theo Đại uý Đặng Trần Hưng, Tổ Xử lý, Đội Chỉ huy giao thông và điều khiển đèn tín hiệu giao thông, hiện đơn vị đang triển khai đẩy mạnh việc nộp phạt qua cổng dịch vụ công.</p> <p>"Quá trình TTKS, phát hiện vi phạm giao thông, CSGT sẽ hướng dẫn để người vi phạm nộp phạt qua dịch vụ công quốc gia, người vi phạm chỉ cần cung cấp căn cước công dân, số điện thoại là sẽ nhận được biên bản vi phạm, nộp phạt online, nhận lại giấy tờ tại nhà", Đại uý Hưng cho hay.</p> <p>Thiếu tá Lý Thị Thu Trang thông tin thêm, qua công tác thống kê, từ ngày 1/3 đến nay đã có 157 trường hợp người điều khiển phương tiện vi phạm nộp phạt qua dịch vụ công và nhận giấy tờ tại nhà.</p>',
              }}
            />
            <TitleContent
              title="Ứng dụng khác"
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
          </ScrollView>
        </View>
        <View style={styles.wrapBottom}>
          <TouchableOpacity style={styles.btnPlay} activeOpacity={0.9}>
            <Image source={images.icons.chplay} style={styles.iconChplay} />
            <Text style={styles.textPlay}>Google Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
