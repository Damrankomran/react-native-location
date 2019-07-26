import React, {Component} from 'react';
import {Platform, Button, Text, View, PermissionsAndroid,} from 'react-native';

export default class App extends Component{

	state = {
		currentLongitude: 'unknown',//Initial Longitude
    	currentLatitude: 'unknown',//Initial Latitude
	}

	componentDidMount = () => {
		var that =this;
		//Checking for the permission just after component loaded
		if(Platform.OS === 'ios'){
		  this.callLocation(that);
		}else{
		  async function requestLocationPermission() {
			try {
			  const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
				  'title': 'Location Access Required',
				  'message': 'This App needs to Access your location'
				}
			  )
			  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				//To Check, If Permission is granted
				that.callLocation(that);
			  } else {
				alert("Permission Denied");
			  }
			} catch (err) {
			  alert("err",err);
			  console.warn(err)
			}
		  }
		  requestLocationPermission();
		}    
	   }

	   callLocation(that){
		//alert("callLocation Called");
		  navigator.geolocation.getCurrentPosition(
			//Will give you the current location
			 (position) => {
				const currentLongitude = JSON.stringify(position.coords.longitude);
				//getting the Longitude from the location json
				const currentLatitude = JSON.stringify(position.coords.latitude);
				//getting the Latitude from the location json
				that.setState({ currentLongitude:currentLongitude });
				//Setting state Longitude to re re-render the Longitude Text
				that.setState({ currentLatitude:currentLatitude });
				//Setting state Latitude to re re-render the Longitude Text
			 },
			 (error) => alert(error.message),
			 { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		  );
		  that.watchID = navigator.geolocation.watchPosition((position) => {
			//Will give you the location on location change
			  console.log(position);
			  const currentLongitude = JSON.stringify(position.coords.longitude);
			  //getting the Longitude from the location json
			  const currentLatitude = JSON.stringify(position.coords.latitude);
			  //getting the Latitude from the location json
			 that.setState({ currentLongitude:currentLongitude });
			 //Setting state Longitude to re re-render the Longitude Text
			 that.setState({ currentLatitude:currentLatitude });
			 //Setting state Latitude to re re-render the Longitude Text
		  });
	   }

	   componentWillUnmount = () => {
		  navigator.geolocation.clearWatch(this.watchID);
	   }

  	render() {
		return (
			<View style={styles.container}>
				
				<Text style={{justifyContent:'center',alignItems: 'center',marginTop:16, color:'white'}}>
            		Longitude: {this.state.currentLongitude}
          		</Text>
          		<Text style={{justifyContent:'center',alignItems: 'center',marginTop:16, color:'white'}}>
            		Latitude: {this.state.currentLatitude}
          		</Text>
			</View>
		);
  	}
}

const styles ={
	container: {
		flex: 1,
		marginTop:21,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 20,
		color:'white'
	},
};
