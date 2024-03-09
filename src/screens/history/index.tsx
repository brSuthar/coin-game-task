import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const History = () => {
  const list = useSelector((state: RootState) => state.history.list);

  const renderItem = ({item}: any) => {
    return (
      <View
        style={{
          height: 50,
          width: '100%',
          backgroundColor: '#ECF0F3',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          borderRadius: 8,
          marginTop: 8,
        }}>
        <Text>{`${item?.name}`}</Text>
        <Text>{item?.status}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: 'white'}}>
      <FlatList data={list} renderItem={renderItem} />
    </View>
  );
};

export default History;
