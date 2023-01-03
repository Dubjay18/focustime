import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={item.status > 1 ?  styles.historyItem : styles.historyItem2}>{item.subject}</Text>;
};
export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
         
       {!!focusHistory.length && (
         <>
          <Text style={styles.title}>Things we've focused on</Text>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
            <View style={styles.clearContainer}>
      <RoundedButton size={75} title="Clear" onPress={()=> onClear()}/></View>
         </>
        )}
       
      </SafeAreaView>
     
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    color: 'red',
    fontSize: fontSizes.md
  },
   historyItem2: {
    color: 'green',
    fontSize: fontSizes.md
  },
  title: {
    color: '#fff',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md
  }
});
