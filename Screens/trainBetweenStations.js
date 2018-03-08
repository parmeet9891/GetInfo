import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';

export default class trainBetweenStations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      source : '',
      dest : '',
      date : '06-03-2018',
      details: []
    }
  }

  static navigatorStyle = {
      navBarHidden : true,
  }

  showResults = () => {
    let {source, dest, date} = this.state;
    this.setState({details: []});
    if(source == '') {
      return Alert.alert('Source is Required');
    }
    else if(dest == '') {
      return Alert.alert('Destination is Required');
    }
    else {
      this.setState({visible: true});
      return fetch(`https://api.railwayapi.com/v2/between/source/${source}/dest/${dest}/date/${date}/apikey/cyufbrt3fi/`)
      .then((response) => response.json())
      .then((responseJson) => {
        return this.getValues(responseJson);
      })
    .catch((error) => {
      console.log(error);
    })
  }
}

  getValues =(response) => {
    if(response.response_code != 200) {
      Alert.alert(
              '',
              'No data for this train',
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
      let {details} = this.state;
      for(let i = 0; i < response.trains.length; i++) {
        details.push(response.trains[i]);
      }
      this.setState({details});
    }
  }

  render() {
    let {source, dest, date, details} = this.state;
    return (
      <View style = {{flex:1, margin: 20}}>

        <Spinner visible={this.state.visible} textContent={"Fetching Data..."} textStyle={{color: '#FFF'}}/>

        <View style = {{flex:0.1, justifyContent : 'flex-start', flexDirection:'row'}}>
          <Image source = {require('./../Images/railway.png')} style = {{width:50, height:50}}/>
          <View style = {{justifyContent:'center', alignItems : 'center', flex:0.8}}>
            <Text style = {{fontWeight:'bold', fontSize: 20}}>Train Between Stations</Text>
          </View>
        </View>

        <View style = {{flex: 0.15, marginTop: 30, flexDirection:'row'}}>
          <View style = {{flex:0.5, alignItems:'center'}}>
            <Text>Source Station Code</Text>
            <TextInput
              placeholder = "Enter Source"
              style = {{width: Dimensions.get('window').width-220, borderWidth:1, height:35, marginTop:10}}
              underlineColorAndroid = "transparent"
              onChangeText = {(source) => {this.setState({source})}}/>
          </View>

          <View style = {{flex:0.5, alignItems:'center'}}>
            <Text>Destination Station Code</Text>
            <TextInput
              placeholder = "Enter Destination"
              style = {{width: Dimensions.get('window').width-220, borderWidth:1, height:35, marginTop:10}}
              underlineColorAndroid = "transparent"
              onChangeText = {(dest) => {this.setState({dest})}}/>
          </View>
        </View>

        <View style = {{flex:0.15, flexDirection:'row'}}>
          <View style = {{flex:0.7}}>
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

          <View style = {{flex:0.2, alignItems:'center', justifyContent:'center', marginTop: 17}}>
            <TouchableOpacity onPress = {() => {this.showResults()}} activeOpacity = {0.9} style = {{backgroundColor : '#0099CC', width: Dimensions.get('window').width-250, height:30, alignItems:'center', justifyContent:'center'}}>
              <Text style = {{color : 'white', textAlign:'center'}}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

        </View>

          <View style = {{flex:0.6, marginTop:10}}>
              <View style = {{flex: 0.1, flexDirection:'row', justifyContent:'space-around', borderWidth:1}}>
                <View style = {{flex:0.2, alignItems:'center'}}>
                  <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Number</Text>
                </View>
                <View style = {{flex:0.2, alignItems:'center'}}>
                  <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Name</Text>
                </View>
                <View style = {{flex:0.2, alignItems:'center'}}>
                  <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Source Dept Time</Text>
                </View>
                <View style = {{flex:0.2, alignItems:'center'}}>
                  <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Dest Dept Time</Text>
                </View>
                <View style = {{flex:0.2, alignItems:'center'}}>
                  <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Travel Time</Text>
                </View>
              </View>
              <ScrollView style = {{flex:1}} showsVerticalScrollIndicator = {false}>
                {
                  details ? details.map((value, index) => {
                    return <View key = {index} style = {{flex:1, marginTop:2}}>
                        <View style = {{flex:1, flexDirection:'row', justifyContent:'space-around', borderWidth:1}}>
                          <View style = {{flex:0.2, alignItems:'center'}}>
                            <Text style = {{textAlign:'center'}}>{value.number}</Text>
                          </View>
                          <View style = {{flex:0.2, alignItems:'center'}}>
                            <Text style = {{textAlign:'center'}}>{value.name}</Text>
                          </View>
                          <View style = {{flex:0.2, alignItems:'center'}}>
                            <Text style = {{textAlign:'center'}}>{value.src_departure_time}</Text>
                          </View>
                          <View style = {{flex:0.2, alignItems:'center'}}>
                            <Text style = {{textAlign:'center'}}>{value.dest_arrival_time}</Text>
                          </View>
                          <View style = {{flex:0.2, alignItems:'center'}}>
                            <Text style = {{textAlign:'center'}}>{value.travel_time}</Text>
                          </View>
                        </View>
                    </View>
                  })
                  : null
                }
                </ScrollView>
          </View>

      </View>
    )
  }
}
