import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, TextInput, ScrollView, Image } from 'react-native'
import Header from '../../components/Header'
// import {} from 'react-native-paper'
import Api from '../../api/Api'
import Icon from 'react-native-vector-icons/Feather'
const AddFeedback = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [er1, setEr1] = useState(false)
    const [er2, setEr2] = useState(false)
    const [er3, setEr3] = useState(false)


    const validateName = (text) => {
        var passw = /^[a-zA-Z0-9_ ]*$/;
        if (text.match(passw)) {
            setSubject(text)
            setEr1(false)
            return true;
        }
        else {
            setSubject(text)
            setEr1(true)
            return false;
        }
    }

    const validateName1 = (text) => {
        var passw = /^\s*(\w.*)$/;
        if (text.match(passw)) {
            setMessage(text)
            setEr2(false)
            return true;
        }
        else {
            setMessage(text)
            setEr2(true)
            return false;
        }
    }
    // let er1=false
    // let er2 = false
    const check = () => {
        if (subject === '' || message == '') {
            setEr3(true)
        } else {
            setEr3(false)
            add()
        }


        // add()
    }

    const add = async () => {
        if (er1 == false && er2 == false) {
            let a = message
            a = a.trim()
            try {
                setLoading(true)
                const res = await Api.post('feedback', { message: a, subject })
                setLoading(false)
                navigation.navigate('Feed')
                ToastAndroid.show("Thank you for your valuable feedback", ToastAndroid.SHORT);
            } catch (e) {
                setLoading(false)
                console.log(e.message)
            }

        }

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(246,246,246)', paddingBottom: 5 }}>
            {/* <ScrollView style={{position:'absolute'}}> */}
            {/* <Image
            source= {require('../../assets/feedback.png')}
            height={600}
            width={'100%'}
            resizeMode='contain'
            /> */}
            <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10, height: 50, width: 50 }} onPress={() => navigation.navigate('Feed')}>
                <Icon name='arrow-left' size={25} color="#2e3092" />
            </TouchableOpacity>

            <View style={styles.card}>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ margin: 5 }}>Write a subject for feedback</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Subject'
                        // mode='outlined'
                        value={subject}
                        onChangeText={(text) => validateName(text)}
                        onEndEditing={(text) => validateName(text.nativeEvent.text)}
                    />
                    {er1 ? <Text style={{ color: 'red' }}>Please enter valid subject</Text> : null}
                </View>
                <View>
                    <Text style={{ margin: 5 }}>Write a message</Text>
                    <TextInput
                        numberOfLines={5}
                        multiline={true}
                        style={styles.input1}
                        placeholder='Message'
                        // mode='outlined'
                        value={message}
                        onChangeText={(text) => validateName1(text)}
                        onEndEditing={(text) => validateName1(text.nativeEvent.text)}
                    />
                    {er2 ? <Text style={{ color: 'red' }}>Please enter valid message</Text> : null}
                </View>
                {er3 ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 15 }}>Please provide all fields</Text> : null}

                {loading ? <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Processing...</Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={() => check()} >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        marginTop: 200,
        elevation: 5,
        borderWidth: 1,
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingTop: 5
    },
    image: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        borderRadius: 60
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 5,
        fontSize: 14,
        color: 'black',
        elevation: 2,
        alignSelf: 'center'
    },
    input1: {
        width: '95%',
        height: 100,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 5,
        fontSize: 14,
        color: 'black',
        elevation: 2,
        alignSelf: 'center'
    },
    text1: {
        fontSize: 12,
        color: 'black',
        marginBottom: 3,
    },
    button: {
        display: 'flex',
        marginTop: 10,
        width: '95%',
        backgroundColor: '#2e3092',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 17,
        alignSelf: 'center',
        padding: 16,
        color: 'white',
        fontWeight: 'bold'
    },
})

export default AddFeedback
