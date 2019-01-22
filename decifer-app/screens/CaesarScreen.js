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

export default class CaesarScreen extends React.Component {
  constructor(props){
    super(props);
    this.state({
      encryptedText:"",
      decryptedText:""
    });
    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  
  render() {
        return (
          <View>
            <Text>Encrypt</Text>
            <TextInput
              onTextChange={text=>{this.encrypt(text)}} />
            <Text>{this.state.encryptedText}</Text>
            <Text>Decrypt</Text>
            <TextInput
              onTextChange={text=>{this.decrypt(text)}} />
              <Text>{this.state.decryptedText}</Text>
          </View>
        );
  }
}