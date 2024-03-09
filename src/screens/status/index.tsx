import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const Status = ({route}: any) => {
  const {title} = route?.params;
  const {list, win, lost} = useSelector((state: RootState) => state.history);
  console.log('List:: ', list);

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
          marginTop: 10,
        }}>
        <Text>{`${item?.name}`}</Text>
        <Text>{item?.status}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: 'white'}}>
      <Text style={{textAlign: 'center', marginVertical: 16}}>{title}</Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Win - {win}</Text>
        <Text>lose - {lost}</Text>
      </View>
      <FlatList data={list} renderItem={renderItem} />
    </View>
  );
};

export default Status;
