import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/Feather'
import Iconss from 'react-native-vector-icons/AntDesign'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'




const ViewFeedback = ({ navigation }) => {
  const item = navigation.getParam('item')

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)' }}>
      <TouchableOpacity style={{ position: 'absolute', top: 14, left: 10, height: 50, width: 50 }} onPress={() => navigation.navigate('Feed')}>
        <Icons name='arrow-left' size={25} color="#2e3092" />
      </TouchableOpacity>
      <TouchableOpacity style={{ position: 'absolute', top: 18, right: -10, height: 50, width: 50 }} onPress={() => navigation.navigate('Editf', { item: item })}>
        <FontAwesome name="edit" size={25} color="#2e3092" />
      </TouchableOpacity>

      <View style={{ marginTop: 50, paddingBottom: 65 }}>
        <ScrollView>
          {/* <Image
              style={styles.image}
              source={require('../assets/profile.png')}
              /> */}
          <View>
            {/* <Text style={{fontSize:25,fontWeight:'bold', alignSelf:'center'}}>{item.distributor.name}</Text> */}
            {/* <Text></Text> */}
            <View style={styles.card1}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6', width: '90%' }}>{moment(item.createdAt).format('LL')}</Text>
              <Iconss name='calendar' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
            </View>
            <View style={styles.card1}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6', width: '90%' }}>{item.subject}</Text>
              <Icon name='subject' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
            </View>
            <View style={styles.card1}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6', width: '90%' }}>{item.message}</Text>
              <Iconss name='message1' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
            </View>
            <View style={styles.card1}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#696969', left: 28, borderBottomWidth: 2, padding: 10, borderBottomColor: '#e6e6e6', width: '90%' }}>{item.is_active}</Text>
              <FontAwesome name='hourglass-half' style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', left: 5, top: 13, color: '#696969', backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50 }} />
            </View>

          </View>

        </ScrollView>

      </View>
      <Text></Text>
    </View>
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

export default ViewFeedback
