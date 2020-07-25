import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(){
    super()
    this.state={
      email : "",
      password : ""
    }
  }

  showAlert(errorCode){
    switch(errorCode){
      case 'auth/too-many-requests':
        Alert.alert('To many requests!!! try again later')
        this.setState({
          email:"",
          password : ""
        })
        break
      case 'auth/wrong-password':
        Alert.alert('Please Enter Correct password')
        this.setState({
          password : ""
        })
        break
      default:
        this.setState({
          email:"",
          password : ""
        })
        return Alert.alert('Unprocessable email and password')
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.midContainter1}>
          <Text style={styles.title}>Bedtime Stories</Text>
          <TextInput
              placeholder="firstname.secondname@thirdname.com"
              onChangeText= {(emailText)=>{
                  this.setState({
                      email: emailText
                  })
              }}
              value={this.state.email}
              style={styles.textInput}
              />
          <TextInput
              placeholder="password"
              placeholderTextColor = "#ff78"
              onChangeText= {(passwordText)=>{
                  this.setState({
                      password: passwordText
                  })
              }}
              value={this.state.password}
              style={styles.textInput}
                  secureTextEntry = {true}
              />
        </View>
        <View style={styles.midContainer2}>
          <TouchableOpacity
        style={styles.button}
            onPress = {async()=>{

              var email  = await this.state.email;

              var password = await this.state.password

              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;

                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgba(0,133,255)'
  },
  title:{
    fontWeight:"normal",
    fontSize:43,
    color:'rgba(0,0,0)'
  },
  midContainter1:{
    flex:0.6,
    justifyContent:'center',
    alignItems:'center'
  },
  midContainer2:{
    flex:0.4,
    alignItems:'center'
  },
  textInput : {
    width:"70%",
    height: "8%",
    borderWidth:8,
    borderColor:'rgba(0,0,0)',
    padding:10,
    borderRadius:10
  },
  button:{
    width:"75%",
    height:"11%",
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderColor:'#ffff',
    borderRadius:15
  },
  buttonText:{
    color:'blue',
    fontSize:25
  }
})
