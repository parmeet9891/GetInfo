import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Navigation } from 'react-native-navigation';

type Props = {};
export default class App extends Component<Props> {

  static navigatorStyle = {
    navBarHidden : true,
  }

  choosePage = () => {
    this.props.navigator.push({
      title : 'Choose Your Category',
      screen : 'chooseCategory'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex:0.1}}>
          <Text style = {{fontSize:20, color : 'white', fontSize:25}}>Welcome to Get Info</Text>
          <Text style = {{textAlign:'center', lineHeight:30}}>Click on button to Get Started</Text>
        </View>
        <TouchableOpacity onPress = {() => {this.choosePage()}} activeOpacity = {0.9} style = {{flex:0.1, marginTop: 20,justifyContent:'center', alignItems:'center', backgroundColor:'white', width:Dimensions.get('window').width-200}}>
          <Text style = {{color : '#0099CC', fontWeight: 'bold'}}>GET INFO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099CC',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color : 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
