import React, {Component} from 'react';
import {View, Button, Text, TextInput} from 'react-native';
import firebase from 'react-native-firebase';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            token: null,
            message: '',
            name: '',
            codeInput: '',
            phoneNumber: '+7',
            confirmResult: null,
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user.toJSON()});
                firebase.messaging().requestPermission();
                firebase.messaging().getToken().then((token) => {
                    this.setState({token: token});
                });
                firebase.messaging().subscribeToTopic('Notice');
                navigation.navigate('GameScreen', {
                    user: user.toJSON()
                });
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    name: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+7',
                    confirmResult: null,
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {
        const {phoneNumber} = this.state;
        this.setState({message: 'Sending code ...'});

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => this.setState({confirmResult, message: 'Code has been sent!'}))
            .catch(error => this.setState({message: `Sign In With Phone Number Error: ${error.message}`}));
    };

    confirmCode = () => {
        const {codeInput, confirmResult, name} = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    user.updateProfile({
                        displayName: name,
                    });
                    this.setState({message: 'Code Confirmed!'});
                })
                .catch(error => this.setState({message: `Code Confirm Error: ${error.message}`}));
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    };

    renderPhoneNumberInput() {
        const {phoneNumber, name} = this.state;

        return (
            <View style={{padding: 25}}>
                <Text>Enter phone number:</Text>
                <TextInput
                    autoFocus
                    style={{height: 40, marginTop: 15, marginBottom: 15}}
                    onChangeText={value => this.setState({phoneNumber: value})}
                    placeholder={'Введите телефон...'}
                    value={phoneNumber}
                />
                <TextInput
                    style={{height: 40, marginTop: 15, marginBottom: 15}}
                    onChangeText={value => this.setState({name: value})}
                    placeholder={'Ваше имя...'}
                    value={name}
                />
                <Button title="Sign In" color="green" onPress={this.signIn}/>
            </View>
        );
    }

    renderMessage() {
        const {message} = this.state;

        if (!message.length) return null;

        return (
            <Text style={{padding: 5, backgroundColor: '#000', color: '#fff'}}>{message}</Text>
        );
    }

    renderVerificationCodeInput() {
        const {codeInput} = this.state;

        return (
            <View style={{marginTop: 25, padding: 25}}>
                <Text>Enter verification code below:</Text>
                <TextInput
                    autoFocus
                    style={{height: 40, marginTop: 15, marginBottom: 15}}
                    onChangeText={value => this.setState({codeInput: value})}
                    placeholder={'Code ... '}
                    value={codeInput}
                />
                <Button title="Confirm Code" color="#841584" onPress={this.confirmCode}/>
            </View>
        );
    }

    render() {
        const {user, confirmResult, token} = this.state;
        return (
            <View style={{flex: 1}}>

                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {this.renderMessage()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

                {user && (
                    <View style={{
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#77dd77',
                        flex: 1,
                    }}>
                        <Text style={{fontSize: 25}}>Signed In!</Text>
                        <Text>{JSON.stringify(user)}</Text>
                        <Text>{JSON.stringify(token)}</Text>
                        <Button title="Sign Out" color="red" onPress={this.signOut}/>
                        <Button title="Example" color="red" onPress={this.sendNotice}/>
                    </View>
                )}
            </View>
        );
    }
}
