import React, { Component } from 'react'
import { Text, View, BackHandler, StatusBar } from 'react-native'

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.backButtonClick = this.backButtonClick.bind(this);
    }
    componentWillMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        return true;
    };


    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View styles={{ margin: 100 }}>
                <StatusBar backgroundColor={'red'} barStyle={'dark-content'} translucent={false} />
                <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
                    <Text> Longado 222</Text>
                </View>

            </View>
        )
    }
}
