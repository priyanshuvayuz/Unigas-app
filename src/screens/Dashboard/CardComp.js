import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { dashboardContext } from './DashboardContext';




const CardComp = () => {
  const { role, executive, id, distributor, customer, order } = useContext(dashboardContext);


  const filters = (filterName) => {
    return filterName.filter((items) => {
      var data;
      if (role === 'manager' && items.manager) {
        data = items.manager._id === id;
      } else if (role === 'executive' && items.executive) {
        data = items.executive._id === id;
      } else if (role === 'distributor' && items.distributor) {
        data = items.distributor._id === id;
      } else {
        data = null;
      }
      return data;
    });
  };

  var filterExecutive = [];
  filterExecutive = filters(executive);

  var filterDistributor = [];
  filterDistributor = filters(distributor);

  var filterCustomer = [];
  filterCustomer = filters(customer);


  const cardFunc = (name, number, color) => {
    return <View style={styles.card}>

      <View style={styles.cardTxt}>
        <Text style={styles.number}>{number.length}</Text>
        <Text style={styles.mainTxt}>{name}</Text>
        <Text style={styles.currently}>Currently</Text>
      </View>


      <View style={styles.animateCircle}>
        <AnimatedCircularProgress
          size={120}
          width={18}
          fill={number.length}
          rotation={0}
          duration={1500}
          tintColor="#2e3092"
          backgroundColor="gainsboro"
        />
      </View>
    </View>
  };



  return <View style={styles.card_column}>
    {role === 'manager'
      ? cardFunc('Total SalesExecutive', filterExecutive, 'skyblue') : null}
    {role === 'manager' || role === 'executive'
      ? cardFunc('Total Distributor', filterDistributor, 'lightgreen') : null}
    {role === 'manager' || role === 'distributor' || role === 'executive'
      ? cardFunc('Total Customer', filterCustomer, 'tomato') : null}
    {cardFunc('Approved Orders', order, '#FFFF00')}
  </View>
}





const styles = StyleSheet.create({
  card_column: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  card: {
    width: 350,
    height: 180,
    borderRadius: 12,
    backgroundColor: 'whitesmoke',
    elevation: 8,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  mainTxt: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
  },
  cardTxt: {
    width: '58%',
    position: 'absolute',
    top: 20,
    left: 15,
  },
  number: {
    fontSize: 70,
    bottom: -10
  },
  animateCircle: {
    position: 'absolute',
    right: 20,
    top: 32
  },
})


export default CardComp;