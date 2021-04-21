import React, {useEffect,useState,useContext} from 'react'
import { View, Text, TouchableOpacity, TextInput,Animated, StyleSheet,StatusBar,ScrollView,Image,FlatList,AsyncStorage } from 'react-native'
import Header from '../components/Header1'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconss from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/Feather'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from '../components/Spinner'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Shimmer from './Shimmer'
import Api from '../api/Api'
import { NavigationEvents } from 'react-navigation'; 
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
import Noresult from '../components/NoResults'
import { BottomSheet } from 'react-native-btr';
import DropDownPicker from 'react-native-dropdown-picker'
import {Context as AuthContext} from '../context/AuthContext'

const SalesExecutiveScreen = ({navigation}) => {
  const {state} = useContext(AuthContext)
  const role = state.role
  
  const [status,setStatus] = useState('')
  const [sales, setSales] = useState([])
  const [search,setSearch] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [profile,setProfile] = useState(null)
  const [bar,setBar] = useState(false)
  const [loading,setLoading] = useState(true)
  const [shimmer,setShimmer] = useState(false)
  const [arnab,setArnab] = useState(true)
  const [visible,setVisible] = useState(false)
  const [newf,setNewf] = useState(null)
  const [ginti,setGinti] = useState(0)
  var sub = 0

  const postion = new Animated.ValueXY({x:50,y:0})
  Animated.timing(postion,{
      toValue:{x:-10,y:0},
      speed:10,
  }).start()
  // const {colors} = useTheme()

  // let fall = new Animated.Value(1)
  // useEffect(()=> {
  //   (async()=> {
  //     try{
  //       // setLoading(true)
  //       setShimmer(true)
  //       setArnab(true)
  //       const res = await Api.get('users/salesexecutive?setactive=active')
  //       setSales(res.data.result)
  //       // setLoading(false)
  //       setShimmer(false)
  //       setArnab(false)
  //     } catch(e){
  //       setArnab(false)
  //       setShimmer(false)
  //       console.log(e.message)
  //     }
      
  //   })
  // },[sales])
  const reset = () => {
    setStatus('')
    setNewf(null)
  }
  const apply = () => {
    if(status){
      
      console.log("List satrts here")
      const results = sales.filter(person =>{
        return person.is_active.localeCompare(status)
     }
    )
    setNewf(results)
    }else{
      setNewf(null)
    }
  }
  // console.log(newf)
  useEffect(() => {
    const results = sales.filter(person =>{
       return person.name.toLowerCase().includes(search.toLowerCase())
    }
      
    );
    setSearchResults(results);
  }, [search]);

  const listempty = () => {
    return(
      <View>
        <Iconz name='emoticon-sad-outline' size={50} color='black' style={{ fontWeight:'bold', alignSelf:'center'}} />
        <Text style={{textAlign:'center',fontSize:20,color:'black'}}>No result!!</Text>
      </View>
    )
  }
  const banti = async() => {
    sales.map((item)=> {
      
      if(item[role]._id===profile){
        sub++
        setGinti(sub)
      }
    })
  }
  useEffect(() => {
    
      banti()
  })

  const ok = async()=> {
    try{
      // setLoading(true)
      // setSales([])
      setStatus('')
      setNewf(null)
      setShimmer(true)
      const res = await Api.get('users/salesexecutive')
      const r = await AsyncStorage.getItem('profile')
      setSales(res.data.result)
      setProfile(r)
      setArnab(false)
      setShimmer(false)
    } catch(e){
      setShimmer(false)
      console.log(e.message)
    }
  }

    return(
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={ok} />
       
        <View style={{flex:1,backgroundColor:'#f7f7f7'}}>
          <Header title="Sales executive" bar={bar} />
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
                            {label: 'Active', value: 'InActive' },
                            {label: 'InActive', value: 'Active'},
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
          {/* <Icon name="add-circle-outline" size={24} style={{position:'absolute', top:1,right:20,color:'white'}} onPress={()=> navigation.navigate('Add')} /> */}
          <Icons name='filter' size={24} style={{position:'absolute', top:25,right:20,color:'white'}} onPress={()=> setVisible(!visible)} />
          {bar? <Iconss name='close' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> : 
          <Icons name='search' size={24} style={{position:'absolute', top:25,right:60,color:'white'}} onPress={()=> setBar(!bar)} /> }
          {newf? <Iconz name='checkbox-blank-circle' size={10} style={{position:'absolute', top:24,right:19,color:'red'}} /> : null}
          
          <Animated.View style={{transform:[
                {translateX:postion.x}
            ],position:'absolute',
            width:'100%',}}>
          {bar?  <TextInput
        value={search}
        onChangeText = {(text)=> setSearch(text)}
        style={styles.search}
        placeholder=" Search by name..."
        /> : null}</Animated.View>
         
        <View>
     
        
        </View>
        <ScrollView>
        {shimmer && arnab ? <View style={{flex:1}}>
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
            {!search? <FlatList
            style={{marginTop:20}} 
            data = {sales}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id}
            renderItem= {({ item })=>{
                return (
                  
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                    {/* {role? console.log(item[role]._id) : null} */}
                    {item[role]._id===profile?<TouchableOpacity onPress={()=> navigation.navigate('User',{name:item.name,branches:item.branches,areas:item.areas,beats:item.beats,mobile:item.contact_no,status:item.is_active,id:item._id,item:item})}>
                    {/* {ginti=ginti+1} */}
                  <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                  <Image
                  source={require('../assets/profile.png')}
                  style={styles.image}
                  />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.employee_id}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email_id}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.contact_no}</Text>
                  {item.is_active==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                  
                  </View> 
                  </TouchableOpacity> : null}
                    
                  
                  </View>
                )
                }}
            /> : <FlatList
            style={{marginTop:20}} 
            data = {searchResults}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                  {item[role]._id===profile? <TouchableOpacity onPress={()=> navigation.navigate('User',{name:item.name,branches:item.branches,areas:item.areas,beats:item.beats,mobile:item.contact_no})}>
                    
                  <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                  <Image
                  source={require('../assets/profile.png')}
                  style={styles.image}
                  />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.employee_id}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email_id}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.contact_no}</Text>
                  {item.is_active==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                  
                  </View> 
                  </TouchableOpacity>  :null}
                  </View>
                )
                }}
            />}
             </View> : <View>
             {!search? <FlatList
            style={{marginTop:20}} 
            data = {newf}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                    {item[role]._id===profile?<TouchableOpacity onPress={()=> navigation.navigate('User',{name:item.name,branches:item.branches,areas:item.areas,beats:item.beats,mobile:item.contact_no,status:item.is_active,id:item._id,item:item})}>
                    <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                  <Image
                  source={require('../assets/profile.png')}
                  style={styles.image}
                  />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.employee_id}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email_id}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.contact_no}</Text>
                  {item.is_active==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                  
                  </View> 
                  </TouchableOpacity> : null}
                    
                  
                  </View>
                )
                }}
            /> : <FlatList
            style={{marginTop:20}} 
            data = {searchResults}
            ListEmptyComponent={listempty}
            keyExtractor = {(result)=> result._id} 
            renderItem= {({ item })=>{
                return (
                  <View style={{paddingLeft:20,paddingRight:20,paddingTop:1,paddingBottom:1}}>
                  {item[role]._id===profile? <TouchableOpacity onPress={()=> navigation.navigate('User',{name:item.name,branches:item.branches,areas:item.areas,beats:item.beats,mobile:item.contact_no})}>
                    
                  <View style={{ flexDirection:'row', marginBottom:5,backgroundColor:'white',height:100}}>
                    
                  <Image
                  source={require('../assets/profile.png')}
                  style={styles.image}
                  />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:120, fontWeight:'bold',color:'#2e3092',opacity:0.5,top:5 }}>#{item.employee_id}</Text>
                  <Text style={{ fontSize:17,color:'black',position:'absolute',left:120, fontWeight:'bold',top:25 }}>{item.name}</Text>
                  <Icons name='mail' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:45, top:55}} />
                  <Icon name='call' size={24} color={'rgb(195,195,195)'} style={{ fontSize:16, fontWeight:'bold', left:30, top:75}} />
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:52,color:'rgb(195,195,195)' }}>{item.email_id}</Text>
                  <Text  style={{ fontSize:16,color:'black',position:'absolute',left:140, fontWeight:'bold',top:72,color:'rgb(195,195,195)' }}>{item.contact_no}</Text>
                  {item.is_active==="Active"? <Text style={{position:'absolute', fontSize:14,backgroundColor:'green',borderRadius:5 ,left:5, top:2, color:'white',width:55,textAlign:'center'}}>Active</Text>:<Text style={{position:'absolute', fontSize:14, left:5, top:2, color:'white',backgroundColor:'red',textAlign:'center',width:60,borderRadius:5}}>Inactive</Text>}
                  
                  </View> 
                  </TouchableOpacity>  :null}
                  </View>
                )
                }}
            />}
               </View>}
          
          
        
            </ScrollView>
            {state.role=== 'manager'? <Iconss name="plus" size={30} style={{position:'absolute', bottom:60,right:20,color:'white',backgroundColor:'#98cb48',padding:15,borderRadius:50}} onPress={()=> navigation.navigate('Add')} /> : null}
            {ginti===0 && shimmer==false? <View style={{position:'absolute',marginTop:200,alignSelf:'center'}}>
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
        width:'56%',
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
    header: {
      backgroundColor:'#ffffff',
      shadowColor:'#333333',
      shadowOffset: {width:-1, height:-3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      paddingTop:20,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
    },
    panelHeader: {
      alignItems:'center'
    },
    pannelHandle: {
      width:40,
      height: 8,
      borderRadius:4,
      backgroundColor: "#00000040",
      marginBottom:10,
    },
    panelTitle: {

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


export default SalesExecutiveScreen




{/* <Text style={{position:'absolute', fontSize:17, fontWeight:'bold', right:80, top:15}}>Sales Executive Name</Text>
            <Text style={{position:'absolute', fontSize:16, fontWeight:'bold', right:93, top:35,color:'rgb(195,195,195)'}}>Sales Manager Name</Text>
            <Text style={{position:'absolute', fontSize:16, fontWeight:'bold', right:93, top:55, color:'rgb(195,195,195)'}}>Date of Creation</Text>
            <Icons name='calendar' size={24} color={'rgb(195,195,195)'} style={{position:'absolute', fontSize:16, fontWeight:'bold', left:150, top:57}} />
            <Text style={{position:'absolute', fontSize:16, fontWeight:'bold', right:142, top:75, color:'rgb(195,195,195)'}}>Branches</Text>
            <Icons name='map' size={24} color={'rgb(195,195,195)'} style={{position:'absolute', fontSize:16, fontWeight:'bold', left:150, top:80}} />
            <Text style={{position:'absolute', fontSize:16, fontWeight:'bold', right:195, top:100, color:'green'}}>Active</Text> */}

            //inventory=>