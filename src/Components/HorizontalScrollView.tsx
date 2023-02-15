import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

interface HorizontalScrollProps extends ScrollViewProps {
  children?: React.ReactNode;
}

function HorizontalScrollView({children, ...props}: HorizontalScrollProps) {
  return (
    <ScrollView style={styles.container} {...props} horizontal>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#dcdcdc',
  },
});
export default HorizontalScrollView;
