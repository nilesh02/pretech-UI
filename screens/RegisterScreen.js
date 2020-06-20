import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { ScrollView } from 'react-native-gesture-handler';

export default class RegisterScreen extends Component {

    constructor(props) {
		super(props);
		this.state = { 
        name: '',nameError:'',nameFlag:false,
        email: '',emailError:'',emailFlag:false,
        phoneNumber: '',phoneNumberError:'',phoneNumberFlag:false,
        Password:'',PasswordError:'',PasswordFlag:false,
        ConfirmPassword:'',ConfirmPasswordError:'',ConfirmPasswordFlag:false,
        spinner: false
        };
    }
    
    componentDidMount() {
        this.setState({email: '', Password:'',spinner: false});
    }

    registerUser()
	{
        //validating email address
        const re = /\S+@\S+\.\S+/;
        let flagEmail=false;
        let flagPassword=false;
        let flagConfirmPassword=false;
        let flagName=false;
        let flagPhoneNumber=false;
        this.setState({ spinner: true });

        if(this.state.name !='' && this.state.name.length>=3){
            this.setState({nameError:'',nameFlag:true});
            flagName=true;
        } else{
            this.setState({nameError:'Ooops! We need a valid Name.',nameFlag:false});
        }

		if(!re.test(this.state.email)){
			this.setState({emailError:'Ooops! We need a valid email address.',emailFlag:false});
        } else{
            this.setState({emailError:'',emailFlag:true});
            flagEmail=true;
        }

        if(this.state.phoneNumber.length==10 && this.state.phoneNumber.match(/^\d{10}$/)){
            this.setState({phoneNumberError:'',phoneNumberFlag:true});
            flagPhoneNumber=true;
        } else{
            this.setState({phoneNumberError:'Ooops! We need a valid Phone Number.',phoneNumberFlag:false});
        }

        if(this.state.Password.length>=6 && this.state.Password.length<=15){
            this.setState({PasswordError:'',PasswordFlag:true});
            flagPassword=true;
        } else {
            this.setState({PasswordError:'Password should be between 6 and 15 characters.',PasswordFlag:false});
        }

        if(this.state.Password===this.state.ConfirmPassword){
            this.setState({ConfirmPasswordError:'',ConfirmPasswordFlag:true});
            flagConfirmPassword=true;
        } else {
            this.setState({ConfirmPasswordError:'Password doesn\'t match. Please Retry.',ConfirmPasswordFlag:false});
        }

        // console.log("email - "+this.state.email," Password - "+ this.state.Password, " Confirm-Password- "+this.state.ConfirmPassword);
        
        if(flagEmail===true && flagPassword===true && flagConfirmPassword===true && flagName===true && flagPhoneNumber===true){
            firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.Password)
				.then(() => {
                    let user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: this.state.name+"@@"+this.state.phoneNumber
                      });

                    this.setState({spinner:false,email:'',emailError:'',Password:'',PasswordError:'',ConfirmPassword:'',ConfirmPasswordError:''});
					this.props.navigation.navigate('MainScreen');
				})
				.catch(error => {
                    alert(error);
                    this.setState({ spinner: false });
                });
        } else {
            this.setState({ spinner: false });
        }
    }
    
    render() {
        return (
            <Background>
                <Logo />
                <Header>Create Account</Header>
                <Spinner visible={this.state.spinner} color={theme.colors.spinner} animation="fade"/>
                
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name:name})}
                    errorText={this.state.nameError}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email:email})}
                    errorText={this.state.emailError}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Phone Number"
                    returnKeyType="next"
                    value={this.state.phoneNumber}
                    onChangeText={(phoneNumber) => this.setState({phoneNumber:phoneNumber})}
                    errorText={this.state.phoneNumberError}
                    autoCapitalize="none"
                    keyboardType="numeric"
                />

                <TextInput
                    label="Password"
                    returnKeyType="next"
                    value={this.state.Password}
                    onChangeText={(Password) => this.setState({Password:Password})}
                    errorText={this.state.PasswordError}
                    secureTextEntry
                />

                <TextInput
                    label="Confirm Password"
                    returnKeyType="done"
                    value={this.state.ConfirmPassword}
                    onChangeText={(ConfirmPassword) => this.setState({ConfirmPassword:ConfirmPassword})}
                    errorText={this.state.ConfirmPasswordError}
                    secureTextEntry
                />

                <Button mode="contained" style={styles.button} onPress={this.registerUser.bind(this)}>  
                    Sign Up
                </Button>

                <View style={styles.row}>
                    <Text style={styles.label}>Already have an account? </Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginScreen')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );

    }
}

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});