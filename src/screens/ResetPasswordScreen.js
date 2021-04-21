import React, {useState,useContext} from 'react'
import {Text,View,StyleSheet, Button,TouchableOpacity, StatusBar} from 'react-native'
import {TextInput} from 'react-native-paper'
import Icons from 'react-native-vector-icons/Feather'
import Header from '../components/Header'
import {Context as AuthContext} from '../context/AuthContext'
const ResetPasswordScreen = ({navigation}) => {
    const {state,reset} = useContext(AuthContext)
    const email = navigation.getParam('email')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [view,setView] = useState(true)
    const [view1,setView1] = useState(true)
    const [err,setErr] = useState('')
    const hidden = () => setView(previousState => !previousState)
    const hidden1 = () => setView1(previousState => !previousState)
    // const passwordvalid = (text) => {
    //     var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    //     if(text.match(passw)) 
    //     { 
    //     setErr('')
    //     return true;
    //     }
    //     else
    //     { 
    //       setP(true)
    //     setErr('password should contain 6 character,1 special,1 capital and a number')
    //     return false;
    //     }
    //   }
    const check = (email,password,confirmPassword) => {
        if(password!==confirmPassword){
            return setErr('Password do not match')
        }else{
            setErr('')
            reset({email,password,confirmPassword})
        }
    }
    return(
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
        <Header title="Reset Password" back="Login" />
        <View style={{backgroundColor:'rgb(255,255,255)', flex:1}}>
            <Text style={{fontSize:18, margin:20,marginTop:5, fontWeight:'bold',color:'rgb(163,163,163)'}}>Enter new password and confirm</Text>
            <View style={styles.type}>
            <TextInput
            value={password}
            onChangeText={(text)=>setPassword(text)}
            // onEndEditing = {(text)=> passwordvalid(text.nativeEvent.text)}
            secureTextEntry={view1}
            label='New password'
            mode='outlined'
            style={styles.input}
            />
            <Text style={styles.text1}>CONFIRM PASSWORD</Text>
            <TextInput
            value={confirmPassword}
            onChangeText={(text)=>setConfirmPassword(text)}
            secureTextEntry={view}
            label='New password'
            mode='outlined'
            style={styles.input}
            />
            
            {view?<Icons name="eye" onPress={hidden1}  size={20} color='black' style={{position:'absolute', right:30, top:50}} />:
             <Icons name="eye-off" onPress={hidden}  size={20} color='black' style={{position:'absolute', right:30, top:50}} />}
            {view?<Icons name="eye" onPress={hidden}  size={20} color='black' style={{position:'absolute', right:30, bottom:50}} />:
             <Icons name="eye-off" onPress={hidden}  size={20} color='black' style={{position:'absolute', right:30, bottom:50}} />}
            {/* <TouchableOpacity style={styles.forgot} onPress={()=> navigation.navigate('Forgot')}>
                <Text style={{fontSize:21,color:'black',fontWeight:'bold'}} >Forgot password?</Text>
            </TouchableOpacity> */}
            </View>
            {state.loader? <TouchableOpacity style={styles.button} onPress={()=>reset({email,password,confirmPassword})}>
                <Text style={styles.buttonText}>Processing...</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=>check(email,password,confirmPassword)}>
                <Text style={styles.buttonText}>Change password</Text>
            </TouchableOpacity> }
            
            {err?<Text style={{textAlign:'center',marginTop:20,color:'red',fontSize:20}}>{err}</Text> : null}
            <Text style={{textAlign:'center',marginTop:20,color:'red',fontSize:20}}>{state.errorMessage1}</Text>
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
        fontSize:16,
        marginBottom:20,
    },
    type: {
        alignSelf:'center',
        width:'100%',
        padding:20,
    },
    text1: {
        fontSize:14,
        color:'rgb(213,213,213)',
        marginBottom:3,
        fontWeight:'bold',
        fontFamily:'Helvetica Neue'
    },
    forgot: {
        position:'absolute',
        right:20,
        fontSize:24,
        bottom:3,
    },
    button: {
        alignSelf:'center',
        marginTop:1,
        height:60,
        borderRadius:20,
        width:'92%',
        backgroundColor:'#2e3092'
    },
    buttonText: {
        fontSize:17,
        alignSelf:'center',
        padding:16,
        color:'#ffffff',
        fontWeight:'bold'
    }
})

export default ResetPasswordScreen