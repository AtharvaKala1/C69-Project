import React from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text,View,TouchableOpacity,Image,StyleSheet} from 'react-native';

export default class ScanScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
        scanned: false,
        scannedData:'',
        buttonState:'normal'
    }
  }

  getCameraPermissions = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  }

  handleBarCodeScanned = async ({text, data})=>{
    const {buttonState} = this.state.buttonState;
    console.log(data);
    if(buttonState==='clicked'){
      this.setState({
        buttonState: 'normal',
        scannedData: data,
        scanned: true
      });
    }
  }


  render() {
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    const scannedData = this.state.scannedData;
    
    if (buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if(buttonState==="normal"){
    return(
      <View style={styles.container}>
          <Image
    source={require("../assets/Barcode-scanner.jpg")}
    style={{width:150, height:150,marginRight:50}}
  />
        <Text style={styles.barCode}>Bar Code Scanner</Text>
        <Text style={styles.displayText}>{
          hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
    }</Text>
     
      <TouchableOpacity 
       onPress={this.getCameraPermissions}
       style={styles.scanButton}
      >
      
        <Text style={styles.buttonText}>Scan Qr Code</Text>
      </TouchableOpacity>
      </View>
    );
  }
  }
 
    
}

const styles = StyleSheet.create({
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 15,
    textAlign: 'center',
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  barCode:{
    fontSize:25,
    fontWeight:'bold'
  }
})