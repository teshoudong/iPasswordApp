import React from 'react';
import { View, Text, Image, SectionList, TouchableHighlight, StyleSheet } from 'react-native';
import storage from './storage';
import PubSub from 'pubsub-js';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: []
        };

        this.getData();
        this.subUpdatePasswordList();
    }

    componentWillUnmount() {
        PubSub.unsubscribe('updatePasswordList');
    }

    subUpdatePasswordList() {
        PubSub.subscribe('updatePasswordList', (_, data) => {
            this.setState({
                sections: this.getPasswordMapList(data)
            });
        });
    }

    getData() {
        storage.load({
            key: 'passwordList'
        }).then(data => {
            if (data) {
                this.setState({
                    sections: this.getPasswordMapList(data)
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
        const { sections } = this.state;

        if (sections.length > 0) {
            return (
                <SectionList
                    style={styles.list}
                    renderSectionHeader={data => this.renderSectionHeader(data)}
                    renderItem={data => this.renderItem(data)}
                    sections={sections}/>
            );
        } else {
            return (
                <View style={styles.empty}>
                    <Image style={styles.emptyImg} source={require('./assets/empty.png')}/>
                </View>
            );
        } 
    }
}

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyImg: {
        width: 100,
        height: 100,
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