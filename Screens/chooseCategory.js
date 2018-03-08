import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class chooseCategory extends Component {

	static navigatorStyle = {
		navBarBackgroundColor : '#D01331',
		navBarTextColor : 'white',
	}

	railEnquiry = () => {
		this.props.navigator.push({
			screen : 'railEnquiry'
		})
	}

	render() {
		return (
			<View style = {{flex:1}}>
				<TouchableOpacity onPress = {() => {this.railEnquiry()}} activeOpacity = {0.9} style = {{flex:0.25, justifyContent: 'center', alignItems: 'center', marginTop:30}}>
					<Image source = {require('./../Images/logo.png')} style = {{width:100, height:100}}/>
					<Text style = {{fontWeight:'bold', fontSize:15}}>Train Enquiry</Text>
				</TouchableOpacity>
			</View>
		)
	}
}