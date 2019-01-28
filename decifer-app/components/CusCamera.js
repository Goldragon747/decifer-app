import React from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, Permissions } from 'expo';
// Creates a client
// const client = new vision.ImageAnnotatorClient();
import { ImageManipulator as IM2 } from 'expo';
import { ImageManipulator } from 'expo-image-crop'
export default class CusCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    done: this.props.done,
    uri: "https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg",
    isVisible:false
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  onToggleModal = () => {
    const { isVisible } = this.state
    this.setState({ isVisible: !isVisible })
  }
  analyzeText = async uri => {
    try{
      const base64 = await IM2.manipulateAsync(uri,null,{base64:true})
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
    }catch(e){
      console.log("err",e)
      throw e;
    }
  }
  snap = async () => {
    if (this.camera) {
      const options = { quality: 0.8,
        base64: true,
        skipProcessing: true};
        try{
           const { uri } = await this.camera.takePictureAsync(options);
           this.setState({uri,isVisible:true})
        } catch(e){
          console.log("err",e)
          throw e;
        }
        
    }
  };
  render() {
      const { width, height } = Dimensions.get('window')
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1, justifyContent:"flex-end",alignContent:"flex-end" }}>
            <ImageBackground
                resizeMode="contain"
                style={{
                    justifyContent: 'center', padding: 20, alignItems: 'center', backgroundColor: 'black',
                }}
                source={this.state.uri}
            ></ImageBackground>
            <ImageManipulator
                photo={this.state.uri}
                isVisible={this.state.isVisible}
                onPictureChoosed={uriM => analyzeText(uriM)}
                onToggleModal={this.onToggleModal}
            />
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
