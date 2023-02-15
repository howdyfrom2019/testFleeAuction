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
  ScrollView,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import HorizontalScrollView from './src/Components/HorizontalScrollView';
import {auctionType, SSEProps, useSSE} from './src/Hooks/useSSE';

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
      <ScrollView style={styles.contents}>
        <Text style={styles.label}>가로 스크롤 영역 #1</Text>
        <HorizontalScrollView />
      </ScrollView>
      <ScrollView style={styles.contents}>
        <Text style={styles.label}>가로 스크롤 영역 #2</Text>
        <HorizontalScrollView />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 36,
    flex: 1,
  },
  highlight: {
    fontWeight: '700',
  },
  label: {
    fontWeight: '600',
  },
  contents: {
    flex: 4,
  },
});

export default App;
