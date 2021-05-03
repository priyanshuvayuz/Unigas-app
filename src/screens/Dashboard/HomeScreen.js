import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TextInput, Button, TouchableOpacity, StatusBar, Picker, Dimensions } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Header from '../../components/Header1'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend } from 'victory-native'
import { DashboardContext } from './DashboardContext'
import CardComp from './CardComp'
import Icon from 'react-native-vector-icons/SimpleLineIcons'



const HomeScreen = ({ navigation }) => {
    const BellIcon = <Icon name="bell" size={20} style={styles.bell} onPress={() => navigation.navigate('Notify')} />;
    return (
        <>
            <ScrollView>
                <StatusBar backgroundColor="#2e3092" barStyle="light-content" />
                <View style={{ flex: 1, backgroundColor: '#f7f7f7', }}>
                    <Header title="Dashboard"
                        secondIcon={BellIcon}
                    />
                    <DashboardContext>
                        <CardComp />
                    </DashboardContext>
                </View>
                <View style={{ padding: 10 }}></View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    bell: {
        position: 'absolute',
        right: 20,
        marginTop: 26,
        color: 'white',
    },
    button: {
        position: 'absolute',
        left: 20,
        height: 60,
        borderRadius: 20,
        width: '25%',
        backgroundColor: '#2e3092',
        top: 10
    },
    button1: {
        position: 'absolute',
        alignSelf: 'center',
        right: 20,
        height: 60,
        borderRadius: 20,
        width: '25%',
        backgroundColor: '#2e3092',
        top: 10
    },
    button2: {
        position: 'absolute',
        alignSelf: 'center',
        right: 145,
        height: 60,
        borderRadius: 20,
        width: '25%',
        backgroundColor: '#2e3092',
        top: 10
    },
    buttonText: {
        fontSize: 17,
        alignSelf: 'center',
        padding: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    card_column: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    card: {
        width: 350,
        height: 180,
        borderRadius: 12,
        backgroundColor: 'whitesmoke',
        elevation: 8,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    },
    cardTxt: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    mainTxt: {
        fontSize: 20,
        fontWeight: '700',
        width: 150
    },
    currently: {

    },
    number: {
        textAlign: 'center',
        fontSize: 70,
    },
    animateCircle: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
})

export default HomeScreen