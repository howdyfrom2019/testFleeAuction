import RandomArtworkSection from '../Components/RandomArtworkSection';
import React from 'react';
import {StyleSheet, View} from 'react-native';

function TabMainFragment() {
  return (
    <View style={styles.container}>
      <RandomArtworkSection label={'정렬 1'} />
      <RandomArtworkSection label={'정렬 2'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default TabMainFragment;
