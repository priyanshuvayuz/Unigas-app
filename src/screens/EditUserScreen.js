import React, {useState,useEffect,useContext} from 'react'
import {Text,View,StyleSheet,AsyncStorage,Image,ScrollView, Button,TouchableOpacity, StatusBar,Picker} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {TextInput} from 'react-native-paper'
import Header from '../components/Header'
import Api from '../api/Api'
import {NavigationEvents} from 'react-navigation'
import Spinner from '../components/Spinner'
import MultiSelect from 'react-native-multiple-select';
import {Context as AuthContext} from '../context/AuthContext'


const EditUserScreen = ({navigation}) => {
  const {state} = useContext(AuthContext)
  const item = navigation.getParam('item')
  const [employee_id, setEmployee_id] = useState(item.employee_id)
  const [name,setName] = useState(item.name)
  const [email_id,setEmail_id] = useState(item.email_id)
  const [contact_no,setContact_no] = useState(item.contact_no)
  const [password,setPassword] = useState('')
  const [select1,setSelected1] = useState('')
  const [select2,setSelected2] = useState('')
  const [branch1,setBranch1] = useState([])
  const [area1,setArea1] = useState([])
  const [beat1,setBeat1] = useState([])
  const [selectedItems,setSelectedItems] = useState([])
  const [profile,setProfile] = useState('')
  const [_id,setId] = useState('')
  const [salesmanager,setSalesmanager] = useState(null)
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
    const [count1,setCount1] = useState(item.branches.length)
    const [count2,setCount2] = useState(item.areas.length)
    const role = state.role


    
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
    setContact_no(text)
    setC(false)
    return true;
  }
  else {
    setContact_no(text)
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
    
    useEffect(()=> {
      let bk = item.branches
      let ak = item.areas
      let bek = item.beats
      bk.map((item)=> {
        
        setSelectedItems(oldArray => [...oldArray, item._id]);
      })
      ak.map((item)=> {
        
        setSelected1(oldArray => [...oldArray, item._id]);
      })
      bek.map((item)=> {
        setSelected2(oldArray => [...oldArray, item._id]);
      })
    },[])
    console.log("selected 1 ",select1)
    
    const check = () => {
      if(employee_id===''){
        setE(true)
      }else {
      setE(false)
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
    if(select1.length<1){
      setS1(true)
    }else{
      setS1(false)
    }
    if(select2.length<1){
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
      console.log('working')
        add()
    }
    }
    useEffect(()=> {
      if(select2.length<1){
        setS2(true)
      }else{
        setS2(false)
      }
    },[select1])
    useEffect(()=> {
      if(select2.length<1){
        setS2(true)
      }else{
        setS2(false)
      }
    },[select2])
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
        const res = await Api.put('users/salesexecutive',{id:item._id,employee_id,name,email_id,contact_no,password,sales_managers:_id,branches:selectedItems,beats:select2,areas:select1})
        setLoading(false)
        navigation.navigate('Sales')
      } catch(e) {
        setLoading(false)
        console.log(e)
      }
    }
    
    const get = async () => {
      try{
        const p = await AsyncStorage.getItem('profile')
        const res = await Api.post('users/getBranch',{manager_id:p})
        setBranch1(res.data.result)
        setProfile(p)
        const p1 = await Api.get(`users/salesmanager?id=${p}`)
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
      if(count1<1){
        setSelected1([])
      }
      setCount1(count1-1)
    }, [selectedItems])
    useEffect(() => {
      get2()
      if(count2<1){
        setSelected2([])
      }
      setCount2(count2-1)
    }, [select1])
    console.log(item.areas.length)
    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={get} />
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)',paddingBottom:60}}>
          <Header title="EDIT USER" back="User" />
          <View style={{paddingBottom:60}}>
            <ScrollView>
            <Image
            source={require('../assets/profile.png')}
              style={styles.image}
              />
             
              <View style={{padding:20}}>
                <View style={{marginBottom:10}}>
              <TextInput
              returnKeyType='done'
              keyboardType = 'number-pad'
              maxLength ={6}
              value={`${employee_id}`}
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
              {n?<Text style={{color:'red'}}>Please provide a valid name</Text>: null} 
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={email_id}
              onChangeText={(text)=> emi(text)}
              label='Email'
              mode='outlined'
                style={styles.input}
              />
              {em?<Text style={{color:'red'}}>Please provide valid email</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={contact_no}
              onChangeText={(text)=> phonevalidation(text)}
              onEndEditing = {(text)=> phonevalidation(text.nativeEvent.text)}
              label='Phone'
              mode='outlined'
                style={styles.input}
              />
              {c?<Text style={{color:'red'}}>Please provide a valid contact number</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
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
              <View style={{marginBottom:10}}>
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
              <View>
              <MultiSelect
          hideTags
          items={branch1}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select branch"
          searchInputPlaceholderText="Search branch..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
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
        </View>
        </ScrollView>
        {sn?<Text style={{color:'red'}}>Please select branch</Text>: null}
             
              </View>
              <View  style={{padding:5}}>
              <Text style={styles.text1}>Area</Text>
              <ScrollView>
              <MultiSelect
          hideTags
          items={area1}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange1}
          selectedItems={select1}
          selectText="Select areas"
          searchInputPlaceholderText="Search area..."
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
              <View  style={{padding:5}}>
              <Text style={styles.text1}>Beat</Text>
              <ScrollView>
              <MultiSelect
                hideTags
                items={beat1}
                uniqueKey="_id"
                onSelectedItemsChange={onSelectedItemsChange2}
                selectedItems={select2}
                selectText="Select beats"
                searchInputPlaceholderText="Search beats..."
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
                <Text style={styles.buttonText}>Update</Text>
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
      marginBottom:0,
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

export default EditUserScreen