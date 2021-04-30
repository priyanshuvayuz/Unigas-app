import React from 'react'
import { View, Text, TouchableOpacity, TextInput,StyleSheet, StatusBar } from 'react-native'
import Header from '../components/Header'
const ForgotScreen = () => {
    return (
        <>
        <StatusBar backgroundColor="white" barStyle = "dark-content" />
        <View style={{backgroundColor:'rgb(255,255,255)', flex:1}}>
            <Header back="Home" title="Forgot Password" />
            <Text style={{margin:20,fontSize:18}}>Please enter your email address. You will receive an OTP to create a new password via email</Text>
            <View style={styles.type}>
            <TextInput
            placeholder="Enter your email"
            style={styles.input}
            />
            </View>
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
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
        borderBottomWidth:1
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
        backgroundColor:'rgb(255,204,102)'
    },
    buttonText: {
        fontSize:17,
        alignSelf:'center',
        padding:16,
        color:'black',
        fontWeight:'bold'
    }
})


export default ForgotScreen
