import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, TouchableHighlight, Image, Alert } from 'react-native';
import PubSub from 'pubsub-js';
import storage from './storage';

export default class Setting extends React.Component {
    constructor(props) {
        super(props);

        this.settingList = [
            {
                key: 'clearPasswordList',
                title: '清除数据'
            }
        ];
    }

    handleLogout() {
        PubSub.publish('logout');
    }

    handleClikItem(item) {
        if (item.key === 'clearPasswordList') {
            Alert.alert(
                '提示',
                '是否清空数据',
                [
                    { text: '取消', style: 'cancel' },
                    { text: '确定', onPress: () => {
                        storage.remove({
                            key: 'keypassword'
                        });
                        storage.remove({
                            key: 'passwordList'
                        });
                        PubSub.publish('updatePasswordList', []);
                    }}
                ]
            );
        }
    }

    renderItem(item, index) {
        return (
            <TouchableHighlight
                style={styles.itemButton}
                activeOpacity={0.9}
                onPress={() => this.handleClikItem(item)}>
                <View style={styles.item}>
                    <View style={[styles.itemContainer, index === 0 ? null : styles.itemBorder]}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Image style={styles.itemIcon} source={require('./assets/arrow.png')}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ScrollView>
                <FlatList
                    style={styles.list}
                    data={this.settingList}
                    renderItem={({ item, index }) => this.renderItem(item, index)}/>
                <View style={styles.logout}>
                    <TouchableOpacity 
                        style={styles.logoutButton} 
                        activeOpacity={0.9} 
                        onPress={() => this.handleLogout()}>
                        <Text style={styles.logoutButtonText}>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        marginBottom: 20,
        borderStyle: 'solid',
        borderColor: '#D3D3D3',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    item: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 10
    },
    itemButton: {
        backgroundColor: '#FFFFFF'
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    itemBorder: {
        borderStyle: 'solid',
        borderColor: '#D3D3D3',
        borderTopWidth: 1
    },
    itemTitle: {
        fontSize: 12,
        color: '#333333'
    },
    itemIcon: {
        width: 20,
        height: 20
    },
    logout: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    logoutButton: {
        backgroundColor: '#DA3610',
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButtonText: {
        fontSize: 12,
        color: '#FFFFFF'
    } 
});