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
import CusCamera from "../components/CusCamera"
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cypherText: "",
      dictionary:{
        A:"", B:"", C:"", D:"", E:"", F:"",
        G:"", H:"", I:"", J:"", K:"", L:"",
        M:"", N:"", O:"", P:"", Q:"", R:"",
        S:"", T:"", U:"", V:"", W:"", X:"",
        Y:"", Z:"",
        camera:false,
      }
    };
    this.pressDone = this.pressDone.bind(this);
    this.changeAllTexts = this.changeAllTexts.bind(this);
    this.cameraPress = this.cameraPress.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  cameraPress = () =>{
    const {navigate} = this.props.navigation;
    navigate("Camera",{back:"FrequencyAnalysis"});
  }
  pressDone(text){
    this.setState({cypherText:text,camera:false})
  }
  changeAllTexts = (labelText, newText) => {
    let dictionary = this.state.dictionary;
    dictionary[labelText] = newText;
        this.setState({dictionary});
  }
  componentWillMount(){
    this.setState({cypherText:this.props.navigation.getParam('cameraText', '')},()=>{
      console.log("cypher",this.state.cypherText)
    });
  }
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
    let dictionary = this.state.dictionary;
    let keyIterator = 0;
    console.log("rerendered",dictionary)
    let inputs = this.state.cypherText.toUpperCase().split('').map((letter) => {
      let value = null;
      for(var key in dictionary){
        if(key === letter){
          value = dictionary[key];
          console.log("value",value);
        }
      }
        return <TinyInput key={++keyIterator} letter={letter} value={value} onChangeText={this.changeAllTexts} />
    });
    return(
      <View style={styles.container}>
        <Text>Frequency Analysis</Text>
        <Button onPress={this.cameraPress} title="Use Camera" />
        <TextInput style={styles.input} onChangeText={(cypherText)=>{this.setState({cypherText})}} value={this.state.cypherText} />
        <ScrollView>
          <View style={styles.inputsContainer}>
            { inputs }
          </View>
        </ScrollView>
      </View>
    )
  }
}
