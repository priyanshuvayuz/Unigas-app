import React,{useState} from 'react'
import { View, Text, Image,StyleSheet,StatusBar} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const Onboardingmap = ({navigation}) => {
    const [ind,setInd] = useState(0)
    return <>
    <StatusBar animated={true} backgroundColor='#2e3092' barStyle='light-content'/>
    {ind===1? <StatusBar animated={true} backgroundColor='#ea0522' barStyle='light-content'/> : null}
    {ind===2? <StatusBar animated={true} backgroundColor='#95cc4a' barStyle='light-content'/> : null}
    
    <Onboarding
            bottomBarHighlight={true}
            controlStatusBar={false}
            titleStyles={{fontFamily:'Mulish-Black',color:'white'}}
            onSkip = {()=>navigation.navigate('Login')}
            onDone = {()=>navigation.navigate('Login')}
            transitionAnimationDuration={200}
            pageIndexCallback={(text)=> {
              setInd(text)
            }}
  pages={[
    {
      backgroundColor: '#2e3092',
      image: <Image style={{width:200,height:200,resizeMode:'contain'}} source={require('../assets/on1.png')} />,
      subtitle:'',
      title: 'Select your preferred Cylinders and book in bulk.',
    },
    {
        backgroundColor: '#ea0522',
        subtitle:'',
        image: <Image style={{width:200,height:200,resizeMode:'contain'}} source={require('../assets/on1.png')} />,
        title: 'Help and support to the doors of the customer by the support team.',
      },
      {
        backgroundColor: '#95cc4a',
        subtitle:'',
        image: <Image style={{width:200,height:200,resizeMode:'contain'}} source={require('../assets/on1.png')} />,
        title: "Track your cylinder's availability and book orders as per it.",
      },
  ]}
/></>
}


const styles = StyleSheet.create({
    image: {
        height:400,
        width:300
    },
    containerStyles: {
      height:100
    }
})
export default Onboardingmap
