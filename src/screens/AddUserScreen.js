import React, {useState, useEffect,useContext} from 'react'
import {Text,View,StyleSheet,Image,ScrollView, Button,TouchableOpacity, StatusBar,Picker, FlatList,AsyncStorage} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {TextInput} from 'react-native-paper'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../components/Header'
import Api from '../api/Api'
import Spinner from '../components/Spinner'
import MultiSelect from 'react-native-multiple-select';
const AddUserScreen = ({navigation}) => {
    const [employee_id, setEmployee_id] = useState(null)
    const [name,setName] = useState('')
    const [email_id,setEmail_id] = useState('')
    const [contact_no,setContact_no] = useState('')
    const [password,setPassword] = useState('')
    const [select1,setSelected1] = useState('')
    const [select2,setSelected2] = useState('')
    const [branch1,setBranch1] = useState([])
    const [area1,setArea1] = useState([])
    const [beat1,setBeat1] = useState([])
    const [selectedItems,setSelectedItems] = useState([])
    const [profile,setProfile] = useState('')
    const [_id,setId] = useState('')
    const [salesmanager,setSalesmanager] = useState('')
    const [err,setErr] = useState('')
    const [loading,setLoading] = useState(false)
    const [e,setE] = useState(false)
    const [p,setP] = useState(false)
    const [n,setN] = useState(false)
    const [em,setEm] = useState(false)
    const [c,setC] = useState(false)
    const [s1,setS1] = useState(false)
    const [s2,setS2] = useState(false)
    const [sn,setSn] = useState(false)

    const validateName = (text) => {
      var passw = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if(text.match(passw)) 
      { 
      setName(text)
      setN(false)
      return true;
      }
      else
      { 
        setName(text)
        setN(true)
      return false;
      }
    }

    
    const passwordvalid = (text) => {
      var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if(text.match(passw)) 
      { 
      setPassword(text)
      setP(false)
      setErr('')
      return true;
      }
      else
      { 
        setP(true)
      setErr('Password should contain 6 character,1 special,1 capital and a number')
      return false;
      }
    }
    const phonevalidation = (text) => {
      var phoneno = /^\d{10}$/;
  if(text.match(phoneno)) {
    setC(false)
    return true;
  }
  else {
    setC(true)
    return false;
  }
    }
    const emi = (text) => {
      text=text.toLowerCase()
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          setEmail_id(text.trim())
          setEm(true)
          return false;
        }
        else {
          setEm(false)
            setEmail_id(text.trim())
        }
    }
    const check = () => {
      if(employee_id===''){
        setE(true)
      }else {
      setE(false)
      }
    
    if(password.length<6){
      if(password===''){
        setP(true)
        setErr("Please provide password")
      }else if(password.length<6){
        setP(true)
      setErr("Password should be minimum of 6 character")
      }
    }else{
      setP(false)
    }
    if(name===''){
      setN(true)
    }
    if(email_id===''){
      setEm(true)
      
    }
    if(contact_no===''){
      setC(true)
      
    }
    if(select1===''){
      setS1(true)
    }else{
      setS1(false)
    }
    if(select2 === ''){
      setS2(true)
    }else{
      setS2(false)
    }
    if(selectedItems.length<1){
      setSn(true)
    }else{
      setSn(false)
    }
    
    if(e==false && em==false && c==false && p==false && n==false &&  sn==false && s1==false && s2==false){
        add()
    }
  }
    
    const onSelectedItemsChange = (selectedItems) => {
      // Set Selected Items
      setSelectedItems(selectedItems);
    };
    const onSelectedItemsChange1 = (selectedItems) => {
      // Set Selected Items
      setSelected1(selectedItems);
    };
    const onSelectedItemsChange2 = (selectedItems) => {
      // Set Selected Items
      setSelected2(selectedItems);
    };

    const add= async() => {
      try{
        setLoading(true)
        const res = await Api.post('users/salesexecutive',{employee_id,name,email_id,contact_no,password,manager:_id,branches:selectedItems,beats:select2,areas:select1})
        setLoading(false)
        navigation.navigate('Sales')
      } catch(e) {
        setLoading(false)
        console.log(e)
      }
    }
    useEffect(()=> {

    })
    const get = async () => {
      try{
        const p = await AsyncStorage.getItem('profile')
        const res = await Api.post('users/getBranch',{manager_id:p})
        setBranch1(res.data.result)
        setProfile(p)
        const p1 = await Api.get(`users/salesmanager?id=${p}`)
        // setSalesmanager(p1.data.name)
        setSalesmanager(p1.data.result.name)
        setId(p1.data.result._id)
      } catch(e){
        console.log(e.message)
      }
    }
    const get1 = async () => {
      try{
        const res = await Api.post('master/get_area_from_branch',{branch:selectedItems})
        
        setArea1(res.data.result)
      } catch(e){
        console.log(e.message)
      }
    }
    const get2 = async () => {
      try{
        const res = await Api.post('master/get_beat_from_area',{area:select1})
        
        setBeat1(res.data.result)
      } catch(e){
        console.log(e.message)
      }
    }
    useEffect(() => {
      get1()
       
    }, [selectedItems])
    useEffect(() => {
      get2()
       
    }, [select1])
    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={get} />
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)',paddingBottom:60}}>
          <Header title="ADD SALES EXECUTIVE" back="Sales" />
          <View style={{paddingBottom:60}}>
            <ScrollView>
              <Image
              source={require('../assets/profile.png')}
              style={styles.image}
              />
              {/* <Icons name="pencil-circle" size={26}  style={{  position:'absolute',right:140, borderRadius:60,overflow:'hidden', color:'#2e3092'}} /> */}
              <View style={{padding:20}}>
                <View  style={{marginBottom:10}}>
              <TextInput
              value={employee_id}
              onChangeText={(text)=> setEmployee_id(text)}
                label='Employee Id'
                mode='outlined'
                style={styles.input}
              />
              {e?<Text style={{color:'red'}}>Please provide employee Id</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={name}
              onChangeText={(text)=> validateName(text)}
                label='Name'
                mode='outlined'
                style={styles.input}
              />
              {n?<Text style={{color:'red'}}>Please provide valid name</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={email_id}
              onChangeText={(text)=> emi(text)}
              label='Email'
              mode='outlined'
                style={styles.input}
              />
              {em?<Text style={{color:'red'}}>Please provide a valid email</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              
              value={contact_no}
              keyboardType={'numeric'}
              onChangeText={(text)=> setContact_no(text)}
              onEndEditing = {(text)=> phonevalidation(text.nativeEvent.text)}
              label='Phone'
              mode='outlined'
                style={styles.input}
              />
              {c?<Text style={{color:'red'}}>Please provide valid contact number</Text>: null}
              </View>
              <View  style={{marginBottom:10}}>
              <TextInput
              value={password}
              onChangeText={(text)=> setPassword(text)}
              onEndEditing = {(text)=> passwordvalid(text.nativeEvent.text)}
              label='Password'
              mode='outlined'
                style={styles.input}
              />
              {p?<Text style={{color:'red'}}>{err}</Text>: null}
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
              <View style={{padding:5}}>
              <Text style={styles.text1}>Branch</Text>
              <ScrollView>
              <MultiSelect
          hideTags
          items={branch1}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select Branch"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="branch"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#2e3092"
          submitButtonText="ADD"
          styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
          
        />
        </ScrollView>
              {sn?<Text style={{color:'red'}}>Please select branch</Text>: null}
              </View>
              <View style={{padding:5}}>
              <Text style={styles.text1}>Area</Text>
              <ScrollView>
              <MultiSelect
          hideTags
          items={area1}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange1}
          selectedItems={select1}
          selectText="Select Area"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="area"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#2e3092"
          submitButtonText="ADD"
          styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
        />
        </ScrollView>
        {s1?<Text style={{color:'red'}}>Please select Area</Text>: null}
              </View>
              <View style={{padding:5}}>
              <Text style={styles.text1}>Beat</Text>
              <ScrollView>
              <MultiSelect
                hideTags
                items={beat1}
                uniqueKey="_id"
                onSelectedItemsChange={onSelectedItemsChange2}
                selectedItems={select2}
                selectText="Select Beats"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="beat"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="#2e3092"
                submitButtonText="ADD"
                styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
              />
              </ScrollView>
              {s2?<Text style={{color:'red'}}>Please select Beats</Text>: null}
              </View>
              
              
              </View>
              </ScrollView>
              
          </View>
          {loading? <TouchableOpacity style={styles.button} onPress={()=> check()}>
                <Text style={styles.buttonText}>Processing...</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=> check()}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity> }
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
        height:100,
        width:100,
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
      marginBottom:3,
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
      color:'#ffffff',
      fontWeight:'bold'
  },
})

export default AddUserScreen