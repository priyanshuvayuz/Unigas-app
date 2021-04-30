import React from 'react'
import { View, Text,StyleSheet,ScrollView,Location } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const TestGoogle = () => {
    return (
        <View>
            <ScrollView keyboardShouldPersistTaps="always" keyboardShouldPersistTaps={'handled'} style={styles.input}>
 
 <GooglePlacesAutocomplete
 placeholder="Change A Location"
 minLength={2}
 autoFocus={false}
 returnKeyType={'search'}
 keyboardShouldPersistTaps="always"
 listViewDisplayed={false}
 enablePoweredByContainer={false}
 fetchDetails={true}
 renderDescription={row => row.description}
 onPress={(data, details = null) => {
 console.log('data', data);
 console.log('details', details);
 //setLocation(data.description)
 
 }}
 getDefaultValue={() => {
 return '';
 }}
 query={{
 key: 'AIzaSyCUQoLbBsZz1WWOIQKro8Kx8rzZuZyRPyo',
 language: 'en',
 }}
 styles={{
 description: {
 fontWeight: 'bold',
 },
 predefinedPlacesDescription: {
 color: '#1faadb',
 },
 }}
 //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
 currentLocationLabel="Current location"
 nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
 GoogleReverseGeocodingQuery={{
 // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
 }}
 GooglePlacesSearchQuery={{
 // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
 rankby: 'distance',
 }}
 // filterReverseGeocodingByTypes={[
 // 'locality',
 // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
 debounce={200}
//  renderLeftButton={() => <Location
//  style={{ alignSelf: 'center' }}
//  name='location-pin'
//  size={24}
//  color='blue'
//  />}
 
 />
 </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
 
        borderRadius: 40,
        backgroundColor: "white",
        paddingLeft: "5%",
        borderBottomWidth: 0,
        marginLeft: "5%",
        // overflow: 'hidden',
        width: '85%',
        fontFamily: 'quicksand',
        },
})

export default TestGoogle
