import React from 'react';
import { View, Text, Image, SectionList, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import storage from './storage';
import PubSub from 'pubsub-js';
import fuzzy from 'fuzzy';

class Search extends React.Component {
    render() {
        return (
            <View style={styles.search}>
                <Image style={styles.searchImg} source={require('./assets/search.png')}/>
                <TextInput style={styles.searchInput} underlineColorAndroid="transparent" placeholder="搜索" {...this.props}/>
            </View>
        );
    }
}

class Empty extends React.Component {
    render() {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>暂无数据</Text>
            </View>
        );
    }
}

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.passwordList = [];

        this.state = {
            passwordList: []
        };

        this.getData();
        this.subUpdatePasswordList();
    }

    componentWillUnmount() {
        PubSub.unsubscribe('updatePasswordList');
    }

    subUpdatePasswordList() {
        PubSub.subscribe('updatePasswordList', (_, data) => {
            this.passwordList = data;
            this.setState({
                passwordList: data
            });
        });
    }

    getData() {
        storage.load({
            key: 'passwordList'
        }).then(data => {
            if (data) {
                this.passwordList = data;
                this.setState({
                    passwordList: data
                });
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    getPasswordMapList(passwordList) {
        passwordList = passwordList || [];
        let map = {};
        passwordList.map(item => {
            item.key = item.id;
            return item;
        }).forEach(item => {
            const prefix = item.name.substr(0, 1).toUpperCase();
            map[prefix] = map[prefix] || [];
            map[prefix].push(item);
        });
        return Object.keys(map).map(key => {
            return {
                key,
                data: map[key]
            };
        });
    }

    handleClikItem(item) {
        this.props.navigation.navigate('Detail', {
            item
        });
    }

    handeSearch(e) {
        const value = e;
        const passwordList = this.passwordList;
        const result = fuzzy.filter(value, passwordList, {
            extract: el => `${el.account} ${el.name} ${el.website}`
        }).map(item => item.original);

        this.setState({
            passwordList: result.length > 0 ? result : this.passwordList
        });
    }

    renderSectionHeader(data) {
        const key = data.section.key;

        return (
            <View style={styles.key}>
                <Text style={styles.keyText}>
                    {key}
                </Text>
            </View>
        );
    }

    renderItem(data) {
        const item = data.item;
        const index = data.index;

        const itemStyle = [styles.item];

        if (index !== 0) {
            itemStyle.push(styles.itemBorder);
        }

        return (
            <TouchableHighlight onPress={() => this.handleClikItem(item)}>
                <View style={itemStyle}>
                    <Image style={styles.itemImg} source={{uri: item.img}}/>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.itemSubtitle}>{item.account}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        const { passwordList } = this.state;
        const sections = this.getPasswordMapList(passwordList);

        return (
            <SectionList
                style={styles.list}
                ListEmptyComponent={<Empty/>}
                ListHeaderComponent={<Search onChangeText={e => this.handeSearch(e)}/>}
                renderSectionHeader={data => this.renderSectionHeader(data)}
                renderItem={data => this.renderItem(data)}
                sections={sections}/>
        );
    }
}

const styles = StyleSheet.create({
    empty: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 12,
        color: '#D3D3D3'
    },
    search: {
        height: 50,
        padding: 10,
        position: 'relative'
    },
    searchImg: {
        width: 16,
        height: 16,
        position: 'absolute',
        left: 17,
        top: 17,
        zIndex: 1
    },
    searchInput: {
        backgroundColor: '#EDEDEF',
        height: 30,
        borderRadius: 4,
        paddingLeft: 30,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 12
    },
    list: {
        backgroundColor: '#FFFFFF'
    },
    key: {
        backgroundColor: '#FFFFFF',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        padding: 3
    },
    keyText: {
        fontSize: 12,
        color: '#333'
    },
    item: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        padding: 10
    },
    itemBorder: {
        borderStyle: 'solid',
        borderColor: '#D3D3D3',
        borderTopWidth: 1
    },
    itemImg: {
        width: 50,
        height: 50,
        borderRadius: 4
    },
    itemInfo: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    itemTitle: {
        fontSize: 14,
        color: '#333333'
    },
    itemSubtitle: {
        fontSize: 12,
        color: '#A2A2A2',
        marginTop: 2
    }
});