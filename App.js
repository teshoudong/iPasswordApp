import React from 'react';
import { StyleSheet } from 'react-native';
import Navigation from 'react-navigation';
import Detail from './src/detail';
import Main from './src/main';
import Login from './src/login';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#333333'
    },
    headerTitle: {
        color: '#FFFFFF'
    }
});

const Nav = Navigation.createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            headerTitle: 'iPassword',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            headerTitle: '详情',
            headerTintColor: '#FFFFFF',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle
        }
    }
});

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false
        };
    }

    handleLogin() {
        this.setState({
            login: true
        });
    }

    render() {
        const { login } = this.state;

        if (login) {
            return <Nav/>;
        } else {
            return <Login onLogin={() => this.handleLogin()}/>;
        }
    }
}


