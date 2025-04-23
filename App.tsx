import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FlatList, Text, StyleSheet } from 'react-native';
import XeMayScreen from './screens/XeMayScreen';
import BannerList from './components/BannerList';

export default function App() {
  // Danh sách các component muốn hiển thị
  const data = [
    { key: 'banner', component: <BannerList /> },
    { key: 'header', component: <Text style={styles.header}>Quản lý xe máy</Text> },
    { key: 'xeMayScreen', component: <XeMayScreen /> }
  ];

  return (
    <Provider store={store}>
      <FlatList
        data={data}
        renderItem={({ item }) => item.component}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.container}
      />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
});
