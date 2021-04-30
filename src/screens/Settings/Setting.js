import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper';
import Header1 from '../../components/Header1';
import { Context } from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';




const Setting = ({ navigation }) => {

  const [check, setCheck] = useState('');
  const { signout } = useContext(Context);
  const [Id, setID] = useState('');
  const [role, setRole] = useState('');
  const [btn, setBtn] = useState('Deactivate account');


  const btntextChnage = (val) => {
    setBtn(val);
  }
  const handleSubmit = () => {
    if (role) {
      console.log(role);
      var data;
      if (role === 'distributor') {
        data = 'updateDistributor'
      } else if (role === 'manager') {
        data = 'salesmanager'
      } else if (role === 'executive') {
        data = 'salesexecutive'
      }
      btntextChnage('Processing...');
      var future = new Date();
      future.setDate(future.getDate() + 30);
      axios({
        method: 'put',
        url: `https://unigas-backend-dev.herokuapp.com/users/${data}`,
        data: {
          id: Id, delete_reason: check,
          is_active: 'InActive', expires_delete: future,
        }
      }).then(() => {
        btntextChnage('Redirecting...');
        signout();
      }).catch(err => {
        console.log(err.response.data);
        btntextChnage('Try Again');
      });
    }
  }


  useEffect(() => {
    AsyncStorage.getItem('role').then((el) => {
      setRole(el);
    });
    AsyncStorage.getItem('profile').then((el) => {
      setID(el);
    });
  }, []);


  return <>
    <StatusBar backgroundColor="#2e3092" barStyle="light-content" />
    <View style={{ flex: 1, backgroundColor: '#f7f7f7', paddingBottom: 50 }}>
      <Header1 title="Setting" />

      <Text style={styles.txt}>Deactivate Account</Text>

      <View style={styles.message}>
        <Text style={styles.txtMessage}>We're Sorry to see you go! Before you go
        please let us Know what happened.</Text>
      </View>

      <View style={styles.radioBtnGrps}>
        <View style={styles.radiobtn}>
          <RadioButton
            value="first"
            status={check === 'not like unigas' ? 'checked' : 'unchecked'}
            onPress={() => setCheck('not like unigas')}
          />
          <Text style={styles.radioTxt}>Not Like Unigas</Text>
        </View>
        <View style={styles.radiobtn}>
          <RadioButton
            value="first"
            status={check === 'service not staisfied' ? 'checked' : 'unchecked'}
            onPress={() => setCheck('service not staisfied')}
          />
          <Text style={styles.radioTxt}>Service Not Staisfied</Text>
        </View>
        <View style={styles.radiobtn}>
          <RadioButton
            value="first"
            status={check === 'reason not listed' ? 'checked' : 'unchecked'}
            onPress={() => setCheck('reason not listed')}
          />
          <Text style={styles.radioTxt}>My Reason Not Listed</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn2} onPress={() => {
          setCheck('');
          navigation.navigate('Home')
        }
        }>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn1} onPress={() => handleSubmit()}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{btn}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
};


const styles = StyleSheet.create({
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  radioBtnGrps: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  radiobtn: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
  },
  radioTxt: {
    paddingHorizontal: 5,
    fontSize: 18,
    marginTop: 7,
  },
  message: {
    display: 'flex',
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 20
  },
  txtMessage: {
    fontSize: 18
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 50,
    padding: 10,
    flexDirection: 'row'
  },
  btn1: {
    backgroundColor: '#2e3092',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btn2: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  }
});


export default Setting;