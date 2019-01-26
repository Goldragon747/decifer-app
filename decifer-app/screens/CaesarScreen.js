import React from 'react';
import {
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import CusCamera from '../components/CusCamera'
const inversePairs = [ [1,1] , [3,9] , [7,15] , [5,21] , [11,19] , [17,23] , [25,25] ]
const alphabets = []
export default class CaesarScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      affine:0,
      caesar:0,
      mult:0,
      results:[],
      text: this.props.cameraText ? this.props.cameraText : "",
      camera:false
    };
    this.pressDone = this.pressDone.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  pressDone(text){
    this.setState({text:text,camera:false})
  }
  render() {
    styles = StyleSheet.create({
      container:{
        paddingVertical:40,
        paddingHorizontal:20,
        flex:1,
        flexDirection:"column"
      },
      column:{
        flexDirection:"row",
        justifyContent:"space-between"
      },
      input:{
        height:50,
        fontSize:16,
        elevation:2,
        backgroundColor:"#fff",
        textAlign:"center",
        padding:4
      },
      label:{
        color:"#000",
        fontSize:16
      },
      inputText:{
        height:150,
        marginBottom:15
      },
      camera:{
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        elevation:5,
        display:this.state.camera ? "flex" : "none"
      }
    });
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Text</Text>
        <Button style={{height:500}} title="Camera" onPress={()=>{ this.setState({camera:true}) }} />
        <CusCamera style={styles.camera} done={this.pressDone} />
        <TextInput style={[styles.input,styles.inputText]} multiline={true} value={this.state.text} />

        <View style={styles.column}>
          <View>
            <Text style={styles.label}>Affine Key</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={this.state.affine + ""} />
          </View>
          <View>
            <Text style={styles.label}>Caesar Key</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={this.state.caesar + ""} />
          </View>
          <View>
            <Text style={styles.label}>Multiplicitive Key</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={this.state.mult + ""} />
          </View>
        </View>

        <ScrollView>
          {this.state.results}
        </ScrollView>
      </View>
    );
  }
}