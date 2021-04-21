import React,{useState,useEffect} from 'react'
import { Text,View,StyleSheet,Image,ScrollView,FlatList, Button,TouchableOpacity, StatusBar,Switch,Alert } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import Iconz from 'react-native-vector-icons/Feather'
import Iconn from 'react-native-vector-icons/FontAwesome'
import Iconnn from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header'
import Api from '../../api/Api'
import Spinner from '../../components/Spinner'
import moment from "moment";

const ViewOrderApproval = ({navigation}) => {
    const item = navigation.getParam('item')
    const [isactive,setIsactive] = useState(item.manager_approval)
    const [loading,setLoading] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false);
    const [d,setDate]= useState("")

    useEffect(()=> {
        if(isactive==='Approved'){
            setIsEnabled(true)
        }else{
          setIsEnabled(false)
        }
      },[isactive])

      useEffect(()=> {
        let a =item.createdAt
        let c = moment(a).calendar(); 
        setDate(c)
      },[])

      const check123=(user) => {
        let a = ''
        if(user){
           a='not approved'
        }else{
          a='approved'
        }
        Alert.alert(
          "Change Order Status",
          `Order will be ${a}`,
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
            const res = await Api.put('order/update',{id:item._id,manager_approval:"Approved"})
            setLoading(false)
            navigation.navigate('Order')
          } catch(e){
            setLoading(false)
            console.log(e)
          }
        }

    return (
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)',paddingBottom:60}}>
          <Header title="VIEW ORDER" back="Order" />
          <Iconz name="edit-2" size={20} style={{color:'#2e3092', position:'absolute', right:25,top:22}} onPress={()=> navigation.navigate('EditAp',{item:item})} />
          <View style={{paddingBottom:70}}>
            <ScrollView>
            <Image
              style={styles.image}
              source={require('../../assets/profile.png')}
              />
              <View>
              <Text style={{fontSize:25,fontWeight:'bold', alignSelf:'center'}}>#{item.order_id}</Text>
              <Text></Text>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{d}</Text>
              <Icons name='date-range' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.status}</Text>
              <Icons name='delivery-dining' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.location}</Text>
              <Icon name='md-location-outline' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>Customer Name: {item.customer.customer_name}</Text>
              <Iconz name='users' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.customer.company_name}</Text>
              <Iconn name='building-o' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.executive.name}</Text>
              <Iconnn name='account-tie' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.manager.name}</Text>
              <Icon name='man' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.branch.branch}</Text>
              <Icon name='git-branch' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.filled_cylinders}</Text>
              <Icon name='color-fill-outline' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.empty_cylinders}</Text>
              <Iconnn name='delete-empty-outline' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>{item.amount}</Text>
              <Iconn name='rupee' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              <View style={styles.card1}>
              {item.payment_status==='Paid'? <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}><Text style={{color:'green'}}> {item.payment_status}</Text></Text> : <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}><Text style={{color:'red'}}> {item.payment_status}</Text></Text>}
              <Icons name='payment' style={{fontSize:16,fontWeight:'bold',position:'absolute', left:5, top:13,color:'#696969',backgroundColor:'#f7f7f7',padding:10,borderRadius:50}} />
              </View>
              {/* <View style={styles.card1}>
              <Switch
                    trackColor={{ false: "red", true: "green" }}
                    thumbColor={isEnabled ? "white" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>check123(isEnabled)}
                   value={isEnabled}
                   style={{bottom:20,position:'absolute',right:20}}
              /> */}
              {/* <Text style={{fontSize:16,fontWeight:'bold', alignSelf:'flex-start', left:35, marginTop:10,color:'#bec2bf'}}>MOBILE NUMBER: {mobile}</Text> */}
              
              {/* <Text style={{fontSize:16,fontWeight:'bold',color:'#696969',left:28,borderBottomWidth:2,padding:10,borderBottomColor:'#e6e6e6'}}>Order Status</Text>
              
              </View> */}
              
              </View>
              
              </ScrollView>
              
          </View>
          
          {!loading? <TouchableOpacity style={styles.button} onPress={()=> check1()}>
            <Text style={styles.buttonText}>Approve order</Text>
          </TouchableOpacity>: <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Processing...</Text>
          </TouchableOpacity>}
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
      alignSelf:'center',
      marginTop:5,
      height:60,
      width:'100%',
      backgroundColor:'#2e3092',
      bottom:0,
      position:'absolute'
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
      color:'white',
      fontWeight:'bold'
  },
  card1:{
    width:'100%',
    padding:10,
    borderTopWidth:3,
    borderTopColor:'white'
    }
})


export default ViewOrderApproval
