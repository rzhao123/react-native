import React from 'react';
import { Text, View, ListView } from 'react-native';
import City from './components/City';
import { styles } from './static/js/style.js';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <City />
            </View>
        )
    }
}
