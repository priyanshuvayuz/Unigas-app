import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import Header1 from '../../components/Header1';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';



const EditProfile = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    gstin: '', pan: '',
  });
  const [btnTxt, setBtnTxt] = useState('Save');
  const [Id, setID] = useState('');
  const { name, email, phone, gstin, pan } = data;
  const [loader, setLoader] = useState(true);
  const [role, setRole] = useState('');
  const [pic, setPic] = useState('');



  const getData = () => {
    if (role) {
      var data1;
      if (role === 'distributor') {
        data1 = 'distributor'
      } else if (role === 'manager') {
        data1 = 'salesmanager'
      } else if (role === 'executive') {
        data1 = 'salesexecutive'
      }
      axios(`https://unigas-backend-dev.herokuapp.com/users/${data1}?id=${Id}`, {
        method: 'GET',
      }).then((el) => {
        if (role === 'distributor') {
          const { name, email, contact1, gstin, pan } = el.data.result;
          setData({ name, email, phone: `${contact1}`, pan, gstin });
          setLoader(false);
        } else if (role === 'manager' || role === 'executive') {
          const { name, email_id, contact_no } = el.data.result;
          setData({ name, email: email_id, phone: `${contact_no}` });
          setLoader(false);
        }
      }).catch(err => console.log(err.response));
    }
  };
  useEffect(() => {
    if (!email) {
      AsyncStorage.getItem('role').then((el) => {
        setRole(el);
      });
      AsyncStorage.getItem('profile').then((el) => {
        setPic(`https://unigas-backend-dev.herokuapp.com/users/get_image?id=${Id}`);
        setID(el);
        getData();
      });
    }
  });




  const btntextChnage = (param) => {
    setBtnTxt(param);
  }
  const handleSave = () => {
    btntextChnage('Processing...');
    const formData = new FormData();
    formData.append('id', Id);
    formData.append('name', name);
    formData.append('contact_no', `${phone}`);
    formData.append('contact1', `${phone}`);
    formData.append('email', email);
    formData.append('email_id', email);
    formData.append('gstin', gstin);
    formData.append('pan', pan);
    formData.append('profile', { uri: pic, name: 'photo1.png', filename: 'imageName1.png', type: 'image/png' });
    fetch(`https://unigas-backend-dev.herokuapp.com/auth/update_manager`, {
      method: 'put',
      body: formData
    }).then(() => {
      btntextChnage('Redirecting...');
      setTimeout(() => {
        navigation.navigate('Profile');
      }, 2000);
    }).catch((err) => {
      console.log(err.response);
      btntextChnage('Try Again!!!');
    });
  }



  const handlePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setPic(image.path);
    });
  }


  const CameraIcon = <Icons onPress={() => handlePhoto()} size={20} style={styles.Iconedit} name='camera-plus' />


  if (loader) {
    return <Spinner />
  }

  return <ScrollView>
    <StatusBar backgroundColor="#2e3092" barStyle="light-content" />
    <View style={{ flex: 1, backgroundColor: '#f7f7f7', paddingBottom: 50 }}>
      <Header1 title="Edit Profile" secondIcon={CameraIcon} />
      <View style={styles.image}>
        <Avatar.Image size={150}
          source={{
            uri: pic,
          }}
        />
      </View>
      <View style={styles.inputField}>

        {
          role && role === 'distributor' ?
            <>
              <Text style={styles.label}>Gstin</Text>
              <TextInput style={styles.input} placeholder="Enter Gstin"
                value={gstin} onChangeText={(e) => setData({ ...data, gstin: e })} />

              <Text style={styles.label}>Pan</Text>
              <TextInput style={styles.input} placeholder="Enter Pan"
                value={pan} onChangeText={(e) => setData({ ...data, pan: e })} />
            </>
            : null
        }
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter Name"
          value={name} onChangeText={(e) => setData({ ...data, name: e })} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter Email"
          value={email} onChangeText={(e) => setData({ ...data, email: e })} />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} placeholder="Enter Phone"
          value={phone} onChangeText={(e) => setData({ ...data, phone: e })} />
      </View>

      <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => handleSave()}
      >
        <View style={styles.button}>
          <Text style={[styles.textSign, { color: "#fff" }]}>{btnTxt}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </ScrollView>
};





const styles = StyleSheet.create({
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80
  },
  Iconedit: {
    position: 'absolute',
    right: 20,
    marginTop: 26,
    color: 'white',
  },
  inputField: {
    display: 'flex',
    alignSelf: 'center',
    width: '90%',
  },
  label: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
    marginBottom: 20
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#2e3092',
    width: '90%',
  },
  textSign: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default EditProfile;