import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/Timer/Timer';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';


const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
}
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  
  const addFocusHistorySubjectWithState = (subject, status)=>{
    setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1),subject, status}])
  }

const onClear = () =>{
  setFocusHistory([]);
}
const saveFocusHistory = async () =>{
  try{
    AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));

  }catch(e){
    console.log(e);
  }
};
const loadFocusHistory = async () =>{
  try{
    const history = await AsyncStorage.getItem("focusHistory");
    if(history && JSON.parse(history).length){
    setFocusHistory(JSON.parse(history))}
  }catch(e){
    console.log(e)
  }
}


useEffect(()=>{
  loadFocusHistory();
  
},[]);
useEffect(()=>{
  saveFocusHistory();
  
},[focusHistory]);


  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE)
            setFocusSubject(null);
          }}
          clearSubject={()=>{
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED)
            setFocusSubject(null)}}
        />
      ) : (
        <View style={{flex:1}}>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.skyBlue,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
