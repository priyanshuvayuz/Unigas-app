import React,{useEffect,useFocusEffect} from 'react'
import { View, Text, TouchableOpacity,ScrollView, StyleSheet,StatusBar,Image, BackHandler, Alert } from 'react-native'
import {TextInput} from 'react-native-paper'
import Iconss from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../components/Header1'
const ProfileScreen = ({navigation}) => {
  let isSelectionModeEnabled= true
  let disableSelectionMode = false
  
    return(
        <>
          <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
          
          <View style={{flex:1,backgroundColor:'#f7f7f7',paddingBottom:50}}>
            <Header title="Profile" />
            <View style={{paddingBottom:60,marginTop:10}}>
              <ScrollView>
                <Image
                style={styles.image}
                source={require('../assets/profile.png')}
                />
                
                {/* <Icons name="circle" size={32}  style={{  position:'absolute',right:135, borderRadius:60, color:'rgb(255,204,102)'}} />
                <Icons name="pencil-outline" size={20}  style={{  position:'absolute',right:140, borderRadius:60, color:'black',top:4}} />
                <Icon name="circle" size={32} style={{  position:'absolute',right:135, borderRadius:60, color:'white',top:0}}/> */}
                <View style={{padding:25}} >
                <TextInput
                  label='Name'
                  mode='outlined'
                  style={styles.input}
                />
                {/* <Iconss name="check" size={24} style={{position:'absolute', right:30,top:52}} /> */}
                <TextInput
                  label='Email'
                  mode='outlined'
                  style={styles.input}
                />
                {/* <Iconss name="check" size={24} style={{position:'absolute', right:30,top:138}} /> */}
                <TextInput
                  label='Phone'
                  mode='outlined'
                  style={styles.input}
                />
                {/* <Iconss name="check" size={24} style={{position:'absolute', right:30,top:220}} /> */}
                <TextInput
                  label='Location'
                  mode='outlined'
                  style={styles.input}
                />
                {/* <Iconss name="check" size={24} style={{position:'absolute', right:30,top:302}} /> */}
                <TextInput
                  label='State'
                  mode='outlined'
                  style={styles.input}
                />
                {/* <Iconss name="check" size={24} style={{position:'absolute', right:30,top:383}} /> */}
                <TextInput
                  label='City'
                  mode='outlined'
                  style={styles.input}
                />
                {/* <Iconss name="check" size={24} style={{position:'absolute', right:30,top:467}} /> */}
                <TextInput
                  label='Pincode'
                  mode='outlined'
                  style={styles.input}
                />
                {/* <Iconss name="check" size={24} style={{position:'absolute', right:30,top:550}} /> */}
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
            
          </View>
          </>
         
      )
  }
  
  const styles = StyleSheet.create({
      card: {
          padding:10,
          paddingTop:0,
          marginBottom:20
      },
      image: {
          height:120,
          width:120,
          alignSelf:'center',
          borderRadius:60
      },
      input: {
        width:'100%',
        height:40,
        backgroundColor:'rgb(255,255,255)',
        borderRadius:5,
        fontSize:16,
        marginBottom:20,
      },
      text1: {
        fontSize:14,
        color:'rgb(213,213,213)',
        marginBottom:3,
        fontWeight:'bold',
        fontFamily:'Helvetica Neue'
      },
      button: {
        alignSelf:'center',
        marginTop:1,
        height:60,
        borderRadius:20,
        width:'100%',
        backgroundColor:'#2e3092',
        bottom:10
    },
    buttonText: {
        fontSize:17,
        alignSelf:'center',
        padding:16,
        color:'white',
        fontWeight:'bold'
    },
  })

export default ProfileScreen
