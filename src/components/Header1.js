import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import Icons from 'react-native-vector-icons/SimpleLineIcons'
import {withNavigation} from 'react-navigation'
const Header1 = ({navigation,title, bar, secondIcon}) => {
   
    return (
        <View style={styles.container}>
            <Icons name='menu' size={20} style={styles.menu}  onPress={()=>navigation.openDrawer()}  /> 
            {secondIcon
                ? secondIcon : null}
            {!bar? <Text style={{fontSize:18,fontWeight:'bold', alignSelf:'flex-start',color:'white',left:60,marginTop:23}}>{title}</Text> : null}
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
        backgroundColor:'#2e3092'
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
        color:'white',
    },
    menu1: {
        position:'absolute',
        left:18,
        marginTop:25,
    }
})

export default withNavigation(Header1)
