import React, {useState,useEffect,useContext} from 'react'
import {Text,View,StyleSheet,AsyncStorage,Image,ScrollView, Button,TouchableOpacity, StatusBar,Picker} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {TextInput} from 'react-native-paper'
import Header from '../../components/Header'
import Api from '../../api/Api'
import {NavigationEvents} from 'react-navigation'
import MultiSelect from 'react-native-multiple-select';
import Spinner from '../../components/Spinner'
import {Context as AuthContext} from '../../context/AuthContext'

const EditDistScreen = ({navigation}) => {
  const {state} = useContext(AuthContext)
    const item = navigation.getParam('item')
    const [company, setCompany] = useState(item.company)
    const [name,setName] = useState(item.name)
    const [email_id,setEmail_id] = useState(item.email)
    const [contact1,setContact1] = useState(item.contact1.toString())
    const [password,setPassword] = useState('')
    const [gstin,setGstin] = useState(item.gstin)
    const [pan,setPan] = useState(item.pan)
    const [cylinders_security,setCylinder] = useState(item.cylinders_security)
    const [select1,setSelected1] = useState('')
    const [select2,setSelected2] = useState('')
    const [branch1,setBranch1] = useState([])
    const [area1,setArea1] = useState([])
    const [beat1,setBeat1] = useState([])
    const [help,setHelp] = useState([])
    const [selected4,setSelected4] = useState([item.branch._id])
    const [selectedItems,setSelectedItems] = useState([item.executive._id])
    const [selectedBranch,setSelectedBranch] = useState([])
    const [distId,setDistId] = useState('')
    const [sale,setSale] = useState([])
    const [profile,setProfile] = useState('')
    const [_id,setId] = useState('')
    const [salesmanager,setSalesmanager] = useState('')
    const [loading,setLoading] = useState(false)
    const [err,setErr] = useState('')
    const [cn,setCn] = useState(false)
    const [p,setP] = useState(false)
    const [n,setN] = useState(false)
    const [g,setG] = useState(false)
    const [pa,setPa] = useState(false)
    const [em,setEm] = useState(false)
    const [cs,setCs] = useState(false)
    const [c,setC] = useState(false)
    const [s1,setS1] = useState(false)
    const [s2,setS2] = useState(false)
    const [s4,setS4] = useState(false)
    const [sn,setSn] = useState(false)
    const [count1,setCount1] = useState(0)
    const [count2,setCount2] = useState(0)
    const [count3,setCount3] = useState(item.areas.length)
    const [count4,setCount4] = useState(item.beats.length)
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


    useEffect(()=> {
      // let sk = item.
      let bk = item.branches
      let ak = item.areas
      let bek = item.beats
      // bk.map((item)=> {
        
      //   setSelected4(oldArray => [...oldArray, item._id]);
      // })
      ak.map((item)=> {
        setSelected1(oldArray => [...oldArray, item._id]);
      })
      bek.map((item)=> {
        setSelected2(oldArray => [...oldArray, item._id]);
      })
    },[])
    const check = () => {
      if(company===''){
        setCn(true)
      }
    
    // if(password.length<6){
    //   if(password===''){
    //     setP(true)
    //     setErr("Please provide password")
    //   }else if(password.length<6){
    //     setP(true)
    //   setErr("Password should be minimum of 6 character")
    //   }
    // }else{
    //   setP(false)
    // }
    if(name===''){
      setN(true)
     
    }
    if(gstin===''){
      setG(true)
     
    }
    if(pan===''){
      setPa(true)
     
    }
    if(selected4<1){
      setS4(true)
     
    }else{
      setS4(false)
    }
    if(cylinders_security===''){
      setCs(true)
     
    }else{
      setCs(false)
    }
    if(email_id===''){
      setEm(true)
      
    }
    if(contact1===''){
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
    
    if(cn==false && em==false && c==false && p==false && n==false &&  sn==false && s1==false && s2==false && s4==false && pa==false && g==false){
      console.log(cn,em,c,s1,s2,sn,s4,p,pa,g)  
      console.log('working')  
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
  
      const add= async() => {
          // console.log({company,name,email:email_id,contact1,password,manager:_id,executive:selectedItems[0],branch:selected4[0],beats:select2,areas:select1,pan,cylinders_security,gstin})
        try{
          setLoading(true)
          const res = await Api.put('users/updateDistributor',{id:item._id,company,name,email:email_id.toLowerCase(),contact1,password,manager:_id,executive:selectedItems[0],branch:selected4[0],beats:select2,areas:select1,pan,cylinders_security,gstin})
          setLoading(false)
          navigation.navigate('Dist')
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
              if(item[role]._id === profile){
                  setSale(oldArray => [...oldArray, {name:item.name,_id:item._id}])
                  console.log(item.name)
              }
          })
      },[branch1])
          
              
          
      const make = async () => {
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
          
           if(count2<1){
            make()
           }else{
            setSelected1([])
            setSelected2([])
           }
           setCount2(count2+1)
        }, [selected4])
      useEffect(() => {
        
        if(count1<1){
          get1()
        }else{
          setSelected4([])
          setSelected1([])
          setSelected2([])
        }
        setCount1(count1+1)
      }, [selectedItems])
      useEffect(() => {
        get2()
        
      }, [select1])
    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <NavigationEvents onDidFocus={magi} />
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)',paddingBottom:60}}>
          <Header title="EDIT DISTRIBUTOR" back="Dist" />
          <View style={{paddingBottom:60}}>
          <ScrollView>
              <Image
              style={styles.image}
              source={require('../../assets/profile.png')}
              />
              {/* <Icons name="pencil-circle" size={26}  style={{  position:'absolute',right:150, borderRadius:60,overflow:'hidden', color:'rgb(255,204,102)'}} /> */}
              <View style={{padding:20}}>
                <View style={{marginBottom:10}}>
              <TextInput
              value={company}
              onChangeText={(text)=> validateName1(text)}
              onEndEditing = {(text)=> validateName1(text.nativeEvent.text)}
              label='Company name'
              mode='outlined'
                style={styles.input}
              />
              {cn?<Text style={{color:'red'}}>Please provide company name</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={name}
              onChangeText={(text)=> validateName(text)}
              onEndEditing = {(text)=> validateName(text.nativeEvent.text)}
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
              {em?<Text style={{color:'red'}}>Please provide valid email</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
                
              <TextInput
              keyboardType={'numeric'}
              value={contact1}
              onChangeText={(text)=> phonevalidation(text)}
              onEndEditing = {(text)=> phonevalidation(text.nativeEvent.text)}
              label='Phone'
              mode='outlined'
                style={styles.input}
              />
              {c?<Text style={{color:'red'}}>Please provide contact number</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <Text style={styles.text1}>GSTIN NUMBER</Text>
              <TextInput
              value={gstin}
              onChangeText={(text)=> setGstin(text)}
              label='Gstin number'
              mode='outlined'
                style={styles.input}
              />
              {g?<Text style={{color:'red'}}>Please provide valid GST Number</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={pan}
              onChangeText={(text)=> setPan(text)}
              label='Pan number'
              mode='outlined'
                style={styles.input}
              />
              {pa?<Text style={{color:'red'}}>Please provide valid PAN number</Text>: null}
              </View>
              <View style={{marginBottom:10}}>
              <TextInput
              value={cylinders_security}
              onChangeText={(text)=> setCylinder(text)}
              label='Cylinder security'
              mode='outlined'
                style={styles.input}
              />
              {cs?<Text style={{color:'red'}}>Please provide cylinder security</Text>: null}
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
              <Text style={styles.text1}>Sales executive</Text>
              <ScrollView>
              <MultiSelect
                    hideTags={false}
                    single={true}
                    items={sale}
                    uniqueKey="_id"
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Select executive"
                    searchInputPlaceholderText="Search executive..."
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
               {sn?<Text style={{ color:'red'}}>Please provide sales executive</Text>: null}
              
              
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
              <Text style={styles.text1}>Area</Text>
              <ScrollView>
              <MultiSelect
          hideTags
          items={area1}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange1}
          selectedItems={select1}
          selectText="Select branch"
          searchInputPlaceholderText="Search branch..."
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
        {s1?<Text style={{color:'red'}}>Please provide Area</Text>: null}
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
              {s2?<Text style={{color:'red'}}>Please provide Beat</Text>: null}
              </View>
              
              
              </View>
              </ScrollView>
          </View>
          {loading? <TouchableOpacity style={styles.button} onPress={()=> check()} >
                <Text style={styles.buttonText}>Processing...</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=> check()} >
                <Text style={styles.buttonText}>Update</Text>
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

export default EditDistScreen