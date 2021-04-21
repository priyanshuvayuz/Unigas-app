import { AsyncStorage } from 'react-native'
import Api from '../api/Api'
import {navigate} from '../navigationRef'
import createDataContext from './createDataContext'

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return ({...state, errorMessage: action.payload})
        case 'add_error1':
            return ({...state, errorMessage1: action.payload})
        case 'signin':
            return ({errorMessage: '', role: action.payload.role,name:action.payload.name})
        case 'clear_Error':
            return ({...state, errorMesage: ''})
        case 'signout':
            return ({...state,token: null, errorMessage: ''})
        case 'loader':
            return ({...state,loader:action.payload})
        case 'role':
            return ({...state,role:action.payload})
        case 'mid':
            return ({...state,managerid:action.payload})
        case 'order':
            return ({...state,order:action.payload})
        case 'name':
            return ({...state,name:action.payload})
        default:
            return state
    }
}

const localSignup = (dispatch)=> {
    return async ()=> {
        const token = await AsyncStorage.getItem('token')
        const role = await AsyncStorage.getItem('role')
        const name = await AsyncStorage.getItem('name')
        if(token && role){
            dispatch({type: 'signin', payload: token})
            dispatch({type: 'role',payload: role})
            dispatch({type: 'name',payload: name})
            if(role!== 'manager'){
                const mid = await AsyncStorage.getItem('mid')
                dispatch({type: 'mid',payload: mid})
            }
            navigate('Home')
        } else{
            navigate('On')
        }
    }
}

const delay = (dispatch) => {
    return async({role})=> {
        console.log(role)
        dispatch({type:'role',payload:role})
        navigate('Home')
    }
}

const signin = (dispatch) => {
    return async({email,password}) => {
        try{
            dispatch({type:'loader',payload:true})
            const res = await Api.post('auth/login', {email, password})
            // if(res.data.active === false){
            //     throw new Error('Blocked User')
            // }
            await AsyncStorage.setItem('token',res.data.token)
            await AsyncStorage.setItem('role',res.data.role)
            await AsyncStorage.setItem('profile',res.data._id)
            await AsyncStorage.setItem('name',res.data.name)
            dispatch({type: 'signin',payload: res.data})
            if(res.data.role=== 'executive'){
                await AsyncStorage.setItem('mid',res.data.data.manager)
                dispatch({type:'mid',payload:res.data.data.manager})
            }
            if(res.data.role === 'distributor'){
                await AsyncStorage.setItem('mid',res.data.data.manager)
                await AsyncStorage.setItem('eid',res.data.data.executive)
                await AsyncStorage.setItem('bid',res.data.data.branch)
            }
            
            navigate('Home')
            dispatch({type:'loader',payload:false})
        }catch(err){
            dispatch({type:'loader',payload:false})
            dispatch({type:'add_error', payload: err.response.data.message}) 
            console.log(err.response.data.message) 
        }
    }
}

const orders = () => {
    return async() => {
        try{
            dispatch({type:'loader',payload:true})
            const res = await Api.get('order/all_orders')
            dispatch({type:'order',payload:res.data.orders})
            dispatch({type:'loader',payload:false})
          } catch(e){
            console.log(e.message)
          }
    }
    
}
const forgot = (dispatch) => {
    return async({email})=> {
        try{
            dispatch({type:'loader',payload:true})
            const res = await Api.post('auth/forgot_password',{email})
            dispatch({type:'loader',payload:false})
            dispatch({type:'add_error1',payload:''})
            navigate('OTP',{email})
        } catch(e) {
            dispatch({type:'loader',payload:false})
            dispatch({type:'add_error1',payload:'Not a user!'})
        }
    }
}

const votp = (dispatch) => {
    return async({otp,email})=> {
        try{
            dispatch({type:'loader',payload:true})
            const res = await Api.post('auth/verify_otp',{otp})
            dispatch({type:'loader',payload:false})
            dispatch({type:'add_error1',payload:''})
            navigate('Reset',{email})
        } catch(e) {
            dispatch({type:'loader',payload:false})
            dispatch({type:'add_error1',payload:'Wrong OTP'})
        }
    }
}

const reset = (dispatch) => {
    return async({email,password,confirmPassword})=> {
        try{
            dispatch({type:'loader',payload:true})
            const res = await Api.post('auth/reset_password',{email,password,confirmPassword})
            dispatch({type:'loader',payload:false})
            dispatch({type:'add_error1',payload:''})
            navigate('Login')
        } catch(e) {
            dispatch({type:'loader',payload:false})
            dispatch({type:'add_error1',payload:'Try again!'})
        }
    }
}

const signout = (dispatch) => {
    return async ()=> {
        try{
            const token = await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('mid')
            await AsyncStorage.removeItem('eid')
            await AsyncStorage.removeItem('bid')
            dispatch({type: 'signout'})
            navigate('Login')
            // await AsyncStorage.removeItem('role')
        } catch(e){
            console.log("yha se toh ni aari error",e)
        }
        
    }
}



export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, localSignup, signout, forgot, votp, reset, delay, orders },
    {token: null, errorMessage: '',loader:false,role:'',managerid:'',name:'', errorMessage1: '',otp:'',order:null}
) 