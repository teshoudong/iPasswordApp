import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import Navigation from 'react-navigation';
import Detail from './src/detail';
import Main from './src/main';
import Login from './src/login';
import Qrcode from './src/qrcode';
import PubSub from 'pubsub-js';

const styles = StyleSheet.create({
    app: {
        flex: 1
    },
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
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'iPassword',
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                headerRight: <Qrcode.Button navigation={navigation}/>
            };
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
    },
    Qrcode: {
        screen: Qrcode,
        navigationOptions: {
            headerTitle: '扫码',
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

        this.subLogout();
    }

    subLogout() {
        PubSub.subscribe('logout', () => {
            this.setState({
                login: false
            });
        });
    }

    handleLogin() {
        this.setState({
            login: true
        });
    }

    renderContent() {
        const { login } = this.state;

        if (login) {
            return <Nav/>;
        } else {
            return <Login onLogin={() => this.handleLogin()}/>;
        }
    }

    render() {
        return (
            <View style={styles.app}>
                <StatusBar barStyle="light-content"/>
                {this.renderContent()}
            </View>
        );
    }
}


