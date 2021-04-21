import React,{useContext,useState,useEffect} from 'react'
import { View, Text,ActivityIndicator, Button,TouchableOpacity, TextInput,StyleSheet,StatusBar,ScrollView,Image,FlatList,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconss from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/Feather'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Api from '../../api/Api'
import { NavigationEvents } from 'react-navigation'
import {Context as AuthContext} from '../../context/AuthContext'
import Header from '../../components/Header1'
import Spinner from '../../components/Spinner'
import { BottomSheet } from 'react-native-btr';
import DropDownPicker from 'react-native-dropdown-picker'

const OrderApproval = ({navigation}) => {
    const {state} = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [profile,setProfile] = useState('')
    const [search,setSearch] = useState("")
    const [bar,setBar] = useState(false)
    const [del,setDel] = useState(true)
    const [undel,setUndel] = useState(false)
    const [color1,setColor1] = useState('blue')
    const [color2,setColor2] = useState('#ffffff')
    const [loading,setLoading] = useState(false)
    const [visible,setVisible] = useState(false)
    const [status,setStatus] = useState('')
    const role= state.role
    let ginti = 0
    console.log(ginti)
    const listempty = () => {
      return(
        <View style={{marginTop:200}}>
          {!loading?<View><Iconz name='emoticon-sad-outline' size={50} color='black' style={{ fontWeight:'bold', alignSelf:'center'}} />
          <Text style={{textAlign:'center',fontSize:20,color:'black'}}>No items yet...</Text></View> : null}
          
        </View>
      )
    }

    
  
  useEffect(()=> {
    (async()=> {
      try{
        setLoading(true)
        const res = await Api.get('order/order_manager_approval')
        const p = await AsyncStorage.getItem('profile')
        setProfile(p)
        setOrders(res.data.orders)
        setLoading(false)
      } catch(e){
        console.log(e.message)
      }
      
    })
  })
  const ok = async()=> {
    try{
      setLoading(true)
      const res = await Api.get('order/order_manager_approval')
      const p = await AsyncStorage.getItem('profile')
      setProfile(p)
      setOrders(res.data.orders)
      setLoading(false)
    } catch(e){
      console.log(e.message)
    }
  }
  var filterorder = []
  filterorder= orders.filter(e=> {
    return e[role]._id === profile
    
  })
    return (
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={ok} />
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
          <Header title="Order approval" bar={bar} />
          



        <ScrollView>

            
        <FlatList
            
            data = {filterorder}
            keyExtractor = {(result)=> result._id} 
            ListEmptyComponent={listempty}
            renderItem= {({ item })=>{
                return (
                  <View>
                    
                    <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('View',{item:item})}>
                    <View style={styles.card}>
                  {item.order_id === null? <Text style={{fontSize:16, fontWeight:'bold', margin:5, color:'black'}}>Order id: null</Text> : <Text style={{fontSize:16, fontWeight:'bold', margin:1, color:'black'}}>Order id: {item.order_id}</Text>}
                  <Text style={{position:'absolute',fontSize:16, fontWeight:'bold', left:14, top:40, color:'rgb(195,195,195)'}}>{(item.createdAt).substring(0, 10)}</Text>
                  <Text style={{color:'rgb(195,195,195)',position:'absolute',right:10,top:42}}>₹{item.amount}</Text>
                  <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#ff8e72',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Pending</Text>
                  </View>
                  </TouchableOpacity>
                  
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
            {/* <Iconss name="plus" size={30} style={{position:'absolute', bottom:60,right:20,color:'white',backgroundColor:'#98cb48',padding:15,borderRadius:50}} onPress={()=> navigation.navigate('Add')} /> */}
            
        </View>
        
        </>
        
    )
}


const styles = StyleSheet.create({
    card: {
      marginBottom:2,
      height: 75,
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
      padding:10,
      marginTop:20,
      elevation:2
        
    },
    image: {
        height:105,
        width:100,
        backgroundColor:'grey',
        borderRadius:20,
        left:60
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
    container: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0F7FA',
      },
      bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 200,
      },
})

export default OrderApproval


{/* <View style={styles.card}>
                    <TouchableOpacity onPress={()=> navigation.navigate('View',{item:item})}>
                  {item.order_id === null? <Text style={{fontSize:18, fontWeight:'bold', margin:5, color:'black'}}>ORDER ID: null</Text> : <Text style={{fontSize:18, fontWeight:'bold', margin:5, color:'black'}}>ORDER ID: {item.order_id}</Text>}
                  {item.executive.name === null? <Text style={{fontSize:16, fontWeight:'bold', margin:5, color:'rgb(195,195,195)'}}>SALES EXECUTIVE: null</Text> :<Text style={{fontSize:16, fontWeight:'bold', margin:5, color:'rgb(195,195,195)'}}>SALES EXECUTIVE: {item.executive.name}</Text> }
                  {item.distributor.company === null? <Text style={{fontSize:16, fontWeight:'bold', margin:5, color:'rgb(195,195,195)'}}>DISTRIBUTOR COMPANY: null</Text> : <Text style={{fontSize:16, fontWeight:'bold', margin:5, color:'rgb(195,195,195)'}}>DISTRIBUTOR COMPANY: {item.distributor.company}</Text>}
                  {item.customer.company_name === null? <Text numberOfLines={1} style={{fontSize:16, fontWeight:'bold', margin:5, color:'rgb(195,195,195)'}}>CUSTOMER COMPANY: null</Text> : <Text numberOfLines={1} style={{fontSize:16, fontWeight:'bold', margin:5, color:'rgb(195,195,195)'}}>CUSTOMER COMPANY: {item.customer.company_name}</Text> }
                  
                  </TouchableOpacity>
                  <Text style={{position:'absolute', right:120,bottom:1}}>CREDIT</Text>
                  {item.status==="Delivered"? <Text style={{position:'absolute', right:10,bottom:1,color:'green'}}>DELIVERED</Text> : <Text style={{position:'absolute', right:10,bottom:1,color:'red'}}>UNDELIVERED</Text>}
                  </View> */}