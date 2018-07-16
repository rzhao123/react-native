import React from 'react';
import { Text, View, ListView, TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback, } from 'react-native';

import { styles } from '../static/js/style.js';

export default class City extends React.Component {
    constructor() {
        super();
        let _ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            console.log(r1.status, r2.status, r1 !== r2);
            return r1 !== r2;
        }, });
        this.state = {
            cities: [],
            ds: _ds,
            regionid: -1
        }
        this.showName = this.showName.bind(this);


    }

    getdata(url, suc, err) {
        const res = fetch(url).then((response) => response.json())
        .then( (data) => {
            if(data.errno == 0) {
               suc && suc(data.data)
            }
        })
        .catch((e) => {
            console.log(e)
        });
        return res
    }

    componentDidMount() {
        var scope = this;
        this.getdata('https://apikuai.baidu.com/city/getstartcitys', function(data) {
            data.cities.map(item => {
                item.status = false
            })
            scope.setState({
                cities: data.cities,
                ds: scope.state.ds.cloneWithRows(data.cities)
            })

        });
    }

    showName(id) {
        let scope = this, _temp = {}, _arr = [];
        scope.state.cities.map((item, index) => {
            _arr.push(index == id ? Object.assign({}, item, {status: true}) : item);
            return item;
        })
        scope.setState({
            ds: scope.state.ds.cloneWithRows(_arr)
        })
    }


    render() {
        return (
            <ListView style={styles.listView} enableEmptySections={true}
                dataSource={this.state.ds}
                renderRow={(rowData, sectionID, rowID) =>
                    <TouchableHighlight style={styles.listItem} underlayColor='#ccc' onPress={() => this.showName(rowID)}>
                        <Text style={rowData.status ? {color: "green"} : null}>{rowData.cnname}</Text>
                    </TouchableHighlight>
            }
            />
        )
    }
}
