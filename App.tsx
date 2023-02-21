/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import {TabView} from 'react-native-tab-view';
import TabMainFragment from './src/Layout/TabMainFragment';
import {SceneRendererProps} from 'react-native-tab-view/lib/typescript/src/types';
import SSECaptureLayer from "./src/Layout/SSECaptureLayer";

function App(): JSX.Element {
  // page, refreshing, routes: TabView 관련된 상태.
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const routes = useMemo(
    () => Array.from({length: 3}, (_, i) => ({key: `${i}`, title: `${i}번째`})),
    [],
  );

  const renderScene = useCallback(
    ({route}: SceneRendererProps & {route: {key: string; title: string}}) => {
      switch (route.key) {
        case '0':
          return <TabMainFragment />;
        case '1':
          return <TabMainFragment />;
        case '2':
          return <TabMainFragment />;
        default:
          throw new Error('unhandled operation');
      }
    },
    [],
  );

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
        <SSECaptureLayer>
          <TabView
            onIndexChange={setPage}
            navigationState={{index: page, routes}}
            renderScene={renderScene}
            initialLayout={{width: Dimensions.get('screen').width}}
            tabBarPosition={'bottom'}
            style={styles.contents}
          />
        </SSECaptureLayer>
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
