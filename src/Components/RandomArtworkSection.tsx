import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {auctionType} from '../Hooks/useSSE';
import HorizontalScrollView from './HorizontalScrollView';
import ArtworkDash from './ArtworkDash/ArtworkDash';
import {shuffle} from '../Utils/CommonFunction';

interface Props {
  label?: string;
}

const RandomArtworkSection = ({label}: Props) => {
  const artwork = useMemo<auctionType[]>(
    () =>
      shuffle(
        Array.from({length: 25}, (_, i) => ({
          auctionId: 2198 + i,
          viewCount: -1,
        })),
      ),
    [],
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <HorizontalScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToStart>
        {artwork.map((value, i) => (
          <ArtworkDash
            count={value.viewCount}
            id={value.auctionId}
            key={value.auctionId}
            style={i > 0 ? {marginLeft: 4} : {}}
          />
        ))}
      </HorizontalScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  label: {
    fontWeight: '600',
  },
});

export default RandomArtworkSection;
