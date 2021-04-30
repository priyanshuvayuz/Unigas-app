import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Avatar } from 'react-native-paper'
import Icons from 'react-native-vector-icons/Ionicons'
import Header from '../../components/Header1'
import Spinner from '../../components/Spinner';
import AsyncStorage from '@react-native-community/async-storage'



const ViewProfile = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { name, email, phone } = data;
  const [loader, setLoader] = useState(true);
  const [role, setRole] = useState('');
  const [Id, setID] = useState('');
  const [pic, setPic] = useState('');



  const getData = () => {
    if (role) {
      var data;
      if (role === 'distributor') {
        data = 'distributor'
      } else if (role === 'manager') {
        data = 'salesmanager'
      } else if (role === 'executive') {
        data = 'salesexecutive'
      }
      axios(`https://unigas-backend-dev.herokuapp.com/users/${data}?id=${Id}`, {
        method: 'GET'
      }).then((el) => {
        if (role === 'distributor') {
          const { name, email, contact1 } = el.data.result;
          setData({ name, email, phone: `${contact1}` });
          setLoader(false);
        } else if (role === 'manager' || role === 'executive') {
          const { name, email_id, contact_no } = el.data.result;
          setData({ name, email: email_id, phone: `${contact_no}` });
          setLoader(false);
        }
      });
    }
  };



  const getDataFromStorage = async () => {
    AsyncStorage.getItem('role').then((el) => {
      setRole(el);
    });
    AsyncStorage.getItem('profile').then((el) => {
      setID(el);
      setPic(`https://unigas-backend-dev.herokuapp.com/users/get_image?id=${Id}`);
      getData();
    });
  }

  useEffect(() => {
    getDataFromStorage();
  });




  if (loader) {
    return <Spinner />
  }
  return <>
    <StatusBar backgroundColor="#2e3092" barStyle="light-content" />
    <View style={{ flex: 1, backgroundColor: '#f7f7f7', paddingBottom: 50 }}>
      <Header title="Profile" />
      <Icons onPress={() => navigation.navigate('Edit')} style={styles.Iconedit} size={40} name='create' />
      <View style={styles.image}>
        <Avatar.Image size={150}
          source={{
            uri: pic,
          }}
        />
      </View>
      <View style={styles.line}>
        <Text style={styles.first}>Username</Text>
        <Text style={styles.second}>{name}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.first}>Email</Text>
        <Text style={styles.second}>{email}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.first}>Phone</Text>
        <Text style={styles.second}>+91 {phone}</Text>
      </View>
    </View>
  </>
}



const styles = StyleSheet.create({
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80
  },
  Iconedit: {
    color: '#2e3092',
    position: 'absolute',
    top: '20%',
    left: '58.5%',
    zIndex: 1,
  },
  line: {
    padding: 20,
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1.5,
    paddingHorizontal: 0,
    borderColor: 'gray',
    marginBottom: 20
  },
  first: {
    color: 'gray',
    fontSize: 20,
  },
  second: {
    position: 'absolute',
    right: 5,
    top: 20,
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold'
  }
});


export default ViewProfile;