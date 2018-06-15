import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import PubSub from 'pubsub-js';

export default class Setting extends React.Component {
    handleLogout() {
        PubSub.publish('logout');
    }

    render() {
        return (
            <ScrollView>
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