import React,{useContext,useState,useEffect} from 'react'
import { View, Text,ActivityIndicator, Button,RefreshControl,TouchableOpacity, TextInput,StyleSheet,StatusBar,ScrollView,Image,FlatList,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconss from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/Feather'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Api from '../../api/Api'
import { NavigationEvents } from 'react-navigation'
import {Context as AuthContext} from '../../context/AuthContext'
import Header from '../../components/Header1'
import Spinner from '../../components/Spinner'
import { List , DefaultTheme} from 'react-native-paper';
import { BottomSheet } from 'react-native-btr';
import DropDownPicker from 'react-native-dropdown-picker'
import CustomText from '../../components/CustomText'
import moment from "moment";
// import ShowInventory from './ShowInventory'
const InventoryScreen = ({navigation}) => {
  const [status,setStatus] = useState('')
  const [sales, setSales] = useState([])
    const {state,signout} = useContext(AuthContext)
    const [visible,setVisible] = useState(false)
    const [arrow,setArrow] = useState(false)
    const [newf,setNewf] = useState(null)
    const [orders, setOrders] = useState([])
    const [profile,setProfile] = useState('')
    const [search,setSearch] = useState("")
    const [bar,setBar] = useState(false)
    const [del,setDel] = useState(true)
    const [undel,setUndel] = useState(false)
    const [color1,setColor1] = useState([])
    const [color2,setColor2] = useState('#ffffff')
    const [loading,setLoading] = useState(false)
    const [expanded, setExpanded] = React.useState(false);
    const [expanded1, setExpanded1] = React.useState(false);
    const [searchResults, setSearchResults] = useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [d,setDate]= useState("")
    let dated = ''
  const handlePress = () => setExpanded(!expanded);
  const handlePress1 = () => setExpanded1(!expanded1);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (newf) {
      ok()
    }
    else{
      setRefreshing(false)
    }
  }, [refreshing]);


  const listempty = () => {
    return(
      <View style={{marginTop:200}}>
        {!loading?<View><Iconz name='emoticon-sad-outline' size={50} color='black' style={{ fontWeight:'bold', alignSelf:'center'}} />
        <Text style={{textAlign:'center',fontSize:20,color:'black'}}>No result...</Text></View> : null}
        
      </View>
    )
  }


  const reset = () => {
    setStatus('')
    setNewf(null)
  }
  const apply = () => {
    if(status){
      
      const results = orders.filter(person =>{
        return person.cylinder_type.cylinder_name === status
     }
    )
    setNewf(results)
    }else{
      setNewf(null)
    }
  }
  
  useEffect(() => {
    const results = orders.filter(person =>{
       return person.cylinder_type.cylinder_name.toLowerCase().includes(search.toLowerCase())
    }
      
    );
    setSearchResults(results);
  }, [search]);

  useEffect(()=> {
    (async()=> {
      try{
        setLoading(true)
        const res = await Api.get('inventory')
        setOrders(res.data.inventory)
        setLoading(false)
      } catch(e){
        console.log(e.message)
      }
      
    })
  })
  const ok = async()=> {
    setStatus('')
    setNewf(null)
    try{
      setLoading(true)
      const role = await AsyncStorage.getItem('role')
      const res = await Api.get('inventory')
      setOrders(res.data.inventory)
      setColor1(res.data.inventory)
      setRefreshing(false)
      console.log(role)
      setLoading(false)
    } catch(e){
      console.log(e.message)
    }
  }
    return (
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={ok} />
        <View style={{flex:1,backgroundColor:'#f7f7f7',paddingBottom:60}}>
          <Header title="Inventory" bar={bar} />
          
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
                            {label: 'Commercial', value: 'Commercial 33Kg' },
                            {label: 'Residential', value: 'Residential 22kg'},
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
        placeholder=" Search inventory..."
        /> : null}
        <Icons name='filter' size={24} style={{position:'absolute', top:25,right:20,color:'white'}} onPress={()=> setVisible(!visible)} />
          {bar? <Iconss name='close' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> : 
          <Icons name='search' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> }
        {/* {!newf?   : <View> </View>} */}
        {newf? <Iconz name='checkbox-blank-circle' size={10} style={{position:'absolute', top:24,right:19,color:'red'}} /> : null}
        <View>
          {newf? <View style={{paddingBottom:60}}><FlatList
            data = {newf}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20}}>
                    <ScrollView>
                    {dated!==(moment(item.createdAt).format('LL'))? <View>
                       <Text style={{color:'black',fontFamily:'Mulish-SemiBold',fontSize:17}}>{moment(item.createdAt).format('LL').toUpperCase() }</Text>
                      <Text style={{height:0}}>{dated=moment(item.createdAt).format('LL')}</Text>
                       </View> : null}
                     <List.Section>
      <List.Accordion
      style={{backgroundColor:'white'}}
        title={item.cylinder_type.cylinder_name}
        titleStyle={{position:'absolute',fontFamily:'Mulish-Black'}}
        theme={{colors: {
          primary: 'black',
          accent: 'black',
        }}}
        >
          <View style={{backgroundColor:'white',height:250}}>
            
          <View>
          
            <Text style={{marginLeft:20,marginTop:5,fontFamily:'Mulish-Black'}}>Filled Stock</Text>
              <View>
              <Text style={{position:'absolute',left:20,top:5,fontFamily:'Mulish-Regular'}}>Opening- </Text>
              <Text style={{position:'absolute',top:1,left:90,fontSize:18}}> {item.filledOpeningStock}</Text>
              </View>
              <View>
              <Text style={{position:'absolute',left:20,top:33,fontFamily:'Mulish-Regular'}}>Available-</Text>
              <Text style={{position:'absolute', left:92,top:30,fontSize:18}}> {item.filledAvailableStock}</Text>
              </View>
              <View>
              <Text style={{position:'absolute',left:20,top:60,fontFamily:'Mulish-Regular'}}>Closing- </Text>
              <Text style={{position:'absolute', left:92,top:57,fontSize:18}}> {item.filledClosingStock}</Text>
              </View>
          </View>
          <View style={{marginTop:95}}>
          <View style={{borderBottomColor:'#f3f3f3'}}>
          <Text style={{marginLeft:20,fontFamily:'Mulish-Black'}}>Empty Stock</Text>
          <View>
          <Text style={{position:'absolute',left:20,top:5,fontFamily:'Mulish-Regular'}}>Opening- </Text>
          <Text style={{position:'absolute',top:1,left:90,fontSize:18}}> {item.emptyOpeningStock}</Text>
          </View>
          <View>
          <Text style={{position:'absolute',left:20,top:33,fontFamily:'Mulish-Regular'}}>Available-</Text>
          <Text style={{position:'absolute', left:92,top:30,fontSize:18}}> {item.emptyAvailableStock}</Text>
          </View>
          <View>
          <Text style={{position:'absolute',left:20,top:60,fontFamily:'Mulish-Regular'}}>Closing- </Text>
          <Text style={{position:'absolute', left:92,top:57,fontSize:18}}> {item.emptyClosingStock}</Text>
          </View>
        </View>
          </View>
        
        </View>
      </List.Accordion>
      </List.Section>
      </ScrollView>
                  </View>
                  
                )
                }}
            /></View> : <View  style={{paddingBottom:60}}>{!search?<FlatList
            data = {orders}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20}}>
                    <ScrollView>
                      {dated!==(moment(item.createdAt).format('LL'))? <View>
                       <Text style={{color:'black',fontFamily:'Mulish-SemiBold',fontSize:17}}>{moment(item.createdAt).format('LL').toUpperCase() }</Text>
                      <Text style={{height:0}}>{dated=moment(item.createdAt).format('LL')}</Text>
                       </View> : null}
                    
                     <List.Section>
      <List.Accordion
      style={{backgroundColor:'white'}}
        title={item.cylinder_type.cylinder_name}
        titleStyle={{position:'absolute',fontFamily:'Mulish-Black'}}
        theme={{colors: {
          primary: 'black',
          accent: 'black',
        }}}
        >
          <View style={{backgroundColor:'white',height:250}}>
          <View>
          
            <Text style={{marginLeft:20,marginTop:5,fontFamily:'Mulish-Black'}}>Filled Stock</Text>
              <View>
              <Text style={{position:'absolute',left:20,top:5,fontFamily:'Mulish-Regular'}}>Opening- </Text>
              <Text style={{position:'absolute',top:1,left:90,fontSize:18}}> {item.filledOpeningStock}</Text>
              </View>
              <View>
              <Text style={{position:'absolute',left:20,top:33,fontFamily:'Mulish-Regular'}}>Available-</Text>
              <Text style={{position:'absolute', left:92,top:30,fontSize:18}}> {item.filledAvailableStock}</Text>
              </View>
              <View>
              <Text style={{position:'absolute',left:20,top:60,fontFamily:'Mulish-Regular'}}>Closing- </Text>
              <Text style={{position:'absolute', left:92,top:57,fontSize:18}}> {item.filledClosingStock}</Text>
              </View>
          </View>
          <View style={{marginTop:95}}>
          <View style={{borderBottomColor:'#f3f3f3'}}>
          <Text style={{marginLeft:20,fontFamily:'Mulish-Black'}}>Empty Stock</Text>
          <View>
          <Text style={{position:'absolute',left:20,top:5,fontFamily:'Mulish-Regular'}}>Opening- </Text>
          <Text style={{position:'absolute',top:1,left:90,fontSize:18}}> {item.emptyOpeningStock}</Text>
          </View>
          <View>
          <Text style={{position:'absolute',left:20,top:33,fontFamily:'Mulish-Regular'}}>Available-</Text>
          <Text style={{position:'absolute', left:92,top:30,fontSize:18}}> {item.emptyAvailableStock}</Text>
          </View>
          <View>
          <Text style={{position:'absolute',left:20,top:60,fontFamily:'Mulish-Regular'}}>Closing- </Text>
          <Text style={{position:'absolute', left:92,top:57,fontSize:18}}> {item.emptyClosingStock}</Text>
          </View>
        </View>
          </View>
        
        </View>
      </List.Accordion>
      </List.Section>
      </ScrollView>
                  </View>
                  
                )
                }}
            /> : <FlatList
            data = {searchResults}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20}}>
                    <ScrollView>
                    {dated!==(moment(item.createdAt).format('LL'))? <View>
                       <Text style={{color:'black',fontFamily:'Mulish-SemiBold',fontSize:17}}>{moment(item.createdAt).format('LL').toUpperCase() }</Text>
                      <Text style={{height:0}}>{dated=moment(item.createdAt).format('LL')}</Text>
                       </View> : null}
                     <List.Section>
      <List.Accordion
      style={{backgroundColor:'white'}}
        title={item.cylinder_type.cylinder_name}
        titleStyle={{position:'absolute',fontFamily:'Mulish-Black'}}
        theme={{colors: {
          primary: 'black',
          accent: 'black',
        }}}
        >
          <View style={{backgroundColor:'white',height:230}}>
          <View>
          {/* <Text style={{color:'black',left:20}}>{moment(item.createdAt).format('LL') }</Text> */}
            <Text style={{marginLeft:20,marginTop:5,fontFamily:'Mulish-Black'}}>Filled Stock</Text>
              <View>
              <Text style={{position:'absolute',left:20,top:5,fontFamily:'Mulish-Regular'}}>Opening- </Text>
              <Text style={{position:'absolute',top:1,left:90,fontSize:18}}> {item.filledOpeningStock}</Text>
              </View>
              <View>
              <Text style={{position:'absolute',left:20,top:33,fontFamily:'Mulish-Regular'}}>Available-</Text>
              <Text style={{position:'absolute', left:92,top:30,fontSize:18}}> {item.filledAvailableStock}</Text>
              </View>
              <View>
              <Text style={{position:'absolute',left:20,top:60,fontFamily:'Mulish-Regular'}}>Closing- </Text>
              <Text style={{position:'absolute', left:92,top:57,fontSize:18}}> {item.filledClosingStock}</Text>
              </View>
          </View>
          <View style={{marginTop:95}}>
          <View style={{borderBottomColor:'#f3f3f3'}}>
          <Text style={{marginLeft:20,fontFamily:'Mulish-Black'}}>Empty Stock</Text>
          <View>
          <Text style={{position:'absolute',left:20,top:5,fontFamily:'Mulish-Regular'}}>Opening- </Text>
          <Text style={{position:'absolute',top:1,left:90,fontSize:18}}> {item.emptyOpeningStock}</Text>
          </View>
          <View>
          <Text style={{position:'absolute',left:20,top:33,fontFamily:'Mulish-Regular'}}>Available-</Text>
          <Text style={{position:'absolute', left:92,top:30,fontSize:18}}> {item.emptyAvailableStock}</Text>
          </View>
          <View>
          <Text style={{position:'absolute',left:20,top:60,fontFamily:'Mulish-Regular'}}>Closing- </Text>
          <Text style={{position:'absolute', left:92,top:57,fontSize:18}}> {item.emptyClosingStock}</Text>
          </View>
        </View>
          </View>
        
        </View>
      </List.Accordion>
      </List.Section>
      </ScrollView>
                  </View>
                  
                )
                }}
            />}</View>}
          
        </View>
        
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
    type: {
      fontFamily:'Mulish-Black'
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
      height: 250,
    },
})

export default InventoryScreen
