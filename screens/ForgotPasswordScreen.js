import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';

export default class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '', emailError: '',
            spinner: false
        };
    }

    componentDidMount() {
        this.setState({ email: '',emailError: '', spinner: false });
    }

    sendPasswordChangeLink() {
        //validating email address
        const re = /\S+@\S+\.\S+/;
        this.setState({ spinner: true });
        if (!re.test(this.state.email)) {
            this.setState({ emailError: 'Ooops! We need a valid email address.' });
            this.setState({ spinner: false });
        } else {
            this.setState({ emailError: '' });
            firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(user => {
                    alert('Please check your email for Password Reset link.');
                    this.setState({ email: '',emailError: '', spinner: false });
                })
                .catch(error => {
                    alert(error);
                    this.setState({ spinner: false });
                })
        }

    }

    render() {
        return (
            <Background>
                <Logo />
				<Spinner visible={this.state.spinner} color={theme.colors.spinner} animation="fade"/>
                <Header>Restore Password</Header>
                <TextInput
                    label="Email"
                    returnKeyType="done"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email: email })}
                    errorText={this.state.emailError}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />

                <Button mode="contained" onPress={this.sendPasswordChangeLink.bind(this)} style={styles.button}>
                    Send Reset Instructions
                </Button>

                <TouchableOpacity
                    style={styles.back}
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.label}>← Back to login</Text>
                </TouchableOpacity>
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
});