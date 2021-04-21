import RazorpayCheckout from 'react-native-razorpay';

import React,{useEffect,useContext} from 'react'
import {View,TouchableHighlight,Text} from 'react-native'
import {Context as AuthContext} from '../context/AuthContext'

const Razorpay = ({navigation}) => {
  const {state} = useContext(AuthContext)
    // const name= navigation.getParam('name')
    // const email= navigation.getParam('email')
    // const contact= navigation.getParam('contact')
    // const id= navigation.getParam('id')
    // const amount= navigation.getParam('amount')
    

    const press = () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_rgtycP59I9PavG',
            amount: 1000,
            name: 'Priyanshu',
            order_id: 'order_GgWeZs8FRZRIuq',//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
              email: 'priyanshu@gmail.com',
              contact: '9634832320',
              name: 'Priyanshu'
            },
            theme: {color: '#53a20e'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log(data)
            alert(`Success: ${data.razorpay_payment_id}`);
            navigation.navigate('Home')
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
        }
    useEffect(()=> {
        press()
    },[])
    return (
        <View>
            <TouchableHighlight onPress={press}>
            <Text> </Text>
            </TouchableHighlight>
        </View>
    )
}

export default Razorpay

//Key Id : "rzp_test_rgtycP59I9PavG"
//Key Secret : "ud6SLv93OdBWHXtfXAGgFcyJ"