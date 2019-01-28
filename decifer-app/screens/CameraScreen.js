import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, Permissions } from 'expo';
import { ImageManipulator as IM2 } from 'expo';
import { ImageManipulator } from 'expo-image-crop'
export default class CameraScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        uri: "https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg",
        isVisible: true,
        camera:true
    };
  }
  static navigationOptions = {
    header: null,
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
      const base64 = await IM2.manipulateAsync(uri,[],{base64:true})
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
                "content": base64.base64
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
          this.setState({isVisible:false})
          try{
            let cameraText = response.responses[0].textAnnotations[0].description;
            this.props.navigation.push(this.props.navigation.getParam('back', ''),{cameraText})
          } catch(e){
            this.props.navigation.push(this.props.navigation.getParam('back', ''),{cameraText:"No Text Detected"})
          }
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
           this.setState({uri,isVisible:true,camera:false})
        } catch(e){
          console.log("err",e)
          throw e;
        }
        
    }
  };
  render() {
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
        const { uri, isVisible } = this.state
        const { width, height } = Dimensions.get('window')
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            if(this.state.camera){
                return (
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
                );
            } else {
                return (
                    <ImageManipulator isVisible={this.state.isVisible} onToggleModal={()=>{}} photo={{ uri }} onPictureChoosed={uriM => this.analyzeText(uriM)} />
                );
            }
        }
    }
}
