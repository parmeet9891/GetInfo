import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class arrivals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      stn: '',
      wnd : '',
      data : []
    }
  }

  static navigatorStyle = {
    navBarHidden : true
  }

  showResults = () => {
    let {stn, wnd} = this.state;

    if(stn == '') {
      return Alert.alert('Station cant be empty');
    }
    else if(wnd == '') {
      return Alert.alert('Enter the Hour Difference to review trains');
    }
    else {
      this.setState({visible: true});
    return fetch(`https://api.railwayapi.com/v2/arrivals/station/${stn}/hours/${wnd}/apikey/cyufbrt3fi/`)
    .then((response) => response.json())
    .then((responseJson) => {
      return this.getValues(responseJson);
    })
    .catch((error) => {
      this.setState({visible: false});
      console.log(error);
    })
  }
}

  getValues = (response) => {
    if(response.response_code != 200) {
      Alert.alert(
              '',
              'No data for this station',
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
      let {data} = this.state;
      for(let i = 0; i < response.trains.length; i++) {
        data.push(response.trains[i]);
      }
      this.setState({data});
    }
  }

  render() {
    let {stn, wnd, data} = this.state;
    return (
      <View style = {{flex:1, margin: 20}}>

        <Spinner visible={this.state.visible} textContent={"Fetching Data..."} textStyle={{color: '#FFF'}}/>

        <View style = {{flex:0.1, justifyContent : 'flex-start', flexDirection:'row'}}>
          <Image source = {require('./../Images/railway.png')} style = {{width:50, height:50}}/>
          <View style = {{justifyContent:'center', alignItems : 'center', flex:0.8}}>
            <Text style = {{fontWeight:'bold', fontSize: 20}}>Train Arrivals</Text>
          </View>
        </View>

        <View style = {{flex: 0.1, marginTop: 30, flexDirection:'row'}}>
          <View style = {{flex:0.5, alignItems:'center'}}>
            <Text>Station Code</Text>
            <TextInput
              placeholder = "Enter Station Code"
              style = {{width: Dimensions.get('window').width-220, borderWidth:1, height:35, marginTop:10}}
              underlineColorAndroid = "transparent"
              onChangeText = {(stn) => {this.setState({stn})}}/>
          </View>

          <View style = {{flex:0.5, alignItems:'center'}}>
            <Text>Window Per Hour</Text>
            <TextInput
              placeholder = "Time Range"
              keyboardType = "numeric"
              style = {{width: Dimensions.get('window').width-220, borderWidth:1, height:35, marginTop:10}}
              underlineColorAndroid = "transparent"
              onChangeText = {(wnd) => {this.setState({wnd})}}/>
          </View>
        </View>

        <View style = {{flex:0.2, alignItems:'center', justifyContent:'center', marginTop: 17}}>
          <TouchableOpacity onPress = {() => {this.showResults()}} activeOpacity = {0.9} style = {{backgroundColor : '#0099CC', width: Dimensions.get('window').width-250, height:30, alignItems:'center', justifyContent:'center'}}>
            <Text style = {{color : 'white', textAlign:'center'}}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

        <View style = {{flex:0.8}}>
            <View style = {{flex: 0.1, flexDirection:'row', justifyContent:'space-around', borderWidth:1}}>
              <View style = {{flex:0.2, alignItems:'center'}}>
                <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Number</Text>
              </View>
              <View style = {{flex:0.2, alignItems:'center'}}>
                <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Name</Text>
              </View>
              <View style = {{flex:0.2, alignItems:'center'}}>
                <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Schedule Arrival</Text>
              </View>
              <View style = {{flex:0.2, alignItems:'center'}}>
                <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Schedule Departure</Text>
              </View>
              <View style = {{flex:0.2, alignItems:'center'}}>
                <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Delay Arrival</Text>
              </View>
              <View style = {{flex:0.2, alignItems:'center'}}>
                <Text style = {{fontWeight:'bold', fontSize:12, textAlign:'center'}}>Delay Departure</Text>
              </View>
            </View>
            <ScrollView style = {{flex:1}} showsVerticalScrollIndicator = {false}>
            {
              data ? data.map((value,index) => {
                return <View key = {index} style = {{flex:1, marginTop:2}}>
                  <View style = {{flex:1, flexDirection:'row', justifyContent:'space-around', borderWidth:1}}>
                    <View style = {{flex:0.2, alignItems:'center'}}>
                      <Text style = {{textAlign:'center'}}>{value.number}</Text>
                    </View>
                    <View style = {{flex:0.2, alignItems:'center'}}>
                      <Text style = {{textAlign:'center'}}>{value.name}</Text>
                    </View>
                    <View style = {{flex:0.2, alignItems:'center'}}>
                      <Text style = {{textAlign:'center'}}>{value.scharr}</Text>
                    </View>
                    <View style = {{flex:0.2, alignItems:'center'}}>
                      <Text style = {{textAlign:'center'}}>{value.schdep}</Text>
                    </View>
                    <View style = {{flex:0.2, alignItems:'center'}}>
                      <Text style = {{textAlign:'center'}}>{value.delayarr}</Text>
                    </View>
                    <View style = {{flex:0.2, alignItems:'center'}}>
                      <Text style = {{textAlign:'center'}}>{value.delaydep}</Text>
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
