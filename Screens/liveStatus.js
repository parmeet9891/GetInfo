import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';

const date = new Date();

export default class liveStatus extends Component {

	constructor(props) {
		super(props);
		this.state = {
			trainNumber : '',
			date : '03-03-2018',
      trainName : '',
      number : '',
      position : '',
      currentStation : '',
      code : '',
      time : '',
      visible : false
		}
	}

	static navigatorStyle = {
		navBarHidden : true,
	}

	showResults = () => {
		let {date, trainNumber} = this.state;
		if(trainNumber == '') {
      return Alert.alert('Train Number is required');
		}
		else {
      this.setState({visible: true});
			return fetch(`https://api.railwayapi.com/v2/live/train/${trainNumber}/date/${date}/apikey/cyufbrt3fi/`)
      .then((response) => response.json())
      .then((responseJson) => {
        return this.getValues(responseJson);
      })
      .catch((error) => {
        return this.getError(error);
      })
		}
	}

  getError = (error) => {
    this.setState({visible: false});
    console.log(error);
  }

  getValues = (response) => {
    let {trainName, number, currentStation, position, code, time} = this.state;

    if(response.current_station.name == null) {
      Alert.alert(
              '',
              'No data for this train or date',
              [
                  {
                          text: 'Okay',
                          onPress: () => {
                          this.setState({visible: false});
                  } }
              ],
              { cancelable: false }
          );
    }
    else {
    this.setState({visible: false});
    var pos = response.position;
    var res = pos.substr(0, pos.indexOf('and'));
    var getTime = pos.split("by").pop();
    var res1 = getTime.substr(0, getTime.indexOf('minutes'));
    var delay = Math.round(res1/60);

    this.setState({
      number : response.train.number,
      trainName : response.train.name,
      position : res,
      time: delay,
      currentStation: response.current_station.name,
      code : response.current_station.code,
    })
  }
}

	render() {
		let {date, trainNumber, details, trainName, number, code, currentStation, time, position} = this.state;
		return (
			<View style = {{flex:1, margin:20}}>

      <Spinner visible={this.state.visible} textContent={"Fetching Data..."} textStyle={{color: '#FFF'}} />

				<View style = {{flex:0.1, justifyContent : 'flex-start', flexDirection:'row'}}>
					<Image source = {require('./../Images/railway.png')} style = {{width:50, height:50}}/>
					<View style = {{justifyContent:'center', alignItems : 'center', flex:0.8}}>
						<Text style = {{fontWeight:'bold', fontSize: 20}}>Train Live Status</Text>
					</View>
				</View>

				<View style = {{flex:0.15, marginTop:30, flexDirection:'row'}}>
					<View style = {{flex:0.5, alignItems:'center'}}>
						<Text>Enter Train Number</Text>
						<TextInput
							placeholder = "Enter Train Number"
							style = {{width: Dimensions.get('window').width-220, borderWidth:1, height:35, marginTop:10}}
							keyboardType = "numeric"
							underlineColorAndroid = "transparent"
              onChangeText = {(trainNumber) => {this.setState({trainNumber})}}/>
					</View>

					<View style = {{flex:0.1}}></View>

					<View style = {{flex:0.5, alignItems:'center'}}>
						<Text>Choose Date</Text>
						<DatePicker
					        style={{width: 150}}
					        date={this.state.date}
					        mode="date"
					        placeholder="select date"
					        format="DD-MM-YYYY"
					        minDate="01-01-2018"
					        maxDate="01-10-2018"
					        confirmBtnText="Confirm"
					        cancelBtnText="Cancel"
					        style = {{marginTop: 10}}
					        customStyles={{
					          dateIcon: {
					            position: 'absolute',
					            left: 0,
					            top: 4,
					            marginLeft: 0
					          },
					          dateInput: {
					            marginLeft: 30
					          }
					          // ... You can check the source to find the other keys.
					        }}
					    onDateChange={(date) => {this.setState({date: date})}}/>

					</View>
				</View>

				<View style = {{flex:0.2, alignItems:'center', justifyContent:'center'}}>
					<TouchableOpacity onPress = {() => {this.showResults()}} activeOpacity = {0.9} style = {{backgroundColor : '#0099CC', width: Dimensions.get('window').width-250, height:30, alignItems:'center', justifyContent:'center'}}>
						<Text style = {{color : 'white', textAlign:'center'}}>SUBMIT</Text>
					</TouchableOpacity>
				</View>

				<View style = {{flex:0.7, marginHorizontal: 15}}>

          <View style = {{flex:0.1, alignItems:'center'}}>
            <Text style = {{fontWeight:'bold', fontSize:15}}>Your Search Results:</Text>
          </View>
          <View style = {{flex:0.1, flexDirection:'row', justifyContent:'space-between', backgroundColor:'skyblue', marginHorizontal: 15, alignItems:'center',borderBottomWidth:1}}>
            <Text style = {{fontWeight:'bold'}}>Train Number :</Text>
            <Text style = {{marginRight: 10}}>{number}</Text>
          </View>
          <View style = {{flex:0.1, flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15, alignItems:'center',borderBottomWidth:1}}>
            <Text style = {{fontWeight:'bold'}}>Train Name :</Text>
            <Text>{trainName}</Text>
          </View>
          <View style = {{flex:0.1, flexDirection:'row', justifyContent:'space-between', backgroundColor:'skyblue', marginHorizontal: 15, alignItems:'center',borderBottomWidth:1}}>
            <Text style = {{fontWeight:'bold'}}>Current Station :</Text>
            <Text style = {{marginRight: 10}}>{currentStation}</Text>
          </View>
          <View style = {{flex:0.1, flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15, alignItems:'center',borderBottomWidth:1}}>
            <Text style = {{fontWeight:'bold'}}>Train Position :</Text>
            <Text>{position}</Text>
          </View>
          <View style = {{flex:0.1, flexDirection:'row', justifyContent:'space-between', backgroundColor:'skyblue', marginHorizontal: 15, alignItems:'center',borderBottomWidth:1}}>
            <Text style = {{fontWeight:'bold'}}>Delay (in Hours) :</Text>
            <Text style = {{marginRight: 10}}>{time}</Text>
          </View>

				</View>

			</View>
		)
	}
}
