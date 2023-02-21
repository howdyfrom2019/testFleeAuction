import React from 'react';
import {Dimensions, StyleSheet, Text, View, ViewStyle} from 'react-native';
import ViewCount from "./ViewCount";

interface ArtworkDashProps {
  style?: ViewStyle;
  id: number;
  count: number;
}
const ArtworkDash = React.memo(({style, id, count}: ArtworkDashProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <Text style={styles.bold}>작품 ID</Text>
        <Text>{id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>조회수</Text>
        <ViewCount count={count} id={id} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcdcdc',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    width: Dimensions.get('screen').width / 3,
    alignSelf: 'center',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bold: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ArtworkDash;
