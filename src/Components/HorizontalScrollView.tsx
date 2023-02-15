import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

function HorizontalScrollView() {
  return (
    <ScrollView horizontal style={styles.container}>
      <Text style={styles.item}>hi</Text>
      <Text style={styles.item}>hi</Text>
      <Text style={styles.item}>hi</Text>
      <Text style={styles.item}>hi</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  item: {
    color: 'white',
  },
});
export default HorizontalScrollView;
