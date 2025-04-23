// components/BannerList.js
import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  { id: 1, url: 'https://tse1.mm.bing.net/th?id=OIP.asI-cGdH7-1XcbTQLbHFCwHaDB&pid=Api&P=0&h=180' },
  { id: 2, url: 'https://tse4.mm.bing.net/th?id=OIP.wjxMhy0av1zvE0ep-F8NWAHaDH&pid=Api&P=0&h=180' },
  { id: 3, url: 'https://tse2.mm.bing.net/th?id=OIP.Y9G6e1EAX8MUlNuCx0rLTAHaDL&pid=Api&P=0&h=180' },
];

const BannerList = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
      >
        {banners.map((banner) => (
          <View key={banner.id} style={styles.card}>
            <Image
              source={{ uri: banner.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  card: {
    width: width * 0.9,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: width * 0.025,
    backgroundColor: '#eee',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default BannerList;
