import React from 'react'
import { View, Text , Image , StyleSheet} from 'react-native'

const SplashScreen = () => {
    return (
        <View style={{position:'absolute',top:200,alignSelf:'center'}}>
            <Image
            source={require('../assets/unigas_logo.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height:100,
        width:100,
        alignContent:'center',
        alignItems:'center'
    }
})

export default SplashScreen
