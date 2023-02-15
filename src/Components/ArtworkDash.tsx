import React from "react";
import { Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native";
import {auctionType} from '../Hooks/useSSE';

interface ArtworkDashProps {
  auctionType: auctionType,
  style?: ViewStyle,
}
function ArtworkDash({
  auctionType: {auctionId, viewCount},
  style,
}: ArtworkDashProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <Text style={styles.bold}>작품 ID</Text>
        <Text>{auctionId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>조회수</Text>
        <Text>{viewCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    width: Dimensions.get('screen').width / 3,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ArtworkDash;
