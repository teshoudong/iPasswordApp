import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Camera from 'react-native-camera';

class Qrcode extends React.Component {
    handleBarcode(e) {
        alert(e.data);
    }

    render() {
        return (
            <View style={styles.qrcode}>
                <Camera
                    ref={camera => this.camera = camera}
                    onBarCodeRead={e => this.handleBarcode(e)}
                    style={styles.qrcodeCamera}
                    aspect={Camera.constants.Aspect.fill}>
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
        flex: 1
    }
});

Qrcode.Button = Button;

export default Qrcode;