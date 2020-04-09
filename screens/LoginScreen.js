import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '', emailError: '', emailFlag: false,
            Password: '', PasswordError: '', PasswordFlag: false,
            spinner: false
        };
    }

    componentDidMount() {
        this.setState({email: '', Password:'',spinner: false});
    }

    loginUser() {
        //validating email address
        const re = /\S+@\S+\.\S+/;
        
        if (!re.test(this.state.email)) {
            this.setState({ emailError: 'Ooops! We need a valid email address.', emailFlag: false });
        } else {
            this.setState({ emailError: '', emailFlag: true });
        }

        if (this.state.Password.length >= 6 && this.state.Password.length <= 15) {
            this.setState({ PasswordError: '', PasswordFlag: true });
        } else {
            this.setState({ PasswordError: 'Password should be between 6 and 15 characters.', PasswordFlag: false });
        }

        // console.log("email - "+this.state.email," Password - "+ this.state.Password);

        if (this.state.emailFlag == true && this.state.PasswordFlag == true) {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.Password)
                .then(() => {
                    this.setState({ spinner: false });
                    this.props.navigation.navigate('MainScreen');
                })
                .catch(error => alert(error));
        }
    }

    render() {
        return (
            <Background>
                <Logo />
                <Header>Welcome back.</Header>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email: email })}
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
                    onChangeText={(Password) => this.setState({ Password: Password })}
                    errorText={this.state.PasswordError}
                    secureTextEntry
                />

                <View style={styles.forgotPassword}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={styles.label}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button mode="contained" onPress={this.loginUser.bind(this)}>
                    Login
                </Button>

                <View style={styles.row}>
                    <Text style={styles.label}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});