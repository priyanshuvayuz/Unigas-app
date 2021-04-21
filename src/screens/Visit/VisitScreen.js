import React,{useContext,useState,useEffect} from 'react'
import { View, Text,ActivityIndicator, Button,TouchableOpacity, TextInput,StyleSheet,StatusBar,ScrollView,Image,FlatList,AsyncStorage } from 'react-native'
import Iconi from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconss from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/Feather'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Api from '../../api/Api'
import { NavigationEvents } from 'react-navigation'
import {Context as AuthContext} from '../../context/AuthContext'
import Header from '../../components/Header1'
import Spinner from '../../components/Spinner'
const VisitScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [profile,setProfile] = useState('')
    const [search,setSearch] = useState("")
    const [bar,setBar] = useState(false)
    const [del,setDel] = useState(true)
    const [undel,setUndel] = useState(false)
    const [color1,setColor1] = useState('blue')
    const [color2,setColor2] = useState('#ffffff')
    const [loading,setLoading] = useState(false)
    
  useEffect(()=> {
    (async()=> {
      try{
        setLoading(true)
        const res = await Api.get('visits/getvisit')
        setOrders(res.data.result)
        setLoading(false)
      } catch(e){
        console.log(e.message)
      }
      
    })
  })
  const ok = async()=> {
    try{
      setLoading(true)
      const res = await Api.get('visits/getvisit')
      setOrders(res.data.result)
      setLoading(false)
    } catch(e){
      console.log(e.message)
    }
  }
    return (
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={ok}  />
        <View style={{flex:1,backgroundColor:'#f7f7f7'}}>
          <Header title="Visit" bar={bar} />
          {/* <Icon name="add-circle-outline" size={24} style={{position:'absolute', top:1,right:20}} onPress={()=> navigation.navigate('Add')} /> */}
        
        {bar?  <TextInput
        value={search}
        onChangeText = {(text)=> setSearch(text)}
        style={styles.search}
        placeholder=" Search inventory..."
        /> : null}
        <Icons name='filter' size={24} style={{position:'absolute', top:25,right:20,color:'white'}} />
          {bar? <Iconss name='close' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> : 
          <Icons name='search' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> }

{/* <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:20 }}>{item.customer.customer_name}</Text>
                   
                    <Iconi name='md-location-outline' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:45}} />
                    <Iconi name='people-outline' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:65}} />
                    <Text numberOfLines={1}  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:42,color:'rgb(195,195,195)' }}>{item.location}</Text>
                    <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:62,color:'rgb(195,195,195)' }}>{item.assigned_to}</Text>
                    {item.status==="Active"? <Text style={{position:'absolute', fontSize:16, fontWeight:'bold', left:120, top:85, color:'green'}}>Active</Text>:<Text style={{position:'absolute', fontSize:16, fontWeight:'bold', left:120, top:85, color:'red'}}>Pending</Text>} */}


        
<ScrollView>
        <FlatList
            
            data = {orders}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                    <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                    <Image
                    style={styles.image}
                    source={require('../../assets/profile.png')}
                    />
                {/* <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.gstin}</Text> */}
                <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.customer.customer_name}</Text>
                <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.location}</Text>
                <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.assigned_to}</Text>
                {item.status==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Pending</Text>}
                    
                </View>
                </View>
                )
                }}
            />
        
            </ScrollView>
        
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
        marginBottom:2,
        height: 190,
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
      height:75,
        width:75,
        borderRadius:50,
        left:20,
        alignSelf:'center'
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
    }
})

export default VisitScreen

