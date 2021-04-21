import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {withNavigation} from 'react-navigation'
import Icons from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Feather'
const Header = ({navigation, back, title}) => {
    return (
        <View style={styles.container}>
            <Icon name='arrow-left' size={25} style={styles.menu} onPress={()=> navigation.navigate(`${back}`)} />
            <Text style={{fontSize:18,fontWeight:'bold', alignSelf:'flex-start',color:'white',left:60,top:20}}>{title}{'  '}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        alignSelf:'center',
        height:45,
        marginTop:15,
        width:150
    },
    container: {
        width:'100%',
        height:70,
        backgroundColor:"white"
    },
    cart: {
        position:'absolute',
        right:10,
        marginTop:18,
        color:'#2d4198'
    },
    bell: {
        position:'absolute',
        right:55,
        marginTop:20,
        color:'#2d4198'
    },
    menu: {
        position:'absolute',
        left:18,
        marginTop:25,
        color:'#2e3092',
    }
})

export default withNavigation(Header)
