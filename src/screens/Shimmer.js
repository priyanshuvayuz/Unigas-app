import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Shimmer = () => {
    return (
        <View style={{flex:1}}>
        <SkeletonPlaceholder>
            <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',marginTop:'10%' }}>
                <View style={{ width: 75, height: 75, borderRadius: 50, bottom:25 }} />
                <View style={{ marginLeft: 20 }}>
                <View style={{ width: 60, height: 20, borderRadius: 4 }} />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 200, height: 18, borderRadius: 4 }}
                />
                <View
                style={{ marginTop: 6, width: 50, height: 18, borderRadius: 4 }}
                />
            </View>
        </View>
       
        


        </View>
        
        
          </SkeletonPlaceholder> 
         </View>
    )
}

export default Shimmer
