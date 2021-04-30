import React,{useState,useContext} from 'react'
import { View, Text,StyleSheet,TouchableOpacity, AsyncStorage } from 'react-native'
import Tab from './Tab'
import Icon from 'react-native-vector-icons/Foundation'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { NavigationEvents } from 'react-navigation'
import {Context as AuthContext} from '../context/AuthContext'

const TabBarComponent = ({navigation}) => {
    const {state} = useContext(AuthContext)
    const [selected,setSelected] = useState('Home')
    const [selected1,setSelected1] = useState('Home')
    const role = state.role
    console.log('Why undefined man!!! ',state.role)
    
    const name =[
        {
            name:"Home",
            route:'homeFlow',
            Icon:Icon2,
            iconName:"home",
            size:26,
            role:{role},
            dis:false
        },
        {
            name:"Inventory",
            route:'inventoryFlow',
            Icon:Iconss,
            iconName:"bucket-outline",
            size:26,
            role:{role},
            dis:false
        },
        {
            name:"Order",
            route:'orderFlow',
            Icon:Iconss,
            iconName:"cart-outline",
            size:26,
            role:{role},
            dis:true
        },
        {
            name:"Profile",
            route:'profileFlow',
            Icon:Iconss,
            iconName:"account",
            size:26,
            role:{role},
            dis:true
        }
        
        
    ]
    const name1 = [
        {
            name:"Home",
            route:'homeFlow',
            Icon:Icon2,
            iconName:"home",
            size:26,
            role:{role},
            dis:true
        },
        {
            name:"Order",
            route:'orderFlow',
            Icon:Iconss,
            iconName:"cart-outline",
            size:26,
            role:{role},
            dis:true
        },
        {
            name:"Profile",
            route:'profileFlow',
            Icon:Iconss,
            iconName:"account",
            size:26,
            role:{role},
            dis:true
        }
    ]
    const renderColor = (current)=> (current===selected? '#2d4198': 'black')
    const renderColor1 = (current)=> (current===selected1? '#2d4198': 'black')

    const handlePress = (active,route) => {
        setSelected(active)
        navigation.navigate(route)
        
    }
    const handlePress1 = (active,route) => {
        setSelected1(active)
        navigation.navigate(route)
        
    }
    return (
        <View style={styles.wrapper}>
            
          <View style={styles.container}>
              
                    {role==='manager'?
                        
                   name.map((abc)=>{
                        return <Tab
                        tab={abc.name}
                        Icon={abc.Icon}
                        iName={abc.iconName}
                        color={renderColor(abc.name)}
                        selected={selected}
                        press={()=>handlePress(abc.name,abc.route)}
                        size={abc.size}
                        wid={40}
                        bt={3}
                        />
                    
                    
                   })
            : name1.map((abc)=>{
                return <Tab
                tab={abc.name}
                Icon={abc.Icon}
                iName={abc.iconName}
                color={renderColor1(abc.name)}
                selected={selected1}
                press={()=>handlePress1(abc.name,abc.route)}
                size={abc.size}
                wid={60}
                bt={12}
                />
            
            
           }) } 
            </View> 
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        backgroundColor:'white',
        
        height:38,
        padding:2,
        marginBottom:15,
        marginTop:1,
    },
    wrapper: {
        position:'absolute',
        bottom:0,
        alignItems:'center',
        width:'100%',
        justifyContent:'center',
        backgroundColor:'white',
        alignSelf:'center',
    }
})

export default TabBarComponent
