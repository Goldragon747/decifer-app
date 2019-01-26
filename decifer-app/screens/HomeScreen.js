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
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    styles = StyleSheet.create({
      container:{
        paddingVertical:40,
        paddingHorizontal:20,
        flex:1,
        flexDirection:"column"
      },
    });
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate('FrequencyAnalysis')}>
          <Text>Frequency Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Caesar')}>
          <Text>Caesar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
