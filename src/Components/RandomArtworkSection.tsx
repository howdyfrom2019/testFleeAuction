import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {auctionType} from '../Hooks/useSSE';
import HorizontalScrollView from './HorizontalScrollView';
import ArtworkDash from './ArtworkDash';
import {shuffle} from '../Utils/CommonFunction';

interface Props {
  label?: string;
  artwork: auctionType[];
}

function RandomArtworkSection({artwork, label}: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <HorizontalScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToStart>
        {shuffle(artwork).map((value, i) => (
          <ArtworkDash
            auctionType={value}
            key={i}
            style={i > 0 ? {marginLeft: 4} : {}}
          />
        ))}
      </HorizontalScrollView>
    </View>
  );
}

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
