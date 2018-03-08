import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


// #ED1D24
export default class route extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:  false,
      trainNumber : '',
      path : []
    }
  }

  static navigatorStyle = {
    navBarHidden : true
  }

  showResults = () => {
    let {trainNumber} = this.state;
    this.setState({path : []});
    if(trainNumber == '') {
      return Alert.alert('Train Number is required')
    }
    else {
      this.setState({visible: true});
    return fetch(`https://api.railwayapi.com/v2/route/train/${trainNumber}/apikey/cyufbrt3fi/`)
    .then((response) => response.json())
    .then((responseJson) => {
      return this.getRoutes(responseJson);
    }).catch((error) => {
      console.log(error);
    })
  }
}
  getRoutes = (response) => {

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
    let {path} = this.state;
    for(let i = 0; i < response.route.length; i++) {
      path.push(response.route[i].station.name);
    }
    this.setState({path});
  }
}

  render() {
    let {path} = this.state;
    return (
      <View style = {{flex:1, margin: 20}}>

        <Spinner visible={this.state.visible} textContent={"Fetching Data..."} textStyle={{color: '#FFF'}} />

        <View style = {{flex:0.1, justifyContent : 'flex-start', flexDirection:'row'}}>
          <Image source = {require('./../Images/railway.png')} style = {{width:50, height:50}}/>
          <View style = {{justifyContent:'center', alignItems : 'center', flex:0.8}}>
            <Text style = {{fontWeight:'bold', fontSize: 20}}>Train Route</Text>
          </View>
        </View>

        <View style = {{flex:0.15, marginTop: 30, flexDirection:'row'}}>

          <View style = {{flex:0.7}}>
            <Text>Enter Train Number</Text>
            <TextInput
              placeholder = "Enter Train Number"
              style = {{width: Dimensions.get('window').width-220, borderWidth:1, height:35, marginTop:10}}
              keyboardType = "numeric"
              underlineColorAndroid = "transparent"
              onChangeText = {(trainNumber) => {this.setState({trainNumber})}}/>
          </View>

          <View style = {{flex:0.2, alignItems:'center', justifyContent:'center'}}>
  					<TouchableOpacity onPress = {() => {this.showResults()}} activeOpacity = {0.9} style = {{backgroundColor : '#0099CC', width: Dimensions.get('window').width-250, height:30, alignItems:'center', justifyContent:'center'}}>
  						<Text style = {{color : 'white', textAlign:'center'}}>SUBMIT</Text>
  					</TouchableOpacity>
  				</View>

        </View>

        <View style = {{flex: 0.8}}>
            <View style = {{flex:0.1, flexDirection:'row', justifyContent:'space-around', borderWidth:1}}>
              <Text style = {{fontWeight:'bold', fontSize: 15}}>Sr No</Text>
              <Text style = {{fontWeight: 'bold', fontSize: 15}}>Station Name</Text>
            </View>
       <ScrollView style = {{flex:1}} showsVerticalScrollIndicator = {false}>
          {
            path ? path.map((value,index) => {
              return <View key = {index} style = {{flex:1}}>
                <View style = {{flex:1, flexDirection:'row', justifyContent:'space-around', borderWidth:1}}>
                  <View style = {{flex:0.1, alignItems:'center'}}>
                    <Text style = {{textAlign:'center'}}>{index+1}</Text>
                  </View>
                  <View style = {{flex:0.3, alignItems:'center', justifyContent:'center'}}>
                    <Text>{value}</Text>
                  </View>
                </View>
              </View>
            }) : null
          }
          </ScrollView>
        </View>

      </View>
    )
  }
}
