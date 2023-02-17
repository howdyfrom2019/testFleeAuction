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
  RefreshControl,
  ScrollView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {auctionType, SSEProps, useSSE} from './src/Hooks/useSSE';
import RandomArtworkSection from './src/Components/RandomArtworkSection';
import {TabView, SceneMap} from 'react-native-tab-view';

function App(): JSX.Element {
  // SSETarget: sse.auction_viewed 이벤트가 발생했을 때 event.data를 관리하는 상태
  const [SSETarget, setSSETarget] = useState<auctionType | null>(null);

  const itemClickedListener = useCallback((e: Event) => {
    const {data} = e as unknown as SSEProps;
    const auctionItem: auctionType = JSON.parse(data);
    setSSETarget(auctionItem);
  }, []);
  // useSSE: sse.auction_viewed 이벤트에 대응할 콜백을 매개변수로 받음.
  const [artwork, setArtWork] = useSSE(itemClickedListener);
  // page, refreshing, routes: TabView 관련된 상태.
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const routes = useMemo(
    () => Array.from({length: 3}, (_, i) => ({key: `${i}`, title: `${i}번째`})),
    [],
  );

  function MainFragment(): JSX.Element {
    return (
      <>
        <RandomArtworkSection artwork={artwork} label={'정렬 1'} />
        <RandomArtworkSection artwork={artwork} label={'정렬 2'} />
      </>
    );
  }

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.root]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentContainerStyle={styles.contents}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
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
