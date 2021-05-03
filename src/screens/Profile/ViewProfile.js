import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper'
import Icons from 'react-native-vector-icons/FontAwesome'
import Header from '../../components/Header1'
import Spinner from '../../components/Spinner';
import AsyncStorage from '@react-native-community/async-storage'




const ViewProfile = ({ navigation }) => {
  const [branche, setBranch] = useState([]);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    id: '',
    branch: '',
    area: [],
    beat: [],
    gstin: '', pan: ''
  });
  const { name, email, phone, id, branch, area, beat, gstin, pan } = data;
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
          const { name, email, contact1, branch, areas, beats, employee_Id, gstin, pan } = el.data.result;
          setData({ name, email, phone: `${contact1}`, branch, area: areas, beat: beats, id: employee_Id, gstin, pan });
          setLoader(false);
        } else if (role === 'manager' || role === 'executive') {
          const { name, email_id, contact_no, employee_id, branches } = el.data.result;
          setBranch(branches);
          setData({ name, email: email_id, phone: `${contact_no}`, id: employee_id });
          setLoader(false);
        }
      });
    }
  };


  useEffect(() => {
    AsyncStorage.getItem('role').then((el) => {
      setRole(el);
    });
    AsyncStorage.getItem('profile').then((el) => {
      setID(el);
      setPic(`https://unigas-backend-dev.herokuapp.com/users/get_image?id=${Id}`);
      getData();
    });
  });

  const EditIcon = <Icons name="edit" size={20} style={styles.Iconedit} onPress={() => navigation.navigate('Edit')} />;



  if (loader) {
    return <Spinner />
  }
  return <>
    <StatusBar backgroundColor="#2e3092" barStyle="light-content" />
    <View style={{ flex: 1, backgroundColor: '#f7f7f7', paddingBottom: 50 }}>
      <Header title="Profile" secondIcon={EditIcon} />
      <ScrollView>
        <View style={styles.image}>
          <Avatar.Image size={150}
            source={{
              uri: pic,
            }}
          />
        </View>
        {
          role && role !== 'distributor' ? <View style={styles.line}>
            <Text style={styles.first}>Id</Text>
            <Text style={styles.second}>#{id}</Text>
          </View> : <>
            <View style={styles.line}>
              <Text style={styles.first}>Gstin</Text>
              <Text style={styles.second}>{gstin}</Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.first}>Pan</Text>
              <Text style={styles.second}>{pan}</Text>
            </View>
          </>
        }
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
        <View style={styles.line}>
          <Text style={styles.arrayLine}>Branch</Text>
          {
            (role && role === 'manager')
              ? <Text style={styles.second}>{branche && branche.length > 0
                ? branche.map((el, i) => {
                  let a = (i < branche.length - 1) ? ', ' : '';
                  return el.branch + a;
                })
                : 'vhv'}</Text>
              : <Text style={styles.second}>{branch && branch.branch}</Text>
          }
        </View>
        {
          (role && role === 'executive' || role === 'distributor')
            ? <>
              <View style={styles.line}>
                <Text style={styles.arrayLine}>Area</Text>
                <Text style={styles.second}>{area && area.length > 0
                  ? area.map((el, i) => {
                    let a = (i < area.length - 1) ? ', ' : '';
                    return el.area + a;
                  })
                  : 'vhv'}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.arrayLine}>Beat</Text>
                <Text style={styles.second}>{beat && beat.length > 0
                  ? beat.map((el, i) => {
                    let a = (i < beat.length - 1) ? ', ' : '';
                    return el.beat + a;
                  })
                  : 'vhv'}</Text>
              </View>
            </>
            : null
        }
      </ScrollView>
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
    position: 'absolute',
    right: 20,
    marginTop: 26,
    color: 'white',
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
    marginBottom: 20,
  },
  first: {
    color: 'gray',
    fontSize: 20,
  },
  arrayLine: {
    color: 'gray',
    fontSize: 20,
    width: '42%',
  },
  second: {
    position: 'absolute',
    right: 5,
    top: 20,
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default ViewProfile;