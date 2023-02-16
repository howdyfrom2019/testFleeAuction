/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {TabView, SceneMap} from 'react-native-tab-view';

function App(): JSX.Element {
  const [SSETarget, setSSETarget] = useState<auctionType | null>(null);

  const itemClickedListener = useCallback((e: Event) => {
    const {data} = e as unknown as SSEProps;
    const auctionItem: auctionType = JSON.parse(data);
    setSSETarget(auctionItem);
  }, []);

  function MainFragment(): JSX.Element {
    return (
      <>
        <RandomArtworkSection artwork={artwork} label={'정렬 1'} />
        <RandomArtworkSection artwork={artwork} label={'정렬 2'} />
      </>
    );
  }

  const [artwork, setArtWork] = useSSE(itemClickedListener);
  const [page, setPage] = useState(0);
  const routes = useMemo(
    () => Array.from({length: 3}, (_, i) => ({key: `${i}`, title: `${i}번째`})),
    [],
  );
  const renderScene = SceneMap({
    '0': MainFragment,
    '1': MainFragment,
    '2': MainFragment,
  });
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
      <TabView
        onIndexChange={setPage}
        navigationState={{index: page, routes}}
        renderScene={renderScene}
        initialLayout={{width: Dimensions.get('screen').width}}
        tabBarPosition={'bottom'}
        style={styles.contents}
      />
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
