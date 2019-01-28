import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, Permissions } from 'expo';
import { TextInput } from 'react-native-gesture-handler';
// Creates a client
// const client = new vision.ImageAnnotatorClient();

  
export default class CusCamera extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            label: this.props.letter,
            value: this.props.value
        }
        this.onChangeText = this.onChangeText.bind(this);
    }
    onChangeText = text => {
        this.props.onChangeText(this.state.label, text)
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.value != this.props.value){
            console.log("updated child")
            this.setState({value:prevProps.value})
        }
    }
    render() {
        
        let input = <TextInput selectTextOnFocus={true} maxLength={1} style={styles.input} onChangeText={text => this.onChangeText(text)} defaultValue={this.props.value} />
        if(/[!@#$%^&*()~`\-_=+{[\]}|\\:;"'<,>.?/ ]/.test(this.state.label)){
            input = null
        }
        return (
            <View style={styles.container}>
                <Text style={styles.label}>{this.state.label}</Text>
                {input}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        height:48,
        width:20,
        alignContent:"center",
        margin:2,
    },
    input:{
        flex:1,
        fontFamily:"cypher",
        color:"#BF360C",
        backgroundColor:"#eee",
        fontSize:16,
        borderWidth:2,
        borderColor:"#000",
        padding:4,
        
        textAlign:"center"
    },
    label:{
        textAlign:"center",
        fontFamily:"cypher",
        color:"#1A237E",
        backgroundColor:"#fff",
        fontSize:16,
        width:18,
        justifyContent:"center",
        flex:1
    }
});
