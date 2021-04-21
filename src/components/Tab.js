import React,{useState} from 'react'
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/SimpleLineIcons'
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Iconss from 'react-native-vector-icons/Ionicons'

const Tab = ({color, tab, press, Icon,iName,selected, size, hide,bt,wid}) => {
    const [stay1,setStay1] = useState(selected)
    let stay = selected
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={press} >
                <View style={{width:wid}}>
            {/* {stay===tab?<View style={{flexDirection:'row',backgroundColor:"rgb(79,90,166)", borderRadius:15, alignSelf:'center', height:40,padding:2}}><Icon name={iName} size={size} style={{color:"white", padding:5,left:5}}/><Text style={{color:"white", padding:5,fontSize:17}} >{tab}  </Text></View> 
             :<Icon name={iName} size={size} style={{color,left:3}}/> } */}
             {stay===tab? <View style={{}}><Icon name={iName} size={size} style={{color:'#2e3092',left:3}}/><View
  style={{
    borderBottomColor: '#2e3092',
    borderBottomWidth: 5,
    top:10,
    right:bt
  }}
/></View>: <View ><Icon name={iName} size={size} style={{color:'#afafaf',left:3}}/></View>}
            </View>
        </TouchableOpacity>
            
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        bottom:5,
        padding:15,
    }
})

export default Tab
