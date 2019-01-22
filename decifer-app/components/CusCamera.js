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
// Creates a client
// const client = new vision.ImageAnnotatorClient();

  
export default class CusCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    done: this.props.done
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  snap = async () => {
    if (this.camera) {
      
      const options = { quality: 0.8,
        base64: true,
        skipProcessing: true};
        try{
           const { base64 } = await this.camera.takePictureAsync(options);
           fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDYsPK5ppoOVfjqBBkACtTg88_4klTL1sg", {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "requests":[
                {
                  "image":{
                    "content": base64
                  },
                  "features":[
                    {
                      "type":"TEXT_DETECTION",
                      "maxResults":1
                    }
                  ]
                }
              ]
            })
          }).then(response => response.json()).then(response => {
            let text = response.responses[0].textAnnotations[0].description;
            console.log("text",text)
             this.state.done(text)
          });
        } catch(e){
          console.log("err",e)
          throw e;
        }
        
    }
  };
  render() {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1, justifyContent:"flex-end",alignContent:"flex-end" }}>
            <Camera style={{ flex: 1 }} type={this.state.type} ref={ (ref) => {this.camera = ref}} >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    flex:1
                  }}
                  onPress={this.snap.bind(this)}>
                  <View style={styles.cameraButton} />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
  }
}

const styles = StyleSheet.create({
  cameraButton:{
    borderColor:"#922",
    borderWidth:12,
    backgroundColor:"#fff",
    borderRadius:50,
    width:100,
    height:100,
    marginBottom:10,
    alignSelf:'center'
  }
});
