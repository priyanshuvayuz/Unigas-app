import React, {useState} from 'react'
import {Text,View,StyleSheet,Image,ScrollView,TextInput, Button,TouchableOpacity, StatusBar,Picker} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Feather'
import Header from '../components/Header1'
const FeedbackListingScreen = ({navigation}) => {
 
    return(
      <>
        <StatusBar backgroundColor="white" barStyle = "dark-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
          <Header title="FEEDBACK" />
          {/* <Icon name="add-circle-outline" size={24} style={{position:'absolute', top:1,right:20}} /> */}
        <View>
        <TextInput
        style={styles.search}
        placeholder=" Subject..."
        />
        <Icon name='search' size={24} style={{position:'absolute', right:75,top:8,elevation:5}} />
        <Icon name='filter' size={24} style={{position:'absolute', right:25,top:8}} />

        </View>
        <ScrollView style={{paddingBottom:20}}>
        <View style={styles.card}>
        <View style={{left:30}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#aeb0af'}}>SUBJECT</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>MESSAGE</Text>
          </View>
          <View style={{marginTop:10}}>
            <Icon name="calendar" size={24} style={{position:'absolute', left:32,color:'#aeb0af'}} />
            <Text style={{fontSize:16,fontWeight:'bold', left:60,color:'#aeb0af'}}>ADDED ON</Text>
          </View>
          <View style={{marginTop:15 }}>
          <Icon name="crop" size={22} style={{position:'absolute',left:32,color:'#aeb0af'}} />
            <Text style={{color:'red',fontSize:16,fontWeight:'bold',left:60}}>PROGRESS</Text>
          </View>
          </View>  
          <View style={styles.card}>
        <View style={{left:30}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#aeb0af'}}>SUBJECT</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>MESSAGE</Text>
          </View>
          <View style={{marginTop:10}}>
            <Icon name="calendar" size={24} style={{position:'absolute', left:32,color:'#aeb0af'}} />
            <Text style={{fontSize:16,fontWeight:'bold', left:60,color:'#aeb0af'}}>ADDED ON</Text>
          </View>
          <View style={{marginTop:15 }}>
          <Icon name="crop" size={22} style={{position:'absolute',left:32,color:'#aeb0af'}} />
            <Text style={{color:'red',fontSize:16,fontWeight:'bold',left:60}}>PROGRESS</Text>
          </View>
          </View>
          <View style={styles.card}>
        <View style={{left:30}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#aeb0af'}}>SUBJECT</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>MESSAGE</Text>
          </View>
          <View style={{marginTop:10}}>
            <Icon name="calendar" size={24} style={{position:'absolute', left:32,color:'#aeb0af'}} />
            <Text style={{fontSize:16,fontWeight:'bold', left:60,color:'#aeb0af'}}>ADDED ON</Text>
          </View>
          <View style={{marginTop:15 }}>
          <Icon name="crop" size={22} style={{position:'absolute',left:32,color:'#aeb0af'}} />
            <Text style={{color:'green',fontSize:16,fontWeight:'bold',left:60}}>CLOSED</Text>
          </View>
          </View> 
          </ScrollView> 
        </View>
        
        </>
       
    )
}

const styles = StyleSheet.create({
  card: {
    height: 170,
    width: 100,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    alignSelf:'center',
    width:'90%',
    padding:20,
    marginTop:20,
    elevation:2
    
},
image: {
    height:105,
    width:100,
    backgroundColor:'grey',
    borderRadius:20,
    position:'absolute',
    top:15,
    left:25
},
search: {
    width:'77%',
    height:42,
    marginLeft:25, 
    borderRadius:20,
    fontSize:16,
    marginBottom:10,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
  width: 0,
  height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
}
})

export default FeedbackListingScreen