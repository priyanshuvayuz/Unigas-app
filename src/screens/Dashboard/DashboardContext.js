import React, { createContext, useEffect, useState } from 'react'
import { getAllexecutive, getAlldistributor, getAllcustomer, getOrders } from './dashbaordApis';
import AsyncStorage from '@react-native-community/async-storage';

const dashboardContext = createContext();



const DashboardContext = ({ children }) => {
  const [executive, setExecutive] = useState([]);
  const [distributor, setDistributor] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);
  const [id, setId] = useState();
  const [role, setRole] = useState('');
  const [loader, setLoader] = useState(true);


  const getAllData = () => {
    AsyncStorage.getItem('profile').then((el) => setId(el));
    AsyncStorage.getItem('role').then((el) => setRole(el));
    getAllexecutive().then((el) => {
      if (el.data.result) {
        setLoader(false);
        setExecutive(el.data.result);
      }
    });
    getAlldistributor().then((el) => {
      if (el.data.result) {
        setDistributor(el.data.result);
      }
    });
    getAllcustomer().then((el) => {
      if (el.data.result) {
        setCustomer(el.data.result);
      }
    });
    getOrders().then((el) => {
      if (el.data.orders) {
        setOrder(el.data.orders);
      }
    });
  }


  useEffect(() => {
    getAllData();
  }, []);




  return <dashboardContext.Provider value={{
    executive, distributor, customer, order, id, role, loader, setLoader
  }}>
    {children}
  </dashboardContext.Provider>
}

export { DashboardContext, dashboardContext };
