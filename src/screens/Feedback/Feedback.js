import React, {useState} from 'react'
import {Text,View,StyleSheet,Image,ScrollView,TextInput, Button,TouchableOpacity, StatusBar,Picker,AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/Feather'
import Iconss from 'react-native-vector-icons/AntDesign'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header1'
import Api from '../../api/Api'
import { NavigationEvents } from 'react-navigation';

const Feedback = ({navigation}) => {
    const [bar,setBar] = useState(false)
    const [search,setSearch] = useState("")
    const [searchResults, setSearchResults] = useState(null)
    const [feed,setFeed] = useState(null)
    const [profile,setProfile] = useState(null)
    const ok = async()=> {
          try{
            const res = await Api.get('feedback')
            const r = await AsyncStorage.getItem('profile')
            setFeed(res.data.result)
            setProfile(r)
        } catch(e){
          console.log(e.message)
        }
      }
      console.log(feed)
    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
        <NavigationEvents onDidFocus={ok} />
        <Header title="Feedback" bar={bar} />
          {/* <Icon name="add-circle-outline" size={24} style={{position:'absolute', top:1,right:20}} /> */}
        
        {bar?  <TextInput
        value={search}
        onChangeText = {(text)=> setSearch(text)}
        style={styles.search}
        placeholder=" Search customers..."
        /> : null}
        <Icons name='filter' size={24} style={{position:'absolute', top:25,right:20,color:'white'}} onPress={()=> book()} />
          {bar? <Iconss name='close' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> : 
          <Icons name='search' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> }

        
        <ScrollView style={{paddingBottom:20}}>
        <View style={styles.card}>
        <View style={{left:30}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#aeb0af'}}>SUBJECT</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>MESSAGE</Text>
          </View>
          <View style={{marginTop:10}}>
            <Icons name="calendar" size={24} style={{position:'absolute', left:32,color:'#aeb0af'}} />
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
    position:'absolute',
    width:200,
    height:40,
    borderRadius:10,
    fontSize:16,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
  width: 0,
  height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
    left:65,
    top:20
  },
})

export default Feedback