import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {Camera, CameraType} from 'expo-camera';
import {CameraTypes} from 'expo-camerera/build/Camera.types';

export default function App() {
  const [permisos, setPermisos] = useState(null);
  const [foto, setFoto] = useState(null);
  const [tipoCamara, setTipoCamara] = useState("back");
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(()=>{
    (async ()=>{
      const permisosMediaLibrary = await MediaLibrary.requestPermissionsAsync();
      const permisosCamara = await Camera.requestPermissionsAsync();
      setPermisos(estatus.status === "granted");
      if(!permisosCamara.granted){
        console("Ncesita permisos");
      }
    })();
  }, []);

  if(permisos === null || permisos === "denied"){
    return <Text>No se tienen permisos para la camara</Text>
  }

  const tomarFoto = async() => {
    if(cameraRef){
      try{
        const datosFoto = await cameraRef.takePicture.Async();
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
      <Camera type = {tipoCamara} ref = {ref => setCameraRef(ref)}></Camera>
    ):(<Text>No acceso a la camera</Text>)}
    <Button tittle = "Tomar Foto" onPress = {tomarFoto}></Button>
    <StatusBar style = "auto"/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});