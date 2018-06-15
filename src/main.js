import React from 'react';
import { Image, StyleSheet } from 'react-native';
import List from './list';
import Setting from './setting';
import Navigation from 'react-navigation';

export default Navigation.createBottomTabNavigator({
    List,
    Setting
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;

            if (routeName === 'List') {
                if (focused) {
                    return (
                        <Image style={styles.icon} source={require('./assets/list-active.png')}/>
                    );
                } else {
                    return (
                        <Image style={styles.icon} source={require('./assets/list.png')}/>
                    );
                }
            } else {
                if (focused) {
                    return (
                        <Image style={styles.icon} source={require('./assets/setting-active.png')}/>
                    );
                } else {
                    return (
                        <Image style={styles.icon} source={require('./assets/setting.png')}/>
                    );
                }
            }
        },
        title: navigation.state.routeName === 'List' ? '列表' : '设置',
        tabBarOptions: {
            activeTintColor: '#DA3610',
            inactiveTintColor: '#333333',
            style: styles.tab
        }
    })
});

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25
    },
    tab: {
        backgroundColor: '#FFFFFF'
    }
});