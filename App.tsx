/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {auctionType, SSEProps, useSSE} from './src/Hooks/useSSE';
import RandomArtworkSection from './src/Components/RandomArtworkSection';

function App(): JSX.Element {
  const [SSETarget, setSSETarget] = useState<auctionType | null>(null);

  const itemClickedListener = useCallback((e: Event) => {
    const {data} = e as unknown as SSEProps;
    const auctionItem: auctionType = JSON.parse(data);
    setSSETarget(auctionItem);
  }, []);

  const [artwork, setArtWork] = useSSE(itemClickedListener);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onChangeArtwork = useCallback(
    (target: auctionType) => {
      const {auctionId} = target;
      setArtWork(prev => {
        return prev.map(v => {
          if (v.auctionId === auctionId) {
            return target;
          }
          return v;
        });
      });
    },
    [setArtWork],
  );

  useEffect(() => {
    if (SSETarget) {
      onChangeArtwork(SSETarget);
    }
  }, [SSETarget, onChangeArtwork]);

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={styles.headerFont}>헤더 영역</Text>
      </View>
      <View style={styles.contents}>
        <RandomArtworkSection artwork={artwork} label={'정렬 1'} />
        <RandomArtworkSection artwork={artwork} label={'정렬 2'} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerFont: {
    fontSize: 16,
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
  contents: {
    flex: 4,
  },
});

export default App;
