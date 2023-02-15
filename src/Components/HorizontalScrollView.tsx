import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ArtworkDash from './ArtworkDash';

function HorizontalScrollView() {
  return (
    <ScrollView horizontal style={styles.container}>
      <ArtworkDash auctionType={{ auctionId: 1, viewCount: 1}} />
      <ArtworkDash auctionType={{ auctionId: 1, viewCount: 1}} style={{ marginLeft: 4 }} />
      <ArtworkDash auctionType={{ auctionId: 1, viewCount: 1}} style={{ marginLeft: 4 }} />
      <ArtworkDash auctionType={{ auctionId: 1, viewCount: 1}} style={{ marginLeft: 4 }} />
      <ArtworkDash auctionType={{ auctionId: 1, viewCount: 1}} style={{ marginLeft: 4 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    color: 'white',
  },
});
export default HorizontalScrollView;
