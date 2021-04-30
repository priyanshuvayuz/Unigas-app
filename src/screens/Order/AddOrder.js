import React, {useState, useEffect,useContext} from 'react'
import {Text,View,StyleSheet,Image,ScrollView, Button,TouchableOpacity, StatusBar,Picker, FlatList,AsyncStorage,ToastAndroid} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {TextInput} from 'react-native-paper'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header'
import Api from '../../api/Api'
import MultiSelect from 'react-native-multiple-select';
import { State } from 'react-native-gesture-handler'
import Spinner from '../../components/Spinner'
import {Context as AuthContext} from '../../context/AuthContext'

const AddOrder = ({navigation}) => {
  const {state} = useContext(AuthContext)
    const [order_id, setOrderId] = useState("")
    const [filled_cylinders, setCylinders] = useState("")
    const [empty_cylinders, setEmptyCylinders] = useState("")
    const [type, setType] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [select1,setSelected1] = useState('')
    const [select2,setSelected2] = useState('')
    const [branch1,setBranch1] = useState([])
    const [area1,setArea1] = useState([])
    const [beat1,setBeat1] = useState([])
    const [help,setHelp] = useState([])
    const [selected4,setSelected4] = useState([])
    const [selectedItems,setSelectedItems] = useState([])
    const [selected5,setSelected5] = useState([])
    const [mod,setMod] = useState([])
    const [sale,setSale] = useState([])
    const [profile,setProfile] = useState('')
    const [_id,setId] = useState('')
    const [salesmanager,setSalesmanager] = useState('')
    const [loading,setLoading] = useState(false)
    const [err,setErr] = useState('')
    const [l,setL] = useState(false)
    const [ec,setEc] = useState(false)
    const [fl,setFl] = useState(false)
    const [n,setN] = useState(false)
    const [o,setO] = useState(false)
    const [em,setEm] = useState(false)
    const [cn,setCn] = useState(false)
    const [c,setC] = useState(false)
    const [s1,setS1] = useState(false)
    const [s2,setS2] = useState(false)
    const [s4,setS4] = useState(false)
    const [s5,setS5] = useState(false)
    const [sn,setSn] = useState(false)
  let count = 1
 


  const digit = (text)=>{
    if(select2.length<1){
      setS2(true)
    }else{
      setS2(false)
      var passw = /^\d+$/;
    if(text.match(passw)) 
    { 
    setCylinders(text)
    setFl(false)
    return true;
    }
    else
    { 
      setCylinders(text)
      setFl(true)
    return false;
    }
    }
    
   }
   const digit1 = (text)=>{
    var passw = /^\d+$/;
    if(text.match(passw)) 
    { 
    setEmptyCylinders(text)
    setEm(false)
    return true;
    }
    else
    { 
      setEmptyCylinders(text)
      setEm(true)
    return false;
    }
   }

  const validateName = (text) => {
    text=text.trim()
    // var passw = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    if(!text.length<2) 
    { 
    setOrderId(text)
    setO(false)
    return true;
    }
    else
    { 
      setOrderId(text)
      setO(true)
    return false;
    }
  }

  const validateName1 = (text) => {
    var passw = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    if(text.match(passw)) 
    { 
    setLocation(text)
    setL(false)
    return true;
    }
    else
    { 
      setLocation(text)
      setL(true)
    return false;
    }
  }

  useEffect(()=> {
    if(price){
      let a = price* filled_cylinders
    setAmount(a.toString())
    }
    
  },[price])
    const check = async() => {

      setTimeout(() => {
        if (order_id === '') {
          setO(true)

        } else {
          setO(false)
        }


        if (location === '') {
          setL(true)

        } else {
          setL(false)
        }
        if (filled_cylinders === '') {
          setFl(true)

        }


        if (selected4 < 1) {
          setS4(true)

        } else {
          setS4(false)
        }
        if (select1 === '') {
          setS1(true)
        } else {
          setS1(false)
        }
        if (select2 === '') {
          setS2(true)
        } else {
          setS2(false)
        }
        if (selected5.length < 1) {
          setS5(true)
        } else {
          setS5(false)
        }
        if (selectedItems.length < 1) {
          setSn(true)
        } else {
          setSn(false)
        }
      }, 100)
      
     
      if(fl==false && ec==false && l==false &&  sn==false && s1==false && s2==false && s4==false ){
        add()
      }
    
     
    }
    
    const onSelectedItemsChange = (selectedItems) => {
      // Set Selected Items
      setSelectedItems(selectedItems);
    // setMod({executive:selectedItems[0]})
    };
    const onSelectedItemsChange1 = (selectedItems) => {
      // Set Selected Items
      setSelected1(selectedItems);
    };
    const onSelectedItemsChange2 = (selectedItems) => {
      // Set Selected Items
      setSelected2(selectedItems);
    };
    const onSelectedItemsChange4 = (selectedItems) => {
        // Set Selected Items
        setSelected4(selectedItems);
      };
      const onSelectedItemsChange5 = (selectedItems) => {
        // Set Selected Items
        setSelected5(selectedItems);
      };

    const add= async() => {
        // console.log({order_id,amount,filled_cylinders:parseInt(filled_cylinders),empty_cylinders:parseInt(empty_cylinders),location,branch:selected4[0],distributor:selected5[0],executive:selectedItems[0],customer:select1[0],cylinder_name:select2[0],manager:_id})
      try{
        setLoading(true)
        const res = await Api.post('order/create',{order_id,amount,filled_cylinders:parseInt(filled_cylinders),empty_cylinders:parseInt(empty_cylinders),location,branch:selected4[0],distributor:selected5[0],executive:selectedItems[0],customer:select1[0],cylinder_name:select2[0],manager:_id,manager_approval:'Approved',createdBy:'Manager'})
        setLoading(false)
        ToastAndroid.show("Order created! Gone for approval to Admin", ToastAndroid.LONG);
        navigation.navigate('Order')
      } catch(e) {
        setLoading(false)
        console.log(e.response.data)
      }
    }
    const magi = async() => {
        await get()
        await get()
        // ok()
    }
    
    const get = async () => {
      try{
        const p = await AsyncStorage.getItem('profile')
        const p1 = await Api.get(`users/salesmanager?id=${p}`)
        const res = await Api.get('users/salesexecutive')
        // setSalesmanager(p1.data.name)
        setSalesmanager(p1.data.result.name)
        setId(p1.data.result._id)
        setBranch1(res.data.result)
        // console.log(branch1)
        setProfile(p)
      } catch(e){
        console.log(e.message)
      }
    }
    useEffect(()=> {
        branch1.map((item)=> {
            if(item.manager._id === profile){
                setSale(oldArray => [...oldArray, {name:item.name,_id:item._id}])
            }
        })
    },[branch1])
        
            
        console.log(selected4)
    const make = async () => {
        try{
          const res = await Api.post('users/get_distributor_from_branch',{executiveId:selectedItems[0]})
          
          setMod(res.data.result)
        } catch(e){
          console.log(e.message)
        }
      }
      const make1 = async () => {
        try{
          const res = await Api.post('users/get_customer_from_distributor',{distributor_id:selected5[0]})
          
          setArea1(res.data.result)
        } catch(e){
          console.log(e.message)
        }
      }
    const get1 = async () => {
      try{
        const res = await Api.post('users/get_branch_form_executive',{executive:selectedItems[0]})
        setHelp(res.data.result)
      } catch(e){
        console.log(e.message)
      }
    }
    const get2 = async () => {
      try{
        const res = await Api.get('master/stock')
        setBeat1(res.data.result)
      } catch(e){
        console.log(e.message)
      }
    }
    const get3 = async () => {
      try{
        const res = await Api.post('master/get_amount_form_cylinder',{cylinder_id:select2[0]})
        setPrice(res.data.amount)
      } catch(e){
        console.log(e.message)
      }
    }
    const get4 = async () => {
      let a = price* filled_cylinders
      setAmount(a.toString())
    }
    useEffect(() => {
        make()
         
      }, [selected4])
      useEffect(() => {
        make1()
         
      }, [selected5])
    useEffect(() => {
      get1()
       
    }, [selectedItems])
    useEffect(() => {
      get2()
       
    }, [select1])
    useEffect(() => {
      get3()
       
    }, [select2])
    useEffect(() => {
      get4()
       
    }, [filled_cylinders])
  //   let serviceItems = branch.map( (s, i) => {
  //     return <Picker.Item key={i} value={s.branch} label={s.branch} />
  // });
    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={magi} />
        <View style={{flex:1,backgroundColor:'white',paddingBottom:60}}>
          <Header title="ADD ORDER" back="Order" />
          <View style={{paddingBottom:60}}>
            <ScrollView>
              {/* <Image
              style={styles.image}
              source={require('../../assets/profile.png')}
              /> */}
              {/* <Icons name="pencil-circle" size={26}  style={{  position:'absolute',right:150, borderRadius:60,overflow:'hidden', color:'rgb(255,204,102)'}} /> */}
              <View style={{padding:20}}>
                <View  style={{marginBottom:10}}>
              <TextInput
              value={order_id}
              onChangeText={(text)=> validateName(text)}
              onEndEditing = {(text)=> validateName(text.nativeEvent.text)}
              label='Order id'
              mode='outlined'
                style={styles.input}
              />
              {o?<Text style={{color:'red'}}>Please provide valid Orderid</Text>: null}
              </View>
              
              <View  style={{marginBottom:10}}>
              <TextInput
              value={location}
              onChangeText={(text)=> validateName1(text)}
              onEndEditing = {(text)=> validateName1(text.nativeEvent.text)}
              label='Location'
              mode='outlined'
                style={styles.input}
              />
              {l?<Text style={{color:'red'}}>Please provide valid Location</Text>: null}
              </View>
             
              <View  style={{marginBottom:10}}>
              <TextInput
              value={salesmanager}
              editable={false}
              label='Sales manager'
              mode='outlined'
                style={styles.input}
              />
              
              </View>
              <View>
              <Text style={styles.text1}>Sales executive</Text>
              
              <MultiSelect
                    hideTags={false}
                    single={true}
                    items={sale}
                    uniqueKey="_id"
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Select sales executive"
                    searchInputPlaceholderText="Search executive..."
                    // onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC'}}
                    submitButtonColor="rgb(255,204,102)"
                    submitButtonText="ADD"
                    styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
                  />  
               
        
               {sn?<Text style={{textAlign:'center', color:'red'}}>Please select sales executive</Text>: null}
              
              </View>
              <View>
              <Text style={styles.text1}>Branch</Text>
              
              <MultiSelect
                    hideTags={false}
                    single={true}
                    items={help}
                    uniqueKey="_id"
                    onSelectedItemsChange={onSelectedItemsChange4}
                    selectedItems={selected4}
                    selectText="Select branch"
                    searchInputPlaceholderText="Select branch..."
                    // onChangeInput={(text) => console.log(text)}
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
                    styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
                  />  
               
               {s4?<Text style={{textAlign:'center', color:'red'}}>Please select branch</Text>: null}
              
              
              </View>
              <View>
              <Text style={styles.text1}>Distributor</Text>
              
              <MultiSelect
                    hideTags={false}
                    single={true}
                    items={mod}
                    uniqueKey="_id"
                    onSelectedItemsChange={onSelectedItemsChange5}
                    selectedItems={selected5}
                    selectText="Select distributor"
                    searchInputPlaceholderText="Search distributor..."
                    // onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC'}}
                    submitButtonColor="rgb(255,204,102)"
                    submitButtonText="ADD"
                    styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
                  />  
               
        
               {s5?<Text style={{textAlign:'center', color:'red'}}>Please choose distributor</Text>: null}
              
              </View>
              <View>
              <Text style={styles.text1}>Customer company</Text>
              
              <MultiSelect
          hideTags
          single={true}
          items={area1}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange1}
          selectedItems={select1}
          selectText="Select company"
          searchInputPlaceholderText="Search company..."
          // onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="company_name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="rgb(255,204,102)"
          submitButtonText="ADD"
          styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
        />
        {s1?<Text style={{textAlign:'center', color:'red'}}>Select Customer Company</Text>: null}
              </View>
              <View>
              <Text style={styles.text1}>Cylinder name</Text>
              
              <MultiSelect
                hideTags
                single={true}
                items={beat1}
                uniqueKey="_id"
                onSelectedItemsChange={onSelectedItemsChange2}
                selectedItems={select2}
                selectText="Choose cylinder type"
                searchInputPlaceholderText="Search cylinder type..."
                // onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="cylinder_name"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="rgb(255,204,102)"
                submitButtonText="ADD"
                styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
              />
              {s2?<Text style={{color:'red'}}>Please select cylinder type</Text>: null}
              </View>
              <View  style={{marginBottom:10}}>
              <TextInput
              maxLength={5}
              keyboardType={'number-pad'}
              value={filled_cylinders}
              label='Filled cylinder'
              mode='outlined'
              style={styles.input}
              onChangeText={(text)=> digit(text)}
              onEndEditing = {(text)=> digit(text.nativeEvent.text)}
              />
              {fl?<Text style={{color:'red'}}>Please enter valid filled cylinder</Text>: null}
              </View>

              <View  style={{marginBottom:10}}>
              <TextInput
              maxLength={5}
              keyboardType={'number-pad'}
              value={empty_cylinders}
              label='Empty cylinder'
              mode='outlined'
              style={styles.input}
              onChangeText={(text)=> digit1(text)}
              onEndEditing = {(text)=> digit1(text.nativeEvent.text)}
              />
              {em?<Text style={{color:'red'}}>Please enter valid empty cylinder</Text>: null}
              </View>
              <View  style={{marginBottom:10}}>
              <TextInput
              value={amount}
              editable={false}
              label='Amount with gst'
              mode='outlined'
                style={styles.input}
              />
              </View>
              
              </View>
              
              </ScrollView>
          </View>
          {loading? <TouchableOpacity style={styles.button}  >
                <Text style={styles.buttonText}>Processing...</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=> check()} >
                <Text style={styles.buttonText}>Add</Text>
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
      color:'black',
    },
    text1: {
      fontSize:12,
      color:'black',
      marginBottom:5,
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
  buttonText: {
      fontSize:17,
      alignSelf:'center',
      padding:16,
      color:'white',
      fontWeight:'bold'
  },
})

export default AddOrder
