import React, {useState,useContext,useRef} from 'react'
import {Text,View,StyleSheet,TextInput, Button,TouchableOpacity, StatusBar} from 'react-native'
import Icons from 'react-native-vector-icons/Feather'
import Header from '../components/Header'
import {Context as AuthContext} from '../context/AuthContext'
const OtpScreen = ({navigation}) => {
    const email = navigation.getParam('email')
    const pin1 = useRef(null);
    const pin2 = useRef(null);
    const pin3 = useRef(null);
    const pin4 = useRef(null);
    const reff = (a) => {
        a.current.focus();
    }
    const {state,votp} = useContext(AuthContext)
    const [one,setOne] = useState('')
    const [two,setTwo] = useState('')
    const [three,setThree] = useState('')
    const [four,setFour] = useState('')
    const ok = () => {
        const otp = one+two+three+four
        votp({otp,email})
    }
    return(
        <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
        <Header title="Verification" back='Forgot' />
        <View style={{backgroundColor:'rgb(255,255,255)', flex:1}}>
            <Text style={{fontSize:18, margin:20,marginTop:5,marginBottom:0, fontWeight:'bold',color:'rgb(163,163,163)'}}>Enter your OTP code here</Text>
            <View style={styles.type}>
            <TextInput
            ref={pin1}
            value={one}
            onChangeText={(text)=>{
                setOne(text)
                if(!one.length>0){
                    reff(pin2)
                }
            }}
            style={{width:'25%',
            height:48,
            backgroundColor:'rgb(255,255,255)',
            // borderColor:'rgb(255,204,102)',
            borderRadius:5,
            fontSize:25,
            marginBottom:20,
            borderBottomWidth:1,
            textAlign:'center'}}
            keyboardType={'numeric'}
            maxLength={1}
            />
            <TextInput
            ref={pin2}
            value={two}
            onChangeText={(text)=>{
                setTwo(text)
                if(!two.length>0){
                    reff(pin3)
                }
            }}
            style={{width:'25%',
            height:48,
            backgroundColor:'rgb(255,255,255)',
            // borderColor:'rgb(255,204,102)',
            borderRadius:5,
            fontSize:25,
            marginBottom:20,
            borderBottomWidth:1,
            textAlign:'center'}}
            keyboardType={'numeric'}
            maxLength={1}
            
            />
            <TextInput
            ref={pin3}
            value={three}
            onChangeText={(text)=>{
                setThree(text)
                if(!three.length>0){
                    reff(pin4)
                }
            }}
            style={{width:'25%',
            height:48,
            backgroundColor:'rgb(255,255,255)',
            borderRadius:5,
            fontSize:25,
            marginBottom:20,
            borderBottomWidth:1,
            textAlign:'center'}}
            keyboardType={'numeric'}
            maxLength={1}
            />
            <TextInput
            ref={pin4}
            value={four}
            onChangeText={(text)=>setFour(text)}
            style={{width:'25%',
            height:48,
            backgroundColor:'rgb(255,255,255)',
            borderRadius:5,
            fontSize:25,
            marginBottom:20,
            borderBottomWidth:1,
            textAlign:'center'}}
            keyboardType={'numeric'}
            maxLength={1}
            />
             <Text style={{position:'absolute', bottom:5, right:20}}>Didn't receive the OTP?<Text style={{color:'rgb(114,154,203)', fontWeight:'bold'}}> RESEND</Text></Text>
            </View>
           
            {state.loader? <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Processing..</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=>ok()}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>}
            <Text style={{textAlign:'center',marginTop:20,color:'red',fontSize:20}}>{state.errorMessage1}</Text>
            
        </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width:'25%',
        height:48,
        backgroundColor:'rgb(255,255,255)',
        borderRadius:5,
        fontSize:25,
        marginBottom:20,
        borderBottomWidth:1,
        textAlign:'center'
    },
    type: {
        alignSelf:'center',
        width:'100%',
        padding:20,
        flexDirection:'row'
    },
    button: {
        alignSelf:'center',
        marginTop:50,
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

export default OtpScreen