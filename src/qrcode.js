import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Camera from 'react-native-camera';
import storage from './storage';
import PubSub from 'pubsub-js';
import sha256 from 'crypto-js/sha256';

class Qrcode extends React.Component {
    componentWillUnmount() {
        this.url = '';
    }

    handleBarcode(e) {
        if (!this.url) {
            this.url = e.data;
            fetch(this.url)
                .then(response => response.json())
                .then(data => {
                    const passwordList = data.passwordList;
                    const keypassword = data.keypassword;

                    if (keypassword === sha256(global.keypassword).toString()) {
                        storage.save({
                            key: 'keypassword',
                            expires: null,
                            data: keypassword
                        });
                        storage.save({
                            key: 'passwordList',
                            expires: null,
                            data: passwordList
                        });
                        PubSub.publish('updatePasswordList', passwordList);
                        this.props.navigation.navigate('List');
                    } else {
                        alert('密码不一致');
                    }
                }).catch(() => {
                    alert('出问题啦，请重新扫码！');
                    this.url = '';
                });
        }
    }

    render() {
        return (
            <View style={styles.qrcode}>
                <Camera
                    ref={camera => this.camera = camera}
                    onBarCodeRead={e => this.handleBarcode(e)}
                    style={styles.qrcodeCamera}
                    aspect={Camera.constants.Aspect.fill}>
                    <View style={styles.qrcodeRect}></View>
                </Camera>
            </View>
        );
    }
}

class Button extends React.Component {
    handleQrcode() {
        this.props.navigation.navigate('Qrcode');
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.handleQrcode()}>
                <Image style={styles.buttonIcon} source={require('./assets/qrcode.png')}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10
    },
    buttonIcon: {
        width: 20,
        height: 20
    },
    qrcode: {
        flex: 1
    },
    qrcodeCamera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrcodeRect: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
        borderStyle: 'solid'
    }
});

Qrcode.Button = Button;

export default Qrcode;