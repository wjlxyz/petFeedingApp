import React, {Component} from 'react'
import {Text, View, StyleSheet, TextInput, Button, Alert} from 'react-native'

const baseUrl = 'http://127.0.0.1:9001';
export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            password: '',
        };
    }

    _onLogin() {
        const { phoneNumber, password } = this.state;
        fetch(baseUrl + '/server/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestId: new Date().getUTCMilliseconds(),
                method: 'login',
                phoneNumber: phoneNumber,
                password: password
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            });
    }

    _onForgetPwd() {
        Alert.alert("forgetPwd");
    }

    _onRegister() {
        Alert.alert("register")
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.phoneNumber}
                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                    placeholder={'手机号码'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'密码'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <View style={styles.tips}>
                    <Text onPress={this._onForgetPwd.bind(this)}>忘记密码？</Text>
                    <Text onPress={this._onRegister.bind(this)}>注册</Text>
                </View>


                <Button
                    title={'Login'}
                    style={styles.input}
                    onPress={this._onLogin.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    tips: {
        flexDirection: "row",
    }
});


