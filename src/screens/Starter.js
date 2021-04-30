import React, {useContext, useEffect} from 'react'
import {Context as AuthContext} from '../context/AuthContext'
import SplashScreen from '../components/SplashScreen'
const Starter = () => {
    const {localSignup,delay} = useContext(AuthContext)
    useEffect(()=> {
        setTimeout(() => {
            delay()
            localSignup()
            
        }, 3000);
        
    },[])

    return (
        <SplashScreen />
    )
}

export default Starter