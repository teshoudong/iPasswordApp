import React from 'react';
import { View, Text, Image, SectionList, TouchableHighlight, StyleSheet } from 'react-native';

export default class List extends React.Component {

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
        const sections = [
            { 
                "key": "A", 
                "data": [{
                    "id": 1526350422212,
                    "img": "data:image/png;base64,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",
                    "account": "markpop753951",
                    "name": "百度",
                    "encryptPassword": "VT98fRVqQhLHFma18N3M+w==",
                    "website": "https://www.baidu.com",
                    "createTime": 1526350422212,
                    "updateTime": 1527039257636,
                    "key": 1526350422212
                }]
            },
            { 
                "key": "B", 
                "data": [{
                    "id": 1526350576466,
                    "img": "https://pp.myapp.com/ma_icon/0/icon_11648167_1526893482/256",
                    "account": "13588857414",
                    "name": "钉钉",
                    "encryptPassword": "VT98fRVqQhLHFma18N3M+w==",
                    "website": "https://oa.dingtalk.com",
                    "createTime": 1526350576466,
                    "updateTime": 1527057374890,
                    "key": 1526350576466
                }]
            }
        ];
        return (
            <SectionList
                style={styles.list}
                renderSectionHeader={data => this.renderSectionHeader(data)}
                renderItem={data => this.renderItem(data)}
                sections={sections}/>
        );
    }
}

const styles = StyleSheet.create({
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
        borderBottomWidth: 1
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