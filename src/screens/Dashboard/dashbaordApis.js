const { default: axios } = require("axios")
const url = 'https://unigas-backend-dev.herokuapp.com';

exports.getAllexecutive = async () => {
  return await axios({
    method: 'get',
    url: `${url}/users/salesexecutive`,
  });
}

exports.getAlldistributor = async () => {
  return await axios({
    method: 'get',
    url: `${url}/users/distributor`,
  });
}

exports.getAllcustomer = async () => {
  return await axios({
    method: 'get',
    url: `${url}/users/customer`,
  });
}

exports.getOrders = async () => {
  return await axios({
    method: 'get',
    url: `${url}/order/all_orders`,
  })
}