import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ''
        };
    }

    handleInput(text) {
        this.setState({
            input: text
        });
    }

    handleButton() {
        this.props.onLogin();
    }

    render() {
        return (
            <View style={styles.login}>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginLogo}>iPassword</Text>
                    <TextInput 
                        style={styles.loginText} 
                        secureTextEntry={true} 
                        placeholder="请输入密码" 
                        onChangeText={text => this.handleInput(text)}/>
                    <TouchableOpacity 
                        style={styles.loginButton} 
                        activeOpacity={0.9} 
                        onPress={() => this.handleButton()}>
                        <Text style={styles.loginButtonText}>登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F302E'
    },
    loginLogo: {
        color: '#191A19',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    loginText: {
        backgroundColor: '#FFFFFF',
        width: 240,
        height: 40,
        borderRadius: 4,
        textAlign: 'center',
        fontSize: 12
    },
    loginButton: {
        backgroundColor: '#DA3610',
        width: 240,
        height: 40,
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        fontSize: 12,
        color: '#FFFFFF'
    }
});