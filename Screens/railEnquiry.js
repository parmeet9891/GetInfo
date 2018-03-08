import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class railEnquiry extends Component {

	static navigatorStyle = {
		navBarHidden : true,
	}

	liveTrain = () => {
		this.props.navigator.push({
			screen : 'liveStatus'
		})
	}

	trainRoute = () => {
		this.props.navigator.push({
			screen : 'route'
		})
	}

	trainBetweenStations = () => {
		this.props.navigator.push({
			screen : 'trainBetweenStations'
		})
	}

	arrivals = () => {
		this.props.navigator.push({
			screen : 'arrivals'
		})
	}

	render() {
		return (
			<View style = {{flex:1, margin: 20}}>
				<View style = {{flex:0.1, justifyContent : 'flex-start', flexDirection:'row'}}>
					<Image source = {require('./../Images/railway.png')} style = {{width:50, height:50}}/>
					<View style = {{justifyContent:'center', alignItems : 'center', flex:0.8}}>
						<Text style = {{fontWeight:'bold', fontSize: 20}}>Train Enquiry System</Text>
					</View>
				</View>

				<View style = {{flex:0.15, marginTop:30, flexDirection:'row'}}>
					<TouchableOpacity onPress = {() => {this.liveTrain()}} activeOpacity = {0.9} style = {{flex:0.5, backgroundColor: '#189AF0', alignItems:'center'}}>
						<Image source = {require('./../Images/search.png')} style = {{width:20, height:20, marginTop:10}}/>
						<Text style = {{marginTop:10, fontSize:15, fontWeight:'bold'}}>Train Live Status</Text>
					</TouchableOpacity>

					<View style = {{flex:0.1}}></View>

					<TouchableOpacity onPress ={() => {this.trainRoute()}} activeOpacity = {0.9} style = {{flex:0.5, backgroundColor: '#189AF0', alignItems:'center'}}>
						<Image source = {require('./../Images/location.png')} style = {{width:20, height:20, marginTop:10}}/>
						<Text style = {{marginTop:10, fontSize:15, fontWeight:'bold'}}>Train Route</Text>
					</TouchableOpacity>
				</View>

				<View style = {{flex:0.15, marginTop:20, flexDirection:'row'}}>
					<TouchableOpacity onPress = {() => {this.trainBetweenStations()}} activeOpacity = {0.9} style = {{flex:0.5, backgroundColor: '#189AF0', alignItems:'center'}}>
						<Image source = {require('./../Images/tbs.png')} style = {{width:30, height:30, marginTop:10}}/>
						<Text style = {{marginTop:10, fontSize:15, fontWeight:'bold'}}>Train Between Stations</Text>
					</TouchableOpacity>

					<View style = {{flex:0.1}}></View>

					<TouchableOpacity onPress = {() => {this.arrivals()}} activeOpacity = {0.9} style = {{flex:0.5, backgroundColor: '#189AF0', alignItems:'center'}}>
						<Image source = {require('./../Images/arrival.png')} style = {{width:40, height:30, marginTop:10}}/>
						<Text style = {{marginTop:10, fontSize:15, fontWeight:'bold'}}>Train Arrival</Text>
					</TouchableOpacity>
				</View>

			</View>
		)
	}
}
