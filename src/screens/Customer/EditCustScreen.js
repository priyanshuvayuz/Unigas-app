import React, {useState, useEffect,useContext} from 'react'
import {Text,View,StyleSheet,Image,ScrollView, Button,TouchableOpacity, StatusBar,Picker, FlatList,AsyncStorage} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {TextInput} from 'react-native-paper'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header'
import Api from '../../api/Api'
import MultiSelect from 'react-native-multiple-select';
import { State } from 'react-native-gesture-handler'
import Spinner from '../../components/Spinner'
import { set } from 'react-native-reanimated'
import {Context as AuthContext} from '../../context/AuthContext'

const EditCustScreen = ({navigation}) => {
  const {state} = useContext(AuthContext)
    const item = navigation.getParam('item')
    // console.log(item)
    const [loading,setLoading] = useState(false)
    const [company_name, setCompany] = useState(item.company_name)
    const [customer_name,setName] = useState(item.customer_name)
    const [email,setEmail_id] = useState(item.email)
    const [customer_contact,setContact1] = useState(item.customer_contact.toString())
    const [company_contact,setContact] = useState(item.company_contact.toString())
    const [password,setPassword] = useState('')
    const [select1,setSelected1] = useState([item.area._id])
    const [select2,setSelected2] = useState([item.beat._id])
    const [branch1,setBranch1] = useState([])
    const [area1,setArea1] = useState([])
    const [beat1,setBeat1] = useState([])
    const [help,setHelp] = useState([])
    const [selected4,setSelected4] = useState([item.branch._id])
    const [selectedItems,setSelectedItems] = useState([item.executive._id])
    const [selected5,setSelected5] = useState([item.distributor._id])
    const [mod,setMod] = useState([])
    const [sale,setSale] = useState([])
    const [profile,setProfile] = useState('')
    const [_id,setId] = useState('')
    const [salesmanager,setSalesmanager] = useState([item.manager._id])
    const [err,setErr] = useState('')
    const [cn,setCn] = useState(false)
    const [cc,setCc] = useState(false)
    const [p,setP] = useState(false)
    const [n,setN] = useState(false)
    const [g,setG] = useState(false)
    const [pa,setPa] = useState(false)
    const [em,setEm] = useState(false)
    const [cs,setCs] = useState(false)
    const [c,setC] = useState(false)
    const [s1,setS1] = useState(true)
    const [s2,setS2] = useState(true)
    const [s4,setS4] = useState(true)
    const [s5,setS5] = useState(true)
    const [sn,setSn] = useState(true)
    const [count1,setCount1] = useState(0)
    const [count2,setCount2] = useState(0)
    const [count3,setCount3] = useState(0)
    const [count4,setCount4] = useState(0)
    const [count5,setCount5] = useState(0)
    let count=0
    const role = state.role
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
      setErr('password should contain 6 character,1 special,1 capital and a number')
      return false;
      }
    }

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
    const validateName1 = (text) => {
      var passw = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if(text.match(passw)) 
      { 
      setCompany(text)
      setCn(false)
      return true;
      }
      else
      { 
        setCompany(text)
        setCn(true)
      return false;
      }
    }
    const phonevalidation = (text) => {
      var phoneno = /^\d{10}$/;
  if(text.match(phoneno)) {
    setContact1(text)
    setC(false)
    return true;
  }
  else {
    setContact1(text)
    setC(true)
    return false;
  }
    }
    const phonevalidation1 = (text) => {
      var phoneno = /^\d{10}$/;
  if(text.match(phoneno)) {
    setContact(text)
    setCc(false)
    return true;
  }
  else {
    setContact(text)
    setCc(true)
    return false;
  }
    }
    const emi = (text) => {
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


    const check1 = (text) => {
      if(text.trim().length<1){
        setCn(true)
      }else{
        setCn(false)
      }
    }
    const check2 = (text) => {
      if(text.trim().length<1){
        setCc(true)
      }else{
        setCc(false)
      }
    }
    const check3 = (text) => {
      if(text.trim().length<1){
        setN(true)
      }else{
        setN(false)
      }
    }
    const check4 = (text) => {
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
    const check5 = (text) => {
      if(text.trim().length<1){
        setC(true)
      }else{
        setC(false)
      }
    }
    const check6 = (text) => {
      if(text.trim().length<6){
        setP(true)
      }else{
        setP(false)
      }
    }
    const check7 = (text) => {
      if(text.length<1){
        setSn(true)
      }else{
        setSn(false)
      }
    }
    const check8 = (text) => {
      if(text.length<1){
        setS4(true)
      }else{
        setS4(false)
      }
    }
    
    const check9 = (text) => {
      if(text.length<1){
        setS5(true)
      }else{
        setS5(false)
      }
    }
    const check10 = (text) => {
      if(text.length<1){
        setS1(true)
      }else{
        setS1(false)
      }
    }
    useEffect(()=> {
      if(select2.length<1){
        setErr(true)
      }else{
        setErr(false)
      }
    },[select2])
    useEffect(()=> {
      if(select2.length<1){
        setErr(true)
      }else{
        setErr(false)
      }
    },[select1])
    // const check14 = () => {
    //   if(select2.length<1){
    //     setErr(true)
    //   }else{
    //     setErr(false)
    //   }
    // }
    useEffect(()=> {
      if(select2){
        setS2(false)
      }else{
        setS2(true)
      }
    },select2)
    const check = () => {
      if(select2.length<1){
        setErr('Please Provide beat')
        
      }else{
        setErr('')
      }
    
    // console.log(cn,em,c,p,n,sn,s1,s2,s4,pa,g)
    if(cn==false && em==false && c==false && p==false && n==false &&  sn==false && s1==false && s2==false && s4==false && pa==false && g==false){
      setErr('')
        add()
    }else{
      setErr('Please provide all field')
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
      
        // console.log({company,name,email:email_id,contact1,password,manager:_id,executive:selectedItems[0],branch:selected4[0],beats:select2,areas:select1,pan,cylinders_security,gstin})
      try{
        setLoading(true)
        const res = await Api.put('users/customer',{id:item._id,company_name,company_contact,customer_name,customer_contact,email,password,branch:selected4[0],distributor:selected5[0],executive:selectedItems[0],area:select1[0],beat:select2[0],manager:_id})
        setLoading(false)
        navigation.navigate('Cust')
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
        setProfile(p)
        setBranch1(res.data.result)
      } catch(e){
        console.log(e.message)
      }
    }
    useEffect(()=> {
      if(count2<2){
        branch1.map((item)=> {
          if(item[role]._id === profile){
              setSale(oldArray => [...oldArray, {name:item.name,_id:item._id}])
          }
      })
      }
      setCount2(count2+1)
    },[branch1])
        
            
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
          const res = await Api.post('master/get_area_from_branch',{branch:selected4})
          
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
        const res = await Api.post('master/get_beat_from_area',{area:select1})
        setBeat1(res.data.result)
      } catch(e){
        console.log(e.message)
      }
    }
    useEffect(() => {
      if(count3<1){
        make()
        check8(selected4)
      }else {
        setSelected5([])
        setSelected1([])
        setSelected2([])
      }
      setCount3(count3+1)
      }, [selected4])
      useEffect(() => {
        if(count5<1){
          make1()
          check9(selected5)
        }else{
          setSelected1([])
          setSelected2([])
        }
        check9(selected5)
        setCount5(count5+1)
      }, [selected5])
    useEffect(() => {
      if(count1<1){
        get1()
        check7(selectedItems)
      }else{
        setSelected4([])
        setSelected5([])
        setSelected1([])
        setSelected2([])
      }
      setCount1(count+1)
      check7(selectedItems)
    }, [selectedItems])
    useEffect(() => {
      if(count4<1){
        get2()
       check10(select1)
      }else{
        setSelected2([])
      }
      check10(select1)
      // check14()
      setCount4(count4+1)
    }, [select1])

    // useEffect(()=> {
      
    //   let bk = item.branch
    //   let ak = item.area
    //   let bek = item.beat
    //   ak.map((item)=> {
    //     setSelected1(oldArray => [...oldArray, item._id]);
    //   })
    //   bek.map((item)=> {
    //     setSelected2(oldArray => [...oldArray, item._id]);
    //   })
    // },[])

    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={magi} />
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)',paddingBottom:60}}>
          <Header title="EDIT CUSTOMER" back="Cust" />
          <View style={{paddingBottom:60}}>
            <ScrollView>
              <Image
              style={styles.image}
              source={require('../../assets/profile.png')}
              />
              {/* <Icons name="pencil-circle" size={26}  style={{  position:'absolute',right:150, borderRadius:60,overflow:'hidden', color:'rgb(255,204,102)'}} /> */}
              <View style={{padding:20}}>
                <View  style={{marginBottom:10}}>
              <TextInput
              value={company_name}
              
              label='Company'
              mode='outlined'
              style={styles.input}
              onChangeText={(text)=> validateName1(text)}
              onEndEditing= {(t)=> validateName1(t.nativeEvent.text)}
              />
              {cn?<Text style={{color:'red'}}>Please provide valid company name</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={company_contact}
              onChangeText={(text)=> setContact(text)}
              label='Company contact'
              mode='outlined'
                style={styles.input}
                onChangeText= {(text)=> phonevalidation1(text) }
                onEndEditing = {(text)=> phonevalidation1(text.nativeEvent.text)}
              />
              {cc?<Text style={{color:'red'}}>Please provide a valid company contact</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={customer_name}
              label='Customer name'
              mode='outlined'
              style={styles.input}
              onChangeText={(text)=> validateName(text)}
              onEndEditing= {(t)=> validateName(t.nativeEvent.text)}
              />
              {n?<Text style={{color:'red'}}>Please provide valid customer name</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={email}
              onChangeText={(text)=> emi(text)}
              onEndEditing= {(t)=> emi(t.nativeEvent.text)}
              label='Customer email'
              mode='outlined'
                style={styles.input}
              />
              {em?<Text style={{color:'red'}}>Please provide valid email</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={customer_contact}
              onChangeText={(text)=> setContact1(text)}
              label='Customer contact'
              mode='outlined'
                style={styles.input}
                onChangeText= {(text)=> phonevalidation(text) }
                onEndEditing = {(text)=> phonevalidation(text.nativeEvent.text)}
              />
              {c?<Text style={{color:'red'}}>Please provide a valid customer contact</Text>: null}
              </View>
              
              <View style={{marginBottom:10}}>
              <TextInput
              value={password}
              onChangeText={(text)=> setPassword(text)}
              label='Password'
              mode='outlined'
                style={styles.input}
                onEndEditing = {(text)=> passwordvalid(text.nativeEvent.text)}
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
              <Text style={styles.text1}>Sales executive</Text>
              <ScrollView>
              <MultiSelect
                    hideTags={false}
                    single={true}
                    items={sale}
                    uniqueKey="_id"
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Select sales exective"
                    searchInputPlaceholderText="Search executive..."
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#2e3092"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC'}}
                    submitButtonColor="#2e3092"
                    submitButtonText="Add"
                    onEndEditing= {(t)=> check7(t.nativeEvent.text)}
                    styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
                  />  
               </ScrollView>
               {sn?<Text style={{color:'red'}}>Please provide sales executive</Text>: null}
              
              
              </View>
              <View style={{padding:5}}>
              <Text style={styles.text1}>Branch</Text>
              <ScrollView>
              <MultiSelect
                    hideTags={false}
                    single={true}
                    items={help}
                    uniqueKey="_id"
                    onSelectedItemsChange={onSelectedItemsChange4}
                    selectedItems={selected4}
                    selectText="Select branch"
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
                    submitButtonText="Add"
                    styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
                  />  
               </ScrollView>
        
               {s4?<Text style={{color:'red'}}>Please provide branch</Text>: null}
              
              </View>
              <View style={{padding:5}}>
              <Text style={styles.text1}>Distributor</Text>
              <ScrollView>
              <MultiSelect
                    hideTags={false}
                    single={true}
                    items={mod}
                    uniqueKey="_id"
                    onSelectedItemsChange={onSelectedItemsChange5}
                    selectedItems={selected5}
                    selectText="Select distribtor"
                    searchInputPlaceholderText="Search distributor..."
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC'}}
                    submitButtonColor="#2e3092"
                    submitButtonText="Add"
                    styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
                  />  
                  </ScrollView>
               {s5?<Text style={{color:'red'}}>Please provide distributor</Text>: null}
        
              
              
              </View>
              <View style={{padding:5}}>
              <Text style={styles.text1}>Area</Text>
              <ScrollView>
              <MultiSelect
          hideTags
          single={true}
          items={area1}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange1}
          selectedItems={select1}
          selectText="Select area"
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
          submitButtonText="Add"
          styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
        />
        </ScrollView>
        {s1?<Text style={{color:'red'}}>Please provide area</Text>: null}
              </View>
              <View style={{padding:5}}>
              <Text style={styles.text1}>Beat</Text>
              <ScrollView>
              <MultiSelect
                hideTags
                single={true}
                items={beat1}
                uniqueKey="_id"
                onSelectedItemsChange={onSelectedItemsChange2}
                selectedItems={select2}
                selectText="Select beat"
                searchInputPlaceholderText="Search beat..."
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
                submitButtonText="Add"
                styleListContainer={{backgroundColor:'white'}}
          hideDropdown={true}
          selectedItemTextColor="#2e3092"
          hideSubmitButton={true}
              />
              </ScrollView>
              {/* {s2?<Text style={{textAlign:'center', color:'red'}}>Please provide beat</Text>: null} */}
              </View>
              {err?<Text style={{color:'red', marginTop:5}}>Please provide All Field</Text>: null}
              
              </View>
              </ScrollView>
          </View>
          {loading? <TouchableOpacity style={styles.button}  >
                <Text style={styles.buttonText}>Processing...</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=>check()} >
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
      color:'white',
      fontWeight:'bold'
  },
})

export default EditCustScreen
