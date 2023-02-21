import React, {useMemo} from 'react';
import {Text} from 'react-native';
import {useAuctionStore} from '../../Store/store';

const ViewCount = ({id}: {id: number}) => {
  const {items} = useAuctionStore();
  const countUI = useMemo(() => {
    const item = items.filter(val => val.auctionId === id);
    if (item.length === 0) {
      return '정보 없음';
    }
    return String(item[0]);
  }, [items, id]);

  return <Text>{countUI}</Text>;
};

export default ViewCount;
