import React,{useContext,useState,useEffect} from 'react'
import { View, Text, Button,TouchableOpacity, TextInput,StyleSheet,StatusBar,ScrollView,Image,FlatList,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/Feather'
import Iconss from 'react-native-vector-icons/AntDesign'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Api from '../../api/Api'
import { NavigationEvents } from 'react-navigation'
import {Context as AuthContext} from '../../context/AuthContext'
import Header from '../../components/Header1'
import Spinner from '../../components/Spinner'
import moment from 'moment';
import { BottomSheet } from 'react-native-btr';
import DropDownPicker from 'react-native-dropdown-picker'

const OrderScreen = ({navigation}) => {
    const {state} = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [profile,setProfile] = useState('')
    const [del,setDel] = useState(true)
    const [undel,setUndel] = useState(false)
    const [color1,setColor1] = useState('blue')
    const [color2,setColor2] = useState('#ffffff')
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState("")
    const [bar,setBar] = useState(false)
    const [visible,setVisible] = useState(false)
    const [status,setStatus] = useState('')
    const role=state.role
    const [newf,setNewf] = useState(null)
    const [searchResults,setSearchResults] = useState([])
    const [forders,setForders] = useState([])
    let dated = ""
    const listempty = () => {
      return(
        <View style={{marginTop:200}}>
          {!loading?<View><Iconz name='emoticon-sad-outline' size={50} color='black' style={{ fontWeight:'bold', alignSelf:'center'}} />
          <Text style={{textAlign:'center',fontSize:20,color:'black'}}>No items yet...</Text></View> : null}
          
        </View>
      )
    }
    const reset = () => {
      setNewf(null)
      setStatus('')
    }
    const apply = () => {
      if(status){
        const results = filterorder.filter(person =>{
          return person.status === status
       }
      )
      setNewf(results)
      }else{
        setNewf(null)
      }
    }


    useEffect(() => {
      const results = filterorder.filter(person =>{
         return person.order_id.toLowerCase().includes(search.toLowerCase())
      }
        
      );
      setSearchResults(results);
    }, [search]);

   
    // useEffect(()=> {
    //   const results = orders.filter(person =>{
    //     console.log("manager id => ",person[state.role]._id," Profile ", profile)
    //     return person[state.role]._id === profile
    //  }
    // )
    // // setForders(results)
    // setOrders(results)
    // },[orders])
    const newfilter = () => {
      const results = filterorder.filter(person =>{
        console.log("manager id => ",person[state.role]._id," Profile ", profile)
        return person[state.role]._id === profile
     }
    )
    setForders(results)
    }
  useEffect(()=> {
    (async()=> {
      try{
        setLoading(true)
        const res = await Api.get('order/all_orders')
        const p = await AsyncStorage.getItem('profile')
        setProfile(p)
        setOrders(res.data.orders)
        newfilter()
        setLoading(false)
      } catch(e){
        setLoading(false)
        console.log(e.message)
      }
      
    })
  })
  const ok = async()=> {
    setStatus('')
    setNewf(null)
    try{
      setLoading(true)
      const res = await Api.get('order/all_orders')
      const p = await AsyncStorage.getItem('profile')
      setProfile(p)
      setOrders(res.data.orders)
      // newfilter()
      setLoading(false)
    } catch(e){
      setLoading(false)
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
        <View style={{flex:1,backgroundColor:'#f7f7f7',paddingBottom:60}}>
          <Header title="Orders" bar={bar} />
          <BottomSheet visible={visible} >
                <View style={styles.bottomNavigationView}>
                  <View style={{}}>
                  <Text style={{position:'absolute',top:10,marginLeft:10,padding:10,borderBottomColor:'#f3f3f3', borderBottomWidth:1,width:'100%',fontSize:20}}>Filter</Text>
                  <TouchableOpacity style={{position:'absolute',right:10,top:20}} ><Iconss name="close" size={20} style={{color:'black'}} onPress={()=> setVisible(!visible)} /></TouchableOpacity>
                    </View>
                    <Text style={{textAlign:'left',fontSize:14,marginTop:85,marginLeft:20}}>Status</Text>
                    <DropDownPicker
                        items={[
                           {label: 'none', value: ''},
                            {label: 'Delivered', value: 'Delivered' },
                            {label: 'Pending', value: 'Undelivered'},
                        ]}
                        placeholder='Select status'
                        // defaultValue='Hello' Select Status
                        containerStyle={{height: 40,width:'90%',alignSelf:'center',left:5}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setStatus(item.value)}
                    />
                    <TouchableOpacity style={{position:'absolute',alignSelf:'center', backgroundColor:'#2e3092', bottom:0,right:0,width:'50%',borderRadius:0,borderWidth:1,borderColor:'#2e3092'}} onPress={()=> apply()}><Text style={{padding:10,paddingBottom:15,paddingTop:15, alignSelf:'center', fontSize:16,color:'white'}}>Apply</Text></TouchableOpacity>
                    <TouchableOpacity style={{position:'absolute',alignSelf:'center', backgroundColor:'white', bottom:0,left:0,width:'50%',borderRadius:0,borderColor:'#f3f3f3',borderWidth:1}} onPress={()=> reset()}><Text style={{padding:10,paddingBottom:15,paddingTop:15, alignSelf:'center', fontSize:16,color:'#333'}}>Reset</Text></TouchableOpacity>
                    
                    </View>
            </BottomSheet>
            
          {bar?  <TextInput
        value={search}
        onChangeText = {(text)=> setSearch(text)}
        style={styles.search}
        placeholder=" Search by order id..."
        /> : null}
        <Icons name='filter' size={24} style={{position:'absolute', top:25,right:20,color:'white'}} onPress={()=> setVisible(!visible)} />
          {bar? <Iconss name='close' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> : 
          <Icons name='search' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> }
        {newf? <Iconz name='checkbox-blank-circle' size={10} style={{position:'absolute', top:24,right:19,color:'red'}} /> : null}
       
        <ScrollView>
          {!newf? <View>{!search? <FlatList
            data = {filterorder}
            keyExtractor = {(result)=> result._id} 
            ListEmptyComponent={listempty}
            renderItem= {({ item })=>{
                return (
                  
                  <View>
                    
                    <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('View',{item:item})}>
                    {dated!==(moment(item.createdAt).format('LL'))? <View>
                       <Text style={{color:'black',paddingLeft:20,marginTop:5,fontFamily:'Mulish-SemiBold',fontSize:17}}>{moment(item.createdAt).format('LL').toUpperCase() }</Text>
                      <Text style={{height:0}}>{dated=moment(item.createdAt).format('LL')}</Text>
                       </View> : null}
                    <View style={styles.card}>
                  {item.order_id === null? <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:5, color:'black'}}>Order id: null</Text> : <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:1, color:'black'}}>#{item.order_id}</Text>}
                  <Text style={{position:'absolute',fontSize:16, fontFamily:'Mulish-Regular', left:14, top:40, color:'rgb(195,195,195)'}}>₹{item.amount}</Text>
                  {/* <Text style={{color:'rgb(195,195,195)',position:'absolute',right:10,top:42}}></Text> */}
                  {item.status==="Delivered"? <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#89f594',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Delivered</Text> : <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#ff8e72',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Pending</Text>}
                  </View>
                  </TouchableOpacity>
                  
                  </View>
                )
                }}
            />  : <FlatList
            data = {searchResults}
            keyExtractor = {(result)=> result._id} 
            ListEmptyComponent={listempty}
            renderItem= {({ item })=>{
                return (
                  
                  <View>
                    
                    <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('View',{item:item})}>
                    {dated!==(moment(item.createdAt).format('LL'))? <View>
                       <Text style={{color:'black',paddingLeft:20,marginTop:5,fontFamily:'Mulish-SemiBold',fontSize:17}}>{moment(item.createdAt).format('LL').toUpperCase() }</Text>
                      <Text style={{height:0}}>{dated=moment(item.createdAt).format('LL')}</Text>
                       </View> : null}
                    <View style={styles.card}>
                  {item.order_id === null? <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:5, color:'black'}}>Order id: null</Text> : <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:1, color:'black'}}>#{item.order_id}</Text>}
                  <Text style={{position:'absolute',fontSize:16, fontFamily:'Mulish-Regular', left:14, top:40, color:'rgb(195,195,195)'}}>₹{item.amount}</Text>
                  {/* <Text style={{color:'rgb(195,195,195)',position:'absolute',right:10,top:42}}>₹{item.amount}</Text> */}
                  {item.status==="Delivered"? <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#89f594',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Delivered</Text> : <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#ff8e72',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Pending</Text>}
                  </View>
                  </TouchableOpacity>
                  
                  </View>
                )
                }}
            /> }</View> : <View>
              {!search? <FlatList
            data = {newf}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  
                  <View>
                    
                    <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('View',{item:item})}>
                    {dated!==(moment(item.createdAt).format('LL'))? <View>
                       <Text style={{color:'black',paddingLeft:20,marginTop:5,fontFamily:'Mulish-SemiBold',fontSize:17}}>{moment(item.createdAt).format('LL').toUpperCase() }</Text>
                      <Text style={{height:0}}>{dated=moment(item.createdAt).format('LL')}</Text>
                       </View> : null}
                    <View style={styles.card}>
                  {item.order_id === null? <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:5, color:'black'}}>Order id: null</Text> : <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:1, color:'black'}}>#{item.order_id}</Text>}
                  <Text style={{position:'absolute',fontSize:16, fontFamily:'Mulish-Regular', left:14, top:40, color:'rgb(195,195,195)'}}>₹{item.amount}</Text>
                  {/* <Text style={{color:'rgb(195,195,195)',position:'absolute',right:10,top:42}}>₹{item.amount}</Text> */}
                  {item.status==="Delivered"? <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#89f594',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Delivered</Text> : <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#ff8e72',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Pending</Text>}
                  </View>
                  </TouchableOpacity>
                  
                  </View>
                )
                }}
            />  : <FlatList
            data = {searchResults}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  
                  <View>
                    
                    <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('View',{item:item})}>
                    {dated!==(moment(item.createdAt).format('LL'))? <View>
                       <Text style={{color:'black',paddingLeft:20,marginTop:5,fontFamily:'Mulish-SemiBold',fontSize:17}}>{moment(item.createdAt).format('LL').toUpperCase() }</Text>
                      <Text style={{height:0}}>{dated=moment(item.createdAt).format('LL')}</Text>
                       </View> : null}
                    <View style={styles.card}>
                  {item.order_id === null? <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:5, color:'black'}}>Order id: null</Text> : <Text style={{fontSize:18, fontFamily:'Mulish-Black', margin:1, color:'black'}}>#{item.order_id}</Text>}
                  <Text style={{position:'absolute',fontSize:16, fontFamily:'Mulish-Regular', left:14, top:40, color:'rgb(195,195,195)'}}>₹{item.amount}</Text>
                  {/* <Text style={{color:'rgb(195,195,195)',position:'absolute',fontFamily:'Mulish-Regular',right:10,top:42}}></Text> */}
                  {item.status==="Delivered"? <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#89f594',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Delivered</Text> : <Text style={{position:'absolute', right:10,top:10,color:'#333',backgroundColor:'#ff8e72',borderRadius:5,fontSize:12,padding:5,paddingLeft:15,paddingRight:15}}>Pending</Text>}
                  </View>
                  </TouchableOpacity>
                  
                  </View>
                )
                }}
            /> }
            </View> }
          
          
            
        
            </ScrollView>
        
            {loading? <View style={{marginTop:250,position:'absolute', alignSelf:'center'}}>
              <Text>
               <Spinner />
               </Text>
            </View>: null}
            {state.role==='manager'? <Iconss name="plus" size={30} style={{position:'absolute', bottom:60,right:20,color:'white',backgroundColor:'#98cb48',padding:15,borderRadius:50}} onPress={()=> navigation.navigate('Add')} />  : null}
            {state.role==='executive'? <Iconss name="plus" size={30} style={{position:'absolute', bottom:60,right:20,color:'white',backgroundColor:'#98cb48',padding:15,borderRadius:50}} onPress={()=> navigation.navigate('Add1')} /> : null}
            {state.role==='distributor'? <Iconss name="plus" size={30} style={{position:'absolute', bottom:60,right:20,color:'white',backgroundColor:'#98cb48',padding:15,borderRadius:50}} onPress={()=> navigation.navigate('Add2')} /> : null}
            
            
            
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
        marginTop:5,
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
      height: 300,
    },

})

export default OrderScreen
