import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {Camera} from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, Image } from 'react-native';


export default function App() {
  const [permisos, setPermisos] = useState(null);
  const [foto, setFoto] = useState(null);
  const [tipoCamara, setTipoCamara] = useState("back");
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(()=>{
    (async ()=>{
      {/*const permisosMediaLibrary = await MediaLibrary.requestPermissionsAsync();*/}
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermisos(status === 'granted');
    })();
  }, []);

  if(permisos === null || !permisos){
    return <Text>No se tienen permisos para la camara</Text>
  }

  const tomarFoto = async() => {
    if(cameraRef){
      try{
        const datosFoto = await cameraRef.takePictureAsync();
        setFoto(datosFoto.uri);
      }catch(error){
        console.log("error");
      }
    }
  }

  const guardarFoto = async() => {
    if(foto){
      try{
      }catch(error){
        console.log("error");
      }
    }
  }
  return (
    <View style={styles.container}>
      {permisos ? (
      <Camera style = {{height: 400}} type = {tipoCamara} ref = {ref => setCameraRef(ref)}/>
      ):(<Text>No acceso a la camera</Text>)}
      <Button title = "Tomar Foto" onPress = {tomarFoto}/>
      {foto && (
        <Image source = {{uri:foto}} style = {{width:300, height:400}}/>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});