import React, {useState, useContext,useEffect} from 'react'
import {Text,View,StyleSheet, Button,TouchableOpacity, StatusBar, ScrollView} from 'react-native'
import Icons from 'react-native-vector-icons/Feather'
import {Context as AuthContext} from '../context/AuthContext'
import {TextInput} from 'react-native-paper'
const SigninScreen = ({navigation}) => {
    const {state, signin} = useContext(AuthContext)
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [view,setView] = useState(true)
    const [tick,setTick] = useState(false)
    const [eerror,setEerror] = useState('')
    const [perror,setPerror] = useState('')
    const [abc,setAbc] = useState(false)
    const hidden = () => setView(previousState => !previousState)

    const check = (email,password) => {
        email=email.toLowerCase()
        if(!tick){
            setEerror('Invalid email')
        }else{
            setEerror('')
        }
        if(password.length<6){
            setPerror('Password must contain atleast 6 characters')
            setAbc(false)
        }else {
            setPerror('')
            setAbc(true)
        }
        if(tick && abc){
            signin({email,password})
        }
    }
    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            setTick(false)
            setEmail(text.trim())
          return false;
        }
        else {
            setEmail(text.trim())
            setTick(true)
            setEerror('')
        }
      }
    return(
        <>
        <StatusBar backgroundColor="white" barStyle = "dark-content" />
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
        <View style={{backgroundColor:'rgb(255,255,255)', flex:1 ,padding:15,}}>
            <Text style={{fontSize:35,color:'black', marginTop:45, marginBottom:20,fontFamily:'Mulish-Black'}} >Sign in</Text>
            <View style={{marginTop:50}}>
                <View >
            <TextInput
            value={email}
            mode='outlined'
            autoCapitalize='none'
            onChangeText={(text)=> validate(text)}
            onEndEditing = {(text)=> validate(text.nativeEvent.text)}
            label="Email"
            selectionColor='#2e3092'
            underlineColor='#2e3092'
            style={styles.input}
            right={<TextInput.Icon name={() =>{
                return <View>
                    {tick? <Icons name="check" size={24} color="green" style={{top:8}} /> : null}
                    </View>
                
            } } />}
            />
            </View>
            {eerror?<Text style={{color:'red',textAlign:'left',left:2}}>{eerror}</Text> : null}
            <TextInput
            value={password}
            mode='outlined'
            onChangeText={(text)=> setPassword(text)}
            secureTextEntry={view}
            underlineColor='#2e3092'
            label="Password"
            style={styles.input}
            right={<TextInput.Icon name={() =>{
                return <View>
                    {view? <Icons name="eye" onPress={hidden}  size={20} color='black' style={{top:4}} /> : <Icons name="eye-off" onPress={hidden}  size={20} color='black' style={{top:4}} />}
                    </View>
                
            } } />}
            />
            {perror?<Text style={{color:'red',textAlign:'left',left:2}}>{perror}</Text> : null}
            
            {/* {!perror? <View>{view?<Icons name="eye" onPress={hidden}  size={22} color='black' style={{position:'absolute', right:15, bottom:20}} />:
             <Icons name="eye-off" onPress={hidden}  size={22} color='black' style={{position:'absolute', right:15, bottom:20}} />}</View> : <View>{view?<Icons name="eye" onPress={hidden}  size={22} color='black' style={{position:'absolute', right:15, bottom:38}} />:
             <Icons name="eye-off" onPress={hidden}  size={22} color='black' style={{position:'absolute', right:15, bottom:38}} />}</View>} */}
            </View>
            
            <View >
            <TouchableOpacity style={styles.forgot} onPress={()=> navigation.navigate('Forgot')} keyboardShouldPersistTaps={'handled'}>
                <Text style={{fontSize:14,color:'#333',fontFamily:'Mulish-Regular'}} >Forgot password?{'  '}</Text>
            </TouchableOpacity>
           
            {!state.loader? <TouchableOpacity   style={styles.button}  onPress={()=> check(email,password)}>
                <Text style={styles.buttonText}>Sign in{'  '}</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=> check(email,password)}>
                <Text style={styles.buttonText}>Processing...{'  '}</Text>
            </TouchableOpacity> }
            </View>
            
            {state.errorMessage? <View>
                <Text style={{textAlign:'center',marginTop:20,color:'red',fontSize:20}}>{state.errorMessage}</Text>
                </View> : null}
            
            
        </View>
        
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width:'100%',
        height:48,
        backgroundColor:'rgb(255,255,255)',
        borderRadius:5,
        fontSize:14,
        marginBottom:5,
    },
    type: {
        alignSelf:'center',
        width:'100%',
    },
    text1: {
        fontSize:14,
        color:'#333',
        marginBottom:3,
        fontFamily:'Helvetica Neue',
        marginTop:10,
        fontFamily:'Mulish-Regular'
    },
    forgot: {
        position:'absolute',
        right:0,
        fontSize:24,
        top:3,
    },
    button: {
        alignSelf:'center',
        marginTop:40,
        height:60,
        borderRadius:10,
        width:'100%',
        backgroundColor:'#2e3092'
    },
    buttonText: {
        fontSize:17,
        alignSelf:'center',
        padding:16,
        color:'#ffffff',
        fontFamily:'Mulish-Black'
    },
    button1: {
        alignSelf:'center',
        marginTop:25,
        height:60,
        borderRadius:20,
        width:'100%',
        backgroundColor:'rgb(242,243,245)'
    },
    buttonText1: {
        fontSize:17,
        alignSelf:'center',
        padding:16,
        color:'black',
        fontWeight:'bold'
    }
})

export default SigninScreen