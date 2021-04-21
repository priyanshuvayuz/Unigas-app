import React, {useState,useEffect,useContext} from 'react'
import {Text,View,StyleSheet,Image,ScrollView,FlatList, Button,TouchableOpacity, StatusBar,Picker,Switch,Alert} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import Iconz from 'react-native-vector-icons/Feather'
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../components/Header'
import Api from '../api/Api'
import {Context as AuthContext} from '../context/AuthContext'
import Spinner from '../components/Spinner'
import moment from "moment";

const ViewUserScreen = ({navigation}) => {
  const {state} = useContext(AuthContext)
  const name = navigation.getParam('name')
  const branches = navigation.getParam('branches')
  const areas = navigation.getParam('areas')
  const beats = navigation.getParam('beats')
  const mobile = navigation.getParam('mobile')
  const status = navigation.getParam('status')
  const id = navigation.getParam('id')
  const item = navigation.getParam('item')
  const [is_active,setIs_active] = useState(status)
  const [loading,setLoading] = useState(false)
  const [curr,setCurr] = useState('')
  const [isEnabled, setIsEnabled] = useState(false);
   const [isDelete,setIsDelete] = useState(false)
  const [d,setDate] = useState("")
  const [a,setA] = useState('')
  const [b,setB] = useState('')
  const [c,setC] = useState('')
  let branch = ''
  let area = ''
  let beat= ''
  let l = 0
  useEffect(()=> {
     if(is_active==='Active'){
         setIsEnabled(true)
     }else{
       setIsEnabled(false)
     }
   },[is_active])

  const check1 = async() => {
    try{
      setLoading(true)
      const ab = is_active === 'Active'? 'InActive': 'Active'
      console.log(is_active)
      const res = await Api.put('users/salesexecutive',{id:id,is_active:ab})
      setLoading(false)
      setIs_active(res.data.result.is_active)
    } catch(e){
      setLoading(false)
      console.log(e)
    }
  }
  const toggle = () => {
    setIsDelete(previousState => !previousState);
  }

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
  useEffect(()=> {
    let a =item.createdAt
    let c = moment(a).calendar(); 
    setDate(c)
  },[])
  useEffect(()=> {

    branches.map((item)=> {
      branch=branch+item.branch+','
    })
    l = branch.length
    setA(branch.substring(0,l-1))
    areas.map((item)=> {
      area=area+item.area+','
    })
    l = area.length
    setB(area.substring(0,l-1))
    beats.map((item)=> {
      beat=beat+item.beat+','
    })
    l = beat.length
    setC(beat.substring(0,l-1))
  })
    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />

        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
          <Header title="" back="Sales" />
          {state.role==='manager'? <Iconz name="edit-2" size={20} style={{color:'#2e3092', position:'absolute', right:25,top:22}} onPress={()=> navigation.navigate('Edit',{item:item})} /> : null}
          
          <View style={{paddingBottom:65}}>
            <ScrollView>
              <Image
              style={styles.image}
              source={require('../assets/profile.png')}
              />
              <View>
              <Text style={{fontSize:25,fontWeight:'bold', alignSelf:'center'}}>{name}</Text>
              <Text></Text>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{mobile}</Text>
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
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{a}</Text>
              <Icon name='git-branch' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{b}</Text>
              <Iconn name='home-group' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{c}</Text>
              <Icon name='stop-circle-outline' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Switch
                    trackColor={{ false: "red", true: "green" }}
                    thumbColor={isEnabled ? "white" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=> check123(isEnabled)}
                   value={isEnabled}
                   style={{bottom:20,position:'absolute',right:20}}
              />
              {/* <Text style={{fontSize:16,fontWeight:'bold', alignSelf:'flex-start', left:35, marginTop:10,color:'#bec2bf'}}>MOBILE NUMBER: {mobile}</Text> */}

              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>Status</Text>

              </View>
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

export default ViewUserScreen
