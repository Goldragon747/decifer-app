import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TinyInput from "../components/TinyInput"
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cypherText:'',
    };
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    const styles = StyleSheet.create({
      container:{
        paddingVertical:40,
        paddingHorizontal:20,
        flex:1,
        flexDirection:"column"
      },
      input:{
        height:50,
        fontSize:16,
        elevation:2,
        backgroundColor:"#fff",
        textAlign:"center",
        padding:4
      },
      inputsContainer:{
          flexDirection:"row",
          flexWrap:"wrap",
          justifyContent:"center"
      }
    });
    let key = 0;
    let inputs = this.state.cypherText.toUpperCase().split('').map((letter) => {
        return <TinyInput key={++key} letter={letter} />
    });
    return(
      <View style={styles.container}>
        <Text>Frequency Analysis</Text>
        <TextInput style={styles.input} onChangeText={(cypherText)=>{this.setState({cypherText})}} value={this.state.cypherText} />
        <View style={styles.inputsContainer}>
            { inputs }
        </View>
      </View>
    )
  }
}
