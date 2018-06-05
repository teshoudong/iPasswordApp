import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default class Setting extends React.Component {
    handleLogout() {
        
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