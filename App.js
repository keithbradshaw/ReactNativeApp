import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import Task from './components/Task';

//DD RUM


export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  //On call, append the newtask to taskItems array
  const handleAddTask=()=>{
    setTaskItems([...taskItems, task]);
    setTask(null)
  }

  const taskCompleted = (index) =>{
    let currentItems = [...taskItems];
    currentItems.splice(index, 1);
    setTaskItems(currentItems);
  }
  return (
    <View style={styles.container}>
      {/* Todays tasks */}
      <View style={styles.tasksWrapper}>
       <Text style={styles.sectionTitle}>Today's Tasks</Text> 
           {/* Task list go here */}
          <View style={styles.items}>
            {
              taskItems.map((item, index)=>{
              return(
                <TouchableOpacity key={index} onPress={()=> taskCompleted(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )
              })
              

            }
          </View>
      </View>

      {/* Add a Task */}
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskManager}
      >
        <TextInput  style={styles.input} placeholder={"Add a task"} value={task} onChangeText={text=> setTask(text)}></TextInput>
        <TouchableOpacity onPress={()=> handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addTask}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal:20,
  },
sectionTitle:{
  fontSize:24,
  fontWeight: 'bold'
},
items:{
  marginTop: 30,
},
writeTaskManager:{
  position: 'absolute',
  bottom: 60,
  width: '100%',
  flexDirection:'row',
  justifyContent: 'space-around',
  alignItems: 'center'
},
input:{
  paddingHorizontal:15,
  paddingVertical: 15,
  width: 250,
  borderColor:'#C0C0C0',
  borderRadius: 60,

  backgroundColor:'#FFF'

},
addWrapper:{
  width: 60,
  height:60,
  backgroundColor: '#FFF',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor:'#C0C0C0',
},
addTask:{},
});
