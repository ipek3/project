import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';
import RNQRGenerator from 'rn-qr-generator'
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    RefreshControl
  } from 'react-native';

const App = () => {
  const [qrCode, setQrCode] = useState(null)
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const[refreshing,setRefreshing]=useState(false)
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    },200 )
  }
  return (
    <ImageBackground  style={{flex:1}} source={require('./meritimg.jpeg')}>
    <SafeAreaView style={{flex: 1}}>
    <ScrollView refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
      }>
    <View >
      <View>
      <Image source={require('./logo_merit-3.png')} />
      <View style={{height:35,marginTop:20}}>
      <Text style={styles.text2}>WELCOME</Text>
        </View>  
        <View style={styles.inputdivone}>
        <View/>
       
       </View>
       <View style={styles.inputdivpass}>
        <View />
        <View>
          <Text style={styles.text}>ID</Text>
          <TextInput id="qrid"  style={styles.textInputStyle}
          onChangeText={
           newinputText => setInputText(newinputText)
          }
          defaultValue={inputText}
          placeholder="Enter Your ID"
          placeholderTextColor="#808080"
          value={inputText}/>
        </View>
       </View>
       
       <TouchableOpacity
          style={styles.buttonStyle}
         // onPress={() => setQrvalue(inputText)}
         onPress={() => {
          RNQRGenerator.generate({
            value:inputText,
            height: 120,
            width: 120,
            
           
          }).then((response) => {
            console.log('response', response)
            setQrCode(response.uri)
          })
        }}
          >
          <Text style={styles.buttonTextStyle}>
            Generate QR Code
          </Text>
        </TouchableOpacity>
        {qrCode !== null && <Image source={{ uri: qrCode }} style={{ marginTop: 30, width: 400, height: 400 }} />}
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 0,
    marginLeft: 35,
    marginRight: 35,
    color:'#fff',
    textTransform:"uppercase",
    borderWidth:1,
    borderColor:'white',
    
  },
  buttonStyle: {
    backgroundColor: '#ffbf00',
    borderWidth: 0,
    color: '#ffbf00',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 16,
  },
  qr: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  text: {
    fontWeight: 'bold',
    color:'#ffbf00',
    marginLeft: 35
  },
  text2: {
    fontWeight: 'bold',
    color:'#ffbf00',
    textAlign: 'center',
    fontSize: 20,
  }

});