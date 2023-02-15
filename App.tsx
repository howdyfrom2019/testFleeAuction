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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import HorizontalScrollView from './src/Components/HorizontalScrollView';
import {auctionType, SSEProps, useSSE} from './src/Hooks/useSSE';
import ArtworkDash from "./src/Components/ArtworkDash";

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
      <View style={styles.contents}>
        <Text style={styles.label}>가로 스크롤 영역 #1</Text>
        <HorizontalScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToStart>
          {artwork.map((value, i) => (
            <ArtworkDash
              auctionType={value}
              key={i}
              style={i > 0 ? {marginLeft: 4} : {}}
            />
          ))}
        </HorizontalScrollView>
      </View>
      <View style={styles.contents}>
        <Text style={styles.label}>가로 스크롤 영역 #2</Text>
        <HorizontalScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToStart>
          {artwork.map((value, i) => (
            <ArtworkDash
              auctionType={value}
              key={i}
              style={i > 0 ? {marginLeft: 4} : {}}
            />
          ))}
        </HorizontalScrollView>
      </View>
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
