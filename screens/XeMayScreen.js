import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchXe, addXe, deleteXe, updateXe } from '../redux/xeSlice';

const XeMayScreen = () => {
  const dispatch = useDispatch();
  const listXe = useSelector(state => state.xe.list);

  const [tenXe, setTenXe] = useState('');
  const [mauSac, setMauSac] = useState('');
  const [giaBan, setGiaBan] = useState('');
  const [moTa, setMoTa] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchXe());
  }, [dispatch]);

  // Filter listXe based on searchText
  const filteredList = listXe.filter(xe =>
    xe.ten_xe_ph1234.toLowerCase().includes(searchText.toLowerCase()) ||
    xe.gia_ban_ph1234.toString().includes(searchText)
  );

  const resetForm = () => {
    setTenXe('');
    setMauSac('');
    setGiaBan('');
    setMoTa('');
    setHinhAnh('');
    setEditId(null);
  };

  const handleAddOrUpdate = () => {
    if (!tenXe || !mauSac || !giaBan || !moTa || !hinhAnh) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const xe = {
      ten_xe_ph1234: tenXe,
      mau_sac_ph1234: mauSac,
      gia_ban_ph1234: parseInt(giaBan),
      mo_ta_ph1234: moTa,
      hinh_anh_ph1234: hinhAnh
    };

    if (editId === null) {
      dispatch(addXe(xe)).then(() => {
        Alert.alert('Thêm thành công');
        resetForm();
      });
    } else {
      dispatch(updateXe({ ...xe, id: editId })).then(() => {
        Alert.alert('Cập nhật thành công');
        resetForm();
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteXe(id));
  };

  const handleEdit = (xe) => {
    setEditId(xe.id);
    setTenXe(xe.ten_xe_ph1234);
    setMauSac(xe.mau_sac_ph1234);
    setGiaBan(xe.gia_ban_ph1234.toString());
    setMoTa(xe.mo_ta_ph1234);
    setHinhAnh(xe.hinh_anh_ph1234);
  };

  const renderForm = () => (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        placeholder="Tên xe"
        value={tenXe}
        onChangeText={setTenXe}
        style={styles.input}
      />
      <TextInput
        placeholder="Màu sắc"
        value={mauSac}
        onChangeText={setMauSac}
        style={styles.input}
      />
      <TextInput
        placeholder="Giá bán"
        value={giaBan}
        onChangeText={setGiaBan}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Mô tả"
        value={moTa}
        onChangeText={setMoTa}
        style={styles.input}
      />

      <Button
        title={editId === null ? 'Thêm xe' : 'Cập nhật xe'}
        onPress={handleAddOrUpdate}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Tìm kiếm */}
      <TextInput
        placeholder="Tìm kiếm theo tên hoặc giá"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      <FlatList
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderForm}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.hinh_anh_ph1234 }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.ten_xe_ph1234}</Text>
              <Text>{item.mo_ta_ph1234}</Text>
              <Text>Màu: {item.mau_sac_ph1234}</Text>
              <Text>Giá: {item.gia_ban_ph1234} đ</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity onPress={() => handleEdit(item)} activeOpacity={0.6}>
                  <Text style={styles.edit}>Sửa</Text>
                </TouchableOpacity>
                <Text> | </Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)} activeOpacity={0.6}>
                  <Text style={styles.delete}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 5,
    borderRadius: 6
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4
  },
  img: {
    width: 100,
    height: 80,
    marginRight: 10,
    borderRadius: 6
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333'
  },
  delete: {
    color: 'red',
    fontWeight: '600'
  },
  edit: {
    color: 'blue',
    fontWeight: '600'
  },
});

export default XeMayScreen;
