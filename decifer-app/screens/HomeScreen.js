import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {

  };
  render() {
    const {navigate} = this.props.navigation;
      return(
        <View>
          <Button style={{height:500}} title="Caesar" onPress={()=>{ navigate("CameraScreen")} } />
        </View>
      )
  }
}