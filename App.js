import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/Feather'
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconz from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/EvilIcons'
import OrderApproval from './src/screens/OrderApproval/OrderApproval'
import Shimmer from './src/screens/Shimmer'
// import Razorpay from './src/screens/RazorPay'

import HomeScreen from './src/screens/Dashboard/HomeScreen';

import { Provider as AuthProvider } from './src/context/AuthContext'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { setNavigator } from './src/navigationRef'
// import ForgotScreen from './src/screens/ForgotScreen'
import TabBarComponent from './src/components/Tabbar'
import LoginScreen from './src/screens/SiginScreen'
import OrderScreen from './src/screens/Order/OrderScreen'
// import ProfileScreen from './src/screens/ProfileScreen'
import SalesExecutiveScreen from './src/screens/SalesExecutiveScreen'
import Starter from './src/screens/Starter'
import ForgotPassword from './src/screens/ForgotScreen'
import ViewUserScreen from './src/screens/ViewUserScreen'
import OtpScreen from './src/screens/OtpScreen'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import EditUserScreen from './src/screens/EditUserScreen'
import AddUserScreen from './src/screens/AddUserScreen'
import DistScreen from './src/screens/Distributer/DistScreen'
import AddDistScreen from './src/screens/Distributer/AddDistScreen'
import ViewDistScreen from './src/screens/Distributer/ViewDistScreen'
import EditDistScreen from './src/screens/Distributer/EditDistScreen'
import CustScreen from './src/screens/Customer/CustScreen'
import ViewCustScreen from './src/screens/Customer/ViewCustScreen'
import AddCustScreen from './src/screens/Customer/AddCustScreen'
import EditCustScreen from './src/screens/Customer/EditCustScreen'
import ViewOrder from './src/screens/Order/ViewOrder'
import AddOrder from './src/screens/Order/AddOrder'
import EditOrder from './src/screens/Order/EditOrder'
import InventoryScreen from './src/screens/Inventory/InventoryScreen'
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import Drawer from './src/components/Drawer'
import VisitScreen from './src/screens/Visit/VisitScreen'
import ViewOrderApproval from './src/screens/OrderApproval/ViewOrderApproval'
import AddOrder1 from './src/screens/Order/AddOrder1'
import EditOrder1 from './src/screens/Order/EditOrder1'
import { Context as AuthContext } from './src/context/AuthContext'
import Onboarding from './src/screens/Onboarding'
import EditOrderAp from './src/screens/OrderApproval/EditOrderAp'
import AddOrder2 from './src/screens/Order/AddOrder2'
import EditOrder2 from './src/screens/Order/EditOrder2'
import Feedback from './src/screens/Feedback/Feedback'
import AddFeedback from './src/screens/Feedback/AddFeedback'
import ViewFeedback from './src/screens/Feedback/ViewFeedback'
import EditFeedback from './src/screens/Feedback/EditFeedback'
import ViewProfile from './src/screens/Profile/ViewProfile';
import EditProfile from './src/screens/Profile/EditProfile';
import SettingScreen from './src/screens/Settings/Setting';



const loginFlow = createStackNavigator({
  On: Onboarding,
  Login: LoginScreen,
  Forgot: ForgotPassword,
  OTP: OtpScreen,
  Reset: ResetPasswordScreen
  // Log:LoginScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

const homeFlow = createStackNavigator({
  Home: HomeScreen,
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })
homeFlow.navigationOptions = {
  headerShown: false,
}

const feedFlow = createStackNavigator({
  Feed: Feedback,
  Add: AddFeedback,
  Viewf: ViewFeedback,
  Editf: EditFeedback,
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })
feedFlow.navigationOptions = {
  headerShown: false,
}



const visitFlow = createStackNavigator({
  Visit: VisitScreen,
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })
visitFlow.navigationOptions = {
  headerShown: false,
}

const orderFlow = createStackNavigator({
  Order: OrderScreen,
  View: ViewOrder,
  Add: AddOrder,
  Edit: EditOrder,
  Add1: AddOrder1,
  Edit1: EditOrder1,
  Add2: AddOrder2,
  Edit2: EditOrder2
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

orderFlow.navigationOptions = {
  headerShown: false,
}
orderFlow.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};


const profileFlow = createStackNavigator({
  Profile: ViewProfile,
  Edit: EditProfile,
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

profileFlow.navigationOptions = {
  headerShown: false,
  // tabBarIcon: <Iconss name="account" size={24} color="black" />,
  // title:''
}



const salesFlow = createStackNavigator({
  Sales: SalesExecutiveScreen,
  User: ViewUserScreen,
  Add: AddUserScreen,
  Edit: EditUserScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

salesFlow.navigationOptions = {
  headerShown: false,
}
const distFlow = createStackNavigator({
  Dist: DistScreen,
  Add: AddDistScreen,
  View: ViewDistScreen,
  Edit: EditDistScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

distFlow.navigationOptions = {
  headerShown: false
}
const custFlow = createStackNavigator({
  Cust: CustScreen,
  View: ViewCustScreen,
  Add: AddCustScreen,
  Edit: EditCustScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

custFlow.navigationOptions = {
  headerShown: false
}


const inventoryFlow = createStackNavigator({
  Inventory: InventoryScreen
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

inventoryFlow.navigationOptions = {
  headerShown: false
}

const orderAFlow = createStackNavigator({
  Order: OrderApproval,
  View: ViewOrderApproval,
  EditAp: EditOrderAp
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })

orderAFlow.navigationOptions = {
  headerShown: false
}

const settingFlow = createStackNavigator({
  Setting: SettingScreen,
},
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  });

settingFlow.navigationOptions = {
  headerShown: false,
}


const bottomFlow = createBottomTabNavigator({
  homeFlow,
  inventoryFlow,
  orderFlow,
  profileFlow
}, {
  tabBarComponent: (props) => (
    <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
  )
}
)








// const CustomDrawerComponent = (props) => {
//   return (
//   <SafeAreaView style={{flex: 1, marginTop: 20}}>
//     <View style={{height: 150, backgroundColor: 'white', alignContent:'center', alignItems: 'center'}}>
//       <Image  source={require('./src/assets/profile.png')} style={{height: 120, width: 120, borderRadius: 60}} />
//       </View>
//       <ScrollView>
//         <DrawerItems {...props} />
//         {/* <Text style={{fontWeight: 'bold', marginLeft: 16, marginTop: 5}}>Log Out</Text> */}
//       </ScrollView>
//     {/* <Text style={{position: 'absolute',padding: 10, bottom: 0,width: '100%',fontSize: 15, flex: 1, marginBottom:10, alignSelf: 'center', fontWeight: 'bold'}} >VAYUZ TECHNOLOGIES<Text style={{fontSize: 13, fontWeight: 'bold', alignSelf: 'center'}}>{' '}{'\u00A9'}2021</Text></Text> */}

//   </SafeAreaView>
//   )
// }
const drawerNavigator = createDrawerNavigator({

  Dashboard: {
    screen: bottomFlow,
    navigationOptions: {
      drawerIcon: (
        <Iconss name="chart-bar" size={24} style={{ left: 5 }} />
      ),
      title: 'Dashboard',
    },

  },
  SalesExecutive: {
    screen: salesFlow,
    navigationOptions: {
      drawerIcon: (
        <Iconss name="account-tie" size={24} style={{ left: 5 }} />
      ),
      title: 'Sales executive'
    }
  },
  Distributor: {
    screen: distFlow,
    navigationOptions: {
      drawerIcon: (
        <Iconss name="truck-delivery-outline" size={24} style={{ left: 5 }} />
      ),
      title: 'Distributor'
    }
  },
  Customer: {
    screen: custFlow,
    navigationOptions: {
      drawerIcon: (
        <Icons name="users" size={24} style={{ left: 5 }} />
      ),
      title: 'Customer'
    }
  },
  Visit: {
    screen: visitFlow,
    navigationOptions: {
      drawerIcon: (
        <Icon name="map-outline" size={24} style={{ left: 5 }} />
      ),
      title: 'Visits'
    }
  },
  OrderApproval: {
    screen: orderAFlow,
    navigationOptions: {
      drawerIcon: (
        <Iconss name="sticker-check-outline" size={24} style={{ left: 5 }} />
      ),
      title: 'Order approval'
    }
  },
  Feedback: {
    screen: feedFlow,
    navigationOptions: {
      drawerIcon: (
        <Iconss name="sticker-check-outline" size={24} style={{ left: 5 }} />
      ),
      title: 'Feedback'
    }
  },
  Setting: {
    screen: settingFlow,
    navigationOptions: {
      drawerIcon: (
        <Iconss name="cog-outline" size={24} style={{ left: 5 }} />
      ),
      title: 'Setting',
    }
  }


}, {
  contentComponent: Drawer,
  drawerWidth: 320,
}
)

const navigator = createSwitchNavigator({
  Start: Starter,
  loginFlow,
  drawerNavigator,

}, {
  navigationOptions: {
    headerShown: false,
  }
})



const App = createAppContainer(navigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  )
}