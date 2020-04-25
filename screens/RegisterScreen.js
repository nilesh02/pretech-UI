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

export default class RegisterScreen extends Component {

    constructor(props) {
		super(props);
		this.state = { 
		email: '',emailError:'',emailFlag:false,
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
        this.setState({ spinner: true });
		if(!re.test(this.state.email)){
			this.setState({emailError:'Ooops! We need a valid email address.',emailFlag:false});
        } else{
            this.setState({emailError:'',emailFlag:true});
        }

        if(this.state.Password.length>=6 && this.state.Password.length<=15){
            this.setState({PasswordError:'',PasswordFlag:true});
        } else {
            this.setState({PasswordError:'Password should be between 6 and 15 characters.',PasswordFlag:false});
        }

        if(this.state.Password===this.state.ConfirmPassword){
            this.setState({ConfirmPasswordError:'',ConfirmPasswordFlag:true});
        } else {
            this.setState({ConfirmPasswordError:'Password doesn\'t match. Please Retry.',ConfirmPasswordFlag:false});
        }

        // console.log("email - "+this.state.email," Password - "+ this.state.Password, " Confirm-Password- "+this.state.ConfirmPassword);
        
        if(this.state.emailFlag===true && this.state.PasswordFlag===true && this.state.ConfirmPasswordFlag===true){
            firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.Password)
				.then(() => {
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