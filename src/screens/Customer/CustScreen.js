import React,{useEffect,useContext,useState} from 'react'
import {  View, Text, Button,TouchableOpacity, TextInput,StyleSheet,StatusBar,ScrollView,Image,FlatList,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/Feather'
import Iconss from 'react-native-vector-icons/AntDesign'
import Api from '../../api/Api'
import { NavigationEvents } from 'react-navigation';
import {Context as AuthContext} from '../../context/AuthContext'
import Header from '../../components/Header1'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from '../../components/Spinner'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { BottomSheet } from 'react-native-btr';
import DropDownPicker from 'react-native-dropdown-picker'
import MultiSelect from 'react-native-multiple-select';
import Noresult from '../../components/NoResults'
const CustScreen = ({navigation}) => {
    const {state} = useContext(AuthContext)
    const [search,setSearch] = useState("")
  const [searchResults, setSearchResults] = useState(null)
    const [orders, setOrders] = useState([])
    const [profile,setProfile] = useState('')
    const [loading,setLoading] = useState(false)
    const [bar,setBar] = useState(false)
    const [arnab,setArnab] = useState(true)
    const [visible,setVisible] = useState(false)
    const [newf,setNewf] = useState(null)
    const [status,setStatus] = useState('')
    const [branch,setBranch] = useState([])
    const [select2,setSelect2] = useState('')
    const [muck,setMuck] = useState(null)
    const [final,setFinal] = useState({})
    const role= state.role
    const [ginti,setGinti] = useState(0)
    var sub = 0
    const banti = async() => {
      orders.map((item)=> {
        
        if(item[role]._id===profile){
          sub++
          setGinti(sub)
        }
      })
    }
    useEffect(() => {
      
        banti()
    })


    useEffect(()=> {
      setFinal({...newf,...muck})
    },[newf,muck])

    const reset = () => {
      setNewf(null)
      setStatus('')
      setSelect2('')
    }
    const apply = () => {
      if(status){
        const results = orders.filter(person =>{
          return person.isactive === status
       }
      )
      setNewf(results)
      }else{
        setNewf(null)
      }
      if(!status && select2){
        const res = orders.filter(person =>{
          return person.branch._id === select2[0]
       }
      )
      setNewf(res)
      }
      // if(newf && muck){
      //   const map1 = new Map([...newf,...muck])
      //   setNewf(map1.get(1))
      // }
      
    }
    
    const onSelectedItemsChange2 = (selectedItems) => {
      setSelect2(selectedItems);
    }

    const listempty = () => {
      return(
        <View>
          <Iconz name='emoticon-sad-outline' size={50} color='black' style={{ fontWeight:'bold', alignSelf:'center'}} />
          <Text style={{textAlign:'center',fontSize:20,color:'black'}}>No result!!</Text>
        </View>
      )
    }
    
    const mack = async() => {
      try{
        setLoading(true)
        const res = await Api.get('master/branch')
        // const r = await AsyncStorage.getItem('profile')
        console.log('working')
        setBranch(res.data.result)
        setLoading(false)
      } catch(e){
        console.log(e.message)
      }
    }
  useEffect(()=> {
    (async()=> {
      try{
        setLoading(true)
        const res = await Api.get('users/customer')
        const r = await AsyncStorage.getItem('profile')
        setOrders(res.data.result)
        setProfile(r)
        setLoading(false)
      } catch(e){
        console.log(e.message)
      }
      
    })
  })
  useEffect(() => {
    const results = orders.filter(person =>{
       return person.customer_name.toLowerCase().includes(search.toLowerCase())
    }
      
    );
    setSearchResults(results);
  }, [search]);
  const ok = async()=> {
    setStatus('')
    setSelect2('')
    setNewf(null)
    try{
      // setOrders([])
      setStatus('')
      setLoading(true)
      const res = await Api.get('users/customer')
      const r = await AsyncStorage.getItem('profile')
      setOrders(res.data.result)
      setProfile(r)
      setLoading(false)
      setArnab(false)
    } catch(e){
      console.log(e.message)
    }
  }
  const book = () => {
    setVisible(!visible)
    mack()
  }
  if(!orders){
    <Noresult />
  }
    return (
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={ok} />
        <View style={{flex:1,backgroundColor:'#f7f7f7'}}> 
          <Header title="Customer" bar={bar} />

          <BottomSheet visible={visible} >
                <View style={styles.bottomNavigationView}>
                <View style={{}}>
                  <Text style={{position:'absolute',top:10,marginLeft:10,padding:10,borderBottomColor:'#f3f3f3', borderBottomWidth:1,width:'100%',fontSize:20}}>Filter</Text>
                  <TouchableOpacity style={{position:'absolute',right:10,top:20}} ><Iconss name="close" size={20} style={{color:'black'}} onPress={()=> setVisible(!visible)} /></TouchableOpacity>
                    </View>
                    <Text style={{textAlign:'left',fontSize:14,marginTop:85,marginLeft:25}}>Status</Text>
                    <DropDownPicker
                        items={[
                           {label: 'none', value: ''},
                            {label: 'Active', value: 'Active' },
                            {label: 'InActive', value: 'InActive'},
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
                    <ScrollView>
                    <View style={{marginTop:50, width:'90%', alignSelf:'center',left:8}}>
                    <Text style={{marginBottom:5,color:'black'}}>Branch</Text>
                    <MultiSelect
                hideTags
                single={true}
                items={branch}
                uniqueKey="_id"
                onSelectedItemsChange={onSelectedItemsChange2}
                selectedItems={select2}
                selectText="Filter by branch"
                searchInputPlaceholderText="Search branch..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="branch"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="rgb(255,204,102)"
                submitButtonText="ADD"
              />
              
              </View>
              </ScrollView>
                    <TouchableOpacity style={{position:'absolute',alignSelf:'center', backgroundColor:'#2e3092', bottom:0,right:0,width:'50%',borderRadius:0,borderWidth:1,borderColor:'#2e3092'}} onPress={()=> apply()}><Text style={{padding:10,paddingBottom:15,paddingTop:15, alignSelf:'center', fontSize:16,color:'white'}}>Apply</Text></TouchableOpacity>
                    <TouchableOpacity style={{position:'absolute',alignSelf:'center', backgroundColor:'white', bottom:0,left:0,width:'50%',borderRadius:0,borderColor:'#f3f3f3',borderWidth:1}} onPress={()=> reset()}><Text style={{padding:10,paddingBottom:15,paddingTop:15, alignSelf:'center', fontSize:16,color:'#333'}}>Reset</Text></TouchableOpacity>
                    
                    </View>
            </BottomSheet>
          
          {bar?  <TextInput
        value={search}
        onChangeText = {(text)=> setSearch(text)}
        style={styles.search}
        placeholder=" Search customers..."
        /> : null}
        <Icons name='filter' size={24} style={{position:'absolute', top:25,right:20,color:'white'}} onPress={()=> book()} />
          {bar? <Iconss name='close' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> : 
          <Icons name='search' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> }
        {newf? <Iconz name='checkbox-blank-circle' size={10} style={{position:'absolute', top:24,right:19,color:'red'}} /> : null}
        <ScrollView>
        {loading && arnab ? <View style={{flex:1}}>
        <SkeletonPlaceholder>
            <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',marginTop:'7%' }}>
                <View style={{ width: 75, height: 75, borderRadius: 50, bottom:25 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 60, height: 20, borderRadius: 4 }} />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 50, height: 16, borderRadius: 4 }}
                />
            </View>
        </View>
       
        
        </View>
        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',marginTop:'7%' }}>
                <View style={{ width: 75, height: 75, borderRadius: 50, bottom:25 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 60, height: 20, borderRadius: 4 }} />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 50, height: 16, borderRadius: 4 }}
                />
            </View>
        </View>
       

        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',marginTop:'7%' }}>
                <View style={{ width: 75, height: 75, borderRadius: 50, bottom:25 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 60, height: 20, borderRadius: 4 }} />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 50, height: 16, borderRadius: 4 }}
                />
            </View>
        </View>
        </View>

        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',marginTop:'7%' }}>
                <View style={{ width: 75, height: 75, borderRadius: 50, bottom:25 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 60, height: 20, borderRadius: 4 }} />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 50, height: 16, borderRadius: 4 }}
                />
            </View>
        </View>
        </View>


        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',marginTop:'7%' }}>
                <View style={{ width: 75, height: 75, borderRadius: 50, bottom:25 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 60, height: 20, borderRadius: 4 }} />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 50, height: 16, borderRadius: 4 }}
                />
            </View>
        </View>
       
        
        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',marginTop:'7%' }}>
                <View style={{ width: 75, height: 75, borderRadius: 50, bottom:25 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 60, height: 20, borderRadius: 4 }} />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 16, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 50, height: 16, borderRadius: 4 }}
                />
            </View>
        </View>
       
        


        </View>

        </View>


        </View>
        

        

        



          </SkeletonPlaceholder> 
         </View>
          : null}
          {!newf? <View>
            {!search?  <FlatList
            style={{marginTop:20}} 
            data = {orders}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                    {item[role]._id===profile? <TouchableOpacity onPress={()=> navigation.navigate('View',{item:item})} >
                    <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                    <Image
                    source={require('../../assets/profile.png')}
                    style={styles.image}
                    />
                    <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.company_name}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.customer_name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.customer_contact}</Text>
                  {item.isactive==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                    
                    </View>
                  </TouchableOpacity> :null}
                    
                    
                    
                  
                  </View>
                )
                }}
            />   : <FlatList
            style={{marginTop:20}} 
            data = {searchResults}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                    {item[role]._id===profile? <TouchableOpacity onPress={()=> navigation.navigate('View',{item:item})} >
                    <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                    <Image
                    source={require('../../assets/profile.png')}
                    style={styles.image}
                    />
                    <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.company_name}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.customer_name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.customer_contact}</Text>
                  {item.isactive==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                    
                    </View>
                  </TouchableOpacity> :null}
                    
                    
                    
                  
                  </View>
                )
                }}
            />}

          </View> : <View>
          {!search?  <FlatList
            style={{marginTop:20}} 
            data = {newf}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                    {item[role]._id===profile? <TouchableOpacity onPress={()=> navigation.navigate('View',{item:item})} >
                    <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                    <Image
                    source={require('../../assets/profile.png')}
                    style={styles.image}
                    />
                    <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.company_name}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.customer_name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.customer_contact}</Text>
                  {item.isactive==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                    
                    </View>
                  </TouchableOpacity> :null}
                    
                    
                    
                  
                  </View>
                )
                }}
            />   : <FlatList
            style={{marginTop:20}} 
            data = {searchResults}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                    {item[role]._id===profile? <TouchableOpacity onPress={()=> navigation.navigate('View',{item:item})} >
                    <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                    <Image
                    source={require('../../assets/profile.png')}
                    style={styles.image}
                    />
                    <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.company_name}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.customer_name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.customer_contact}</Text>
                  {item.isactive==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                    
                    </View>
                  </TouchableOpacity> :null}
                    
                    
                    
                  
                  </View>
                )
                }}
            />}
          </View> }
          
         
           
        
            </ScrollView>
        
        {state.role==='manager'? <Iconss name="plus" size={30} style={{position:'absolute', bottom:60,right:20,color:'white',backgroundColor:'#98cb48',padding:15,borderRadius:50}} onPress={()=> navigation.navigate('Add')} /> : null}
        {ginti===0 && loading==false? <View style={{position:'absolute',marginTop:200,alignSelf:'center'}}>
              <Noresult /></View> : null}
            {/* {loading? <View style={{marginTop:250,position:'absolute', alignSelf:'center'}}>
              <Text>
               <Spinner />
               </Text>
            </View>: null} */}
            
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
      height: 450,
    },
})

export default CustScreen
