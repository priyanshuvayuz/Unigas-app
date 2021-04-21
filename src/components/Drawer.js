import React, {useContext,useEffect,useState} from 'react'
import {StyleSheet, Text,Animated ,View, SafeAreaView, ScrollView, Dimensions, Image,TouchableOpacity} from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {Context as AuthContext} from '../context/AuthContext'
import Api from '../api/Api'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationEvents } from 'react-navigation'; 
const Drawer = (props) => {
    const {state,signout} = useContext(AuthContext)
    const role= state.role
    const [name,setName] = useState(role)
    // const { itemss, ...dist } = props;
    const { items, ...rest } = props;
    const filteredItem = items.filter(item => item.key !== "Feedback");
    const filteredItems = items.filter(item => item.key !== "OrderApproval"  && item.key !== "SalesExecutive" && item.key !== "Feedback");
    
    const filteredItems1 = items.filter(item => item.key !== "OrderApproval"  && item.key !== "SalesExecutive" && item.key!=='Distributor');
    
  
    return (
        <SafeAreaView style={{flex: 1, marginTop: 20}}>
          {/* <NavigationEvents onDidFocus={ok} /> */}
        {/* <Animated.View style={{ transform: [{ translateX }] }}> */}
        
      <View style={{height: 100, backgroundColor: 'white', alignContent:'center', alignItems: 'flex-start',marginLeft:20}}>
        <Image  source={require('../assets/profile.png')} style={{height: 75, width: 75, borderRadius: 60}} />
        <Text style={{position:'absolute',left:100,top:25,color:'black',fontSize:18,fontFamily:'Mulish-Black'}}>{state.name}</Text>
        </View>
        <ScrollView>
          {state.role==='manager'? <DrawerItems    
            items={filteredItem} {...rest} 
            getLabel = {(scene) => (
            <View style={{padding:15, borderBottomWidth:1,borderBottomColor:'#e6e1e1',width:'100%', }}>
            <Icon name="keyboard-arrow-right" size={24} style={{position:'absolute',left:225,top:15,color:'#cccaca'}} />
            <Text style={{fontSize:17,color:'black'}}>{rest.getLabel(scene)}</Text>
            </View>
)}

           />  : null }
           {state.role==='executive'? <DrawerItems    
            items={filteredItems} {...rest}
            getLabel = {(scene) => (
              <View style={{padding:15, borderBottomWidth:1,borderBottomColor:'#e6e1e1',width:'100%', }}>
              <Icon name="keyboard-arrow-right" size={24} style={{position:'absolute',left:225,top:15,color:'#cccaca'}} />
              
              <Text style={{fontSize:17,color:'black'}}>{rest.getLabel(scene)}</Text>
              </View>
  )}
           /> : null}

           {state.role==='distributor'? <DrawerItems    
            items={filteredItems1} {...rest}
            getLabel = {(scene) => (
              <View style={{padding:15, borderBottomWidth:1,borderBottomColor:'#e6e1e1',width:'100%', }}>
              <Icon name="keyboard-arrow-right" size={24} style={{position:'absolute',left:225,top:15,color:'#cccaca'}} />
              
              <Text style={{fontSize:17,color:'black'}}>{rest.getLabel(scene)}</Text>
              </View>
  )}
           /> : null}
        <TouchableOpacity style={{width:'100%', alignSelf:'center',height:55,borderBottomColor:'#e6e1e1'}}  onPress={()=>signout()}>
        {/* <Icon name="keyboard-arrow-right" size={24} style={{position:'absolute',right:17,top:15,color:'#cccaca'}} /> */}
        <Icon name="logout" size={24} style={{position:'absolute',left:22,top:15,color:'black'}} />
        
          <Text style={{ marginLeft: 57,padding:15,color:'black',fontSize:17}}>Sign out</Text>
          </TouchableOpacity>
          <View
  style={{borderBottomColor: '#e6e1e1',borderBottomWidth: 1,bottom:5,left:56}}
/>
          
        </ScrollView>
        
      {/* <Text style={{position: 'absolute',padding: 10, bottom: 0,width: '100%',fontSize: 15, flex: 1, marginBottom:10, alignSelf: 'center', fontWeight: 'bold'}} >VAYUZ TECHNOLOGIES<Text style={{fontSize: 13, fontWeight: 'bold', alignSelf: 'center'}}>{' '}{'\u00A9'}2021</Text></Text> */}
      {/* </Animated.View> */}
    </SafeAreaView>
    )
}

export default Drawer

