import React,{useContext,useState} from 'react'
import { View, Text, TouchableOpacity,StyleSheet, StatusBar } from 'react-native'
import Header from '../components/Header'
import {TextInput} from 'react-native-paper'
import {Context as AuthContext} from '../context/AuthContext'
const ForgotScreen = ({navigation}) => {
    const {state,forgot} = useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [eerror,setEerror] = useState(false)
    const check = (email) => {
        email=email.toLowerCase()
        if(email.length<1){
            setEerror(true)
        }else{
            setEerror(false)
            forgot({email})
        }
    }
    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          setEerror(true)
          setEmail(text.trim())
          return false;
        }
        else {
            setEerror(false)
            setEmail(text.trim())
            
        }
      }
    return (
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        <View style={{backgroundColor:'rgb(255,255,255)', flex:1}}>
            <Header back="Login" title="Forgot Password" />
            <Text style={{margin:20,fontSize:18}}>Please enter your email address. You will receive an OTP to create a new password via email</Text>
            <View style={styles.type}>
            <TextInput
            value={email}
            onChangeText={(text)=> validate(text)}
            onEndEditing = {(text)=> validate(text.nativeEvent.text)}
            label="Email"
            mode='outlined'
            style={styles.input}
            />
            {eerror?<Text style={{color:'red',textAlign:'left',left:2}}>Not a valid email!</Text> : null}
            </View>
            
            {state.loader? <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Processing...</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=> check(email)}>
                <Text style={styles.buttonText}>Sumbit</Text>
            </TouchableOpacity>}
            {state.errorMessage1? <View >
                
                <Text style={{textAlign:'center',marginTop:20,color:'red',fontSize:20}}>{state.errorMessage1}</Text>
                </View> : null}
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
        marginBottom:10,
    },
    type: {
        alignSelf:'center',
        width:'100%',
        padding:20,
    },
    text1: {
        fontSize:20,
        color:'rgb(58,57,127)',
        marginBottom:3,
        fontWeight:'bold'
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
        borderRadius:10,
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


export default ForgotScreen
