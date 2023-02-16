import {render, screen} from '@testing-library/react-native';
import HorizontalScrollView from '../../src/Components/HorizontalScrollView';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import '@testing-library/jest-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    width: SCREEN_WIDTH,
  },
});
describe('HorizontalScrollView 컴포넌트 테스트', () => {
  it('HorizontalScrollView 컴포넌트 렌더링', () => {
    render(
      <View style={styles.flex}>
        <HorizontalScrollView>
          <View style={styles.item}>
            <Text style={styles.flex}>hi</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.flex}>hi</Text>
          </View>
        </HorizontalScrollView>
      </View>,
    );
  });
  it('가로 스크롤에서 hi는 한 번만 보입니다.', () => {
    render(
      <View style={styles.flex}>
        <HorizontalScrollView>
          <View style={styles.item}>
            <Text style={styles.flex} accessibilityHint={`hi_1`}>
              hi
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.flex} accessibilityHint={`hi_2`}>
              hi
            </Text>
          </View>
        </HorizontalScrollView>
      </View>,
    );
    const hi = screen.getAllByAccessibilityHint('hi_1');
    expect(hi.length).toBe(1);
  });
});
