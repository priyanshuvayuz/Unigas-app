import React, {useState} from 'react'
import {Text,View,StyleSheet,Image,ScrollView,TextInput, Button,TouchableOpacity, StatusBar,Picker,Dimensions} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Feather'
import Header from '../components/Header1'
import {VictoryChart,VictoryGroup, VictoryBar, VictoryLegend} from 'victory-native'
const HomeScreen = ({navigation}) => {
    const [one,setOne] = useState('#2e3092')
    const [two,setTwo] = useState('rgb(242,243,245)')
    const [three,setThree] = useState('rgb(242,243,245)')
    const op = (type) => {
        if(type=="one"){
          setOne('#2e3092')
          setTwo('rgb(242,243,245)')
          setThree('rgb(242,243,245)')
        }else if(type=="two"){
          setOne('rgb(242,243,245)')
          setTwo('#2e3092')
          setThree('rgb(242,243,245)')
        }else if(type=="three"){
          setOne('rgb(242,243,245)')
          setTwo('rgb(242,243,245)')
          setThree('#2e3092')
        }
    }
    const data= {
      planned: [
          {
              x:'W1',
              y:40
          },
          {
              x:'W2',
              y:20
          },
          {
              x:'W3',
              y:70
          },
          {
              x:'W4',
              y:35
          },
          {
              x:'W5',
              y:49
          },
          {
              x:'W6',
              y:66
          },
          {
              x:'W7',
              y:36
          },
          {
              x:'W8',
              y:45
          },

      ],
      actual:[
          {
              x:'W1',
              y:50
          },
          {
              x:'W2',
              y:80
          },
          {
              x:'W3',
              y:45
          },
          {
              x:'W4',
              y:35
          },
          {
              x:'W5',
              y:42
          },
          {
              x:'W6',
              y:39
          },
          {
              x:'W7',
              y:52
          },
          {
              x:'W8',
              y:28
          },
          


      ]
  }
  //op("three")
    return(
      <>
        <StatusBar backgroundColor="#2e3092" barStyle = "light-content" />
        
        <View style={{flex:1,backgroundColor:'#f7f7f7'}}>
          <Header title="Dashboard" />
          
          <View style={{marginTop:10, flex:1,width:'100%', alignSelf:'center'}}>
          {/* <TouchableOpacity style={{position:'absolute',left:20,height:60,borderRadius:20,width:'25%',backgroundColor:one,top:10}} onPress={()=> navigation.navigate('Shimmer')}>
                <Text style={styles.buttonText}>ITEM 1</Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity style={{position:'absolute',left:20,height:60,borderRadius:20,width:'25%',backgroundColor:one,top:10}} onPress={()=> op("one")}>
                <Text style={styles.buttonText}>ITEM 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',
                alignSelf:'center',
                right:20,
                height:60,
                borderRadius:20,
                width:'25%',
                backgroundColor:two,
                top:10}} onPress={()=> op("two")}>
                <Text style={styles.buttonText}>ITEM 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',
                alignSelf:'center',
                right:145,
                height:60,
                borderRadius:20,
                width:'25%',
                backgroundColor:three,
                top:10}} onPress={()=> op('three') }>    
                <Text style={styles.buttonText}>ITEM 3</Text>
            </TouchableOpacity> */}
            {/* <View style={{flex:1, marginTop:150, width:'100%'}}>
            <VictoryChart>
                <VictoryGroup offset={10}>
                    <VictoryBar data={data.actual} style={{data:{
                        fill:'blue'
                    }}}/>

                    <VictoryBar data={data.planned} style={{data:{
                        fill:'orange'
                    }}} />
                </VictoryGroup>
                <VictoryLegend 
                x={Dimensions.get('screen').width/2-100}
                orientation="horizontal"
                gutter={20}
                data={[
                    {
                        name:'Sale1',
                        symbol: {
                            fill:'blue'
                        }
                    },
                    {
                        name:'Sale2',
                        symbol: {
                            fill:'orange'
                        }
                    }
                ]} />
            </VictoryChart>
        </View> */}
          </View>
          
        
        </View>
        
        </>
       
    )
}


const styles = StyleSheet.create({
  
button: {
  position:'absolute',
  left:20,
  height:60,
  borderRadius:20,
  width:'25%',
  backgroundColor:'#2e3092',
  top:10
},
button1: {
position:'absolute',
alignSelf:'center',
right:20,
height:60,
borderRadius:20,
width:'25%',
backgroundColor:'#2e3092',
top:10
},
button2: {
  position:'absolute',
  alignSelf:'center',
  right:145,
  height:60,
  borderRadius:20,
  width:'25%',
  backgroundColor:'#2e3092',
  top:10
  },
buttonText: {
  fontSize:17,
  alignSelf:'center',
  padding:16,
  color:'#ffffff',
  fontWeight:'bold'
},
})

export default HomeScreen