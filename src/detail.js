import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import CryptoJS from 'crypto-js';

export default class Detail extends React.Component {
    render() {
        const item = this.props.navigation.getParam('item', {});
        const passwordDecrypted = CryptoJS.AES.decrypt(item.encryptPassword, global.keypassword);
        const password = passwordDecrypted.toString(CryptoJS.enc.Utf8);

        return (
            <ScrollView>
                <View style={styles.main}>
                    <Image style={styles.mainImg} source={{uri: item.img}}/>
                    <View style={styles.mainInfo}>
                        <Text style={styles.mainTitle}>{item.name}</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={[styles.infoItem, styles.infoItemBorder]}>
                        <Text style={styles.infoName}>用户名</Text>
                        <Text style={styles.infoVal}>{item.account}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoName}>密码</Text>
                        <Text style={styles.infoVal}>{password}</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoName}>网站</Text>
                        <Text style={styles.infoVal}>{item.website}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#FFFFFF',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderColor: '#D3D3D3',
        flexDirection: 'row',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#D3D3D3'
    },
    mainImg: {
        width: 80,
        height: 80,
        borderRadius: 4
    },
    mainInfo: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    mainTitle: {
        fontSize: 18,
        color: '#333333'
    },
    info: {
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        paddingLeft: 10,
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3'
    },
    infoItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10
    },
    infoItemBorder: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#D3D3D3'
    },
    infoName: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: '#DA3610'
    },
    infoVal: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: '#333333'
    }
});