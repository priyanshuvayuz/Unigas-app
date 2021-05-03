import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Button, TouchableOpacity, StatusBar } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import Iconz from 'react-native-vector-icons/Feather'
import Iconn from 'react-native-vector-icons/FontAwesome'
import Iconnn from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header'
import Api from '../../api/Api'
import { Context as AuthContext } from '../../context/AuthContext'
import moment from "moment";
const ViewOrder = ({ navigation }) => {
  const { state } = useContext(AuthContext)

  const item = navigation.getParam('item')
  const [d, setDate] = useState("")
  useEffect(() => {
    let a = item.createdAt
    let c = moment(a).calendar();
    setDate(c)
  }, [])
  return (
    <>
      <StatusBar backgroundColor="#2e3092" barStyle="light-content" />

      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 5 }}>
        <Header title="VIEW ORDER" back="Order" />
        {state.role === 'manager' ? <Iconz name="edit-2" size={20} style={{ color: '#2e3092', position: 'absolute', right: 25, top: 22 }} onPress={() => navigation.navigate('Edit', { item: item })} /> :
          null}
        {state.role === 'executive' ? <Iconz name="edit-2" size={20} style={{ color: '#2e3092', position: 'absolute', right: 25, top: 22 }} onPress={() => navigation.navigate('Edit1', { item: item })} /> : null}
        {state.role === 'distributor' ? <Iconz name="edit-2" size={20} style={{ color: '#2e3092', position: 'absolute', right: 25, top: 22 }} onPress={() => navigation.navigate('Edit2', { item: item })} /> : null}


        <View style={{ paddingBottom: 70 }}>
          <ScrollView>
            {/* <Image
              style={styles.image}
              source={require('../../assets/profile.png')}
              /> */}
            <View>
              <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>#{item.order_id}</Text>
              <Text></Text>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{d}</Text>
                <Icons name='date-range' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.status}</Text>
                <Icons name='delivery-dining' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.location}</Text>
                <Icon name='md-location-outline' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>Customer Name: {item.customer.customer_name}</Text>
                <Iconz name='users' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.customer.company_name}</Text>
                <Iconn name='building-o' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.executive.name}</Text>
                <Iconnn name='account-tie' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.manager.name}</Text>
                <Icon name='man' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.branch.branch}</Text>
                <Icon name='git-branch' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.filled_cylinders}</Text>
                <Icon name='color-fill-outline' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.empty_cylinders}</Text>
                <Iconnn name='delete-empty-outline' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.amount}</Text>
                <Iconn name='rupee' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <View style={styles.card1}>
                {item.payment_status === 'Paid' ? <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}><Text style={{ color: 'green' }}> {item.payment_status}</Text></Text> : <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}><Text style={{ color: 'red' }}> {item.payment_status}</Text></Text>}
                <Icons name='payment' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, paddingVertical: 15, }}>Dispatch Details:</Text>
              {
                item.dispatch
                  ? <>
                    <View style={styles.card1}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.dispatch ? item.dispatch.vechile_no : null}</Text>
                      <Iconn name='car' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
                    </View>
                    <View style={styles.card1}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6' }}>{item.dispatch ? item.dispatch.driver_name : null}</Text>
                      <Iconn name='user' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
                    </View>
                  </>
                  : null
              }




            </View>

          </ScrollView>

        </View>

        {/* <Button
              title="Click"
              onPress={()=> ok()}
              /> */}
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  card: {
    padding: 10,
    paddingTop: 0,
    marginBottom: 20
  },
  image: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderRadius: 60
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 5,
    fontSize: 14,
    marginBottom: 20,
    borderBottomWidth: 1,
    color: 'black',
  },
  text1: {
    fontSize: 14,
    color: 'rgb(213,213,213)',
    marginBottom: 3,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue'
  },
  button: {
    position: 'absolute',
    left: 20,
    height: 60,
    borderRadius: 20,
    width: '40%',
    backgroundColor: 'rgb(255,204,102)',
    bottom: 20
  },
  button1: {
    position: 'absolute',
    alignSelf: 'center',
    right: 20,
    height: 60,
    borderRadius: 20,
    width: '40%',
    backgroundColor: 'rgb(255,204,102)',
    bottom: 20
  },
  buttonText: {
    fontSize: 17,
    alignSelf: 'center',
    padding: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  card1: {
    width: '100%',
    padding: 10,
    borderTopWidth: 3,
    borderTopColor: 'white'
  }
})


export default ViewOrder
