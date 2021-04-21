import React, {useState,useEffect,useContext} from 'react'
import {Text,View,StyleSheet,Image,ScrollView,FlatList, Button,TouchableOpacity, StatusBar,Picker,Alert,Switch} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import Iconz from 'react-native-vector-icons/Feather'
import Iconn from 'react-native-vector-icons/FontAwesome'
import Iconnn from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header'
import Api from '../../api/Api'
import Spinner from '../../components/Spinner'
import {Context as AuthContext} from '../../context/AuthContext'
import moment from "moment";

const ViewCustScreen = ({navigation}) => {
//   const name = navigation.getParam('name')
const {state} = useContext(AuthContext)
const [loading,setLoading] = useState(false)
const [isEnabled, setIsEnabled] = useState(false);
  const item = navigation.getParam('item')
  const [isactive,setIsactive] = useState(item.isactive)
const role = state.role
const [d,setDate] = useState("")


useEffect(()=> {
  let a =item.createdAt
  let c = moment(a).calendar(); 
  setDate(c)
},[])


useEffect(()=> {
  if(isactive==='Active'){
      setIsEnabled(true)
  }else{
    setIsEnabled(false)
  }
},[isactive])
const check123=(user) => {
  let a = ''
  if(user){
     a='deactivated'
  }else{
    a='activated'
  }
  Alert.alert(
    "Change Active Status",
    `User will be ${a}`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => check1() }
    ]
  );
}
  const check1 = async() => {
    try{
      setLoading(true)
      const ab = isactive === 'Active'? 'InActive': 'Active'
      const res = await Api.put('users/customer',{id:item._id,isactive:ab})
      setLoading(false)
      setIsactive(res.data.result.isactive)
    } catch(e){
      setLoading(false)
      console.log(e)
    }
  }

    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)',paddingBottom:10}}>
          <Header title="VIEW CUSTOMER" back="Cust" />
          {state.role==='manager'? <Iconz name="edit-2" size={20} style={{color:'#2e3092', position:'absolute', right:25,top:22}} onPress={()=> navigation.navigate('Edit',{item:item})} /> : null}
          
          <View style={{paddingBottom:60}}>
            <ScrollView>
            <Image
              style={styles.image}
              source={require('../../assets/profile.png')}
              />
              <View>
              <Text style={{fontSize:25,fontWeight:'bold', alignSelf:'center'}}>{item.customer_name}</Text>
              <Text></Text>
             
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.customer_contact}</Text>
              <Icons name='call' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{d}</Text>
              <Icons name='date-range' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>NOIDA</Text>
              <Icon name='md-location-outline' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.company_name}</Text>
              <Iconn name='building-o' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.company_contact}</Text>
              <Icons name='contact-page' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.branch.branch}</Text>
              <Icon name='git-branch'  style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.area.area}</Text>
              <Iconnn name='home-group' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.beat.beat}</Text>
              <Icon name='stop-circle-outline' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              {state.role==='manager'?  <View style={styles.card1}>
              <Switch
                    trackColor={{ false: "red", true: "green" }}
                    thumbColor={isEnabled ? "white" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>check123(isEnabled)}
                   value={isEnabled}
                   style={{bottom:20,position:'absolute',right:20}}
              />
              {/* <Text style={{fontSize:16,fontWeight:'bold', alignSelf:'flex-start', left:35, marginTop:10,color:'#bec2bf'}}>MOBILE NUMBER: {mobile}</Text> */}
              
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>Status</Text>
              
              </View> : null}
              
              
              </View>
              
              </ScrollView>
              
          </View>
          
              
              {loading? <View style={{marginTop:250,position:'absolute', alignSelf:'center'}}>
              <Text>
               <Spinner />
               </Text>
            </View>: null}
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
      fontSize:14,
      marginBottom:20,
      borderBottomWidth:1,
      color:'black',
    },
    text1: {
      fontSize:14,
      color:'rgb(213,213,213)',
      marginBottom:3,
      fontWeight:'bold',
      fontFamily:'Helvetica Neue'
    },
    button: {
      position:'absolute',
      left:20,
      height:60,
      borderRadius:20,
      width:'40%',
      backgroundColor:'rgb(255,204,102)',
      bottom:20
  },
  button1: {
    position:'absolute',
    alignSelf:'center',
    right:20,
    height:60,
    borderRadius:20,
    width:'40%',
    backgroundColor:'rgb(255,204,102)',
    bottom:20
},
  buttonText: {
      fontSize:17,
      alignSelf:'center',
      padding:16,
      color:'black',
      fontWeight:'bold'
  },
  card1:{
    width:'100%',
    padding:10,
    borderTopWidth:3,
    borderTopColor:'white'
    }
})

export default ViewCustScreen
