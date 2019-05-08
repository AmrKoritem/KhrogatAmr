import React, {Component} from 'react';
import { View, ImageBackground, Image, TouchableHighlight} from 'react-native';
import { Container, Text } from 'native-base';

type Props = {};
export default class OnBoardingTwo extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    render() {
    return (
        <ImageBackground source={require('./assets/Backgrounds/onboarding-bg-right.png')} style={{width: '100%', height: '100%'}}>
            <Container style={{backgroundColor: "rgb(0,0,0,0)", justifyContent: "flex-end"}}>
                <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Image source={require('./assets/Vector-Icons/onboard-second-icon.png')} style={{width: 100, height: 100, resizeMode: 'stretch'}} />
                    <Text style={{fontWeight: 'bold'}}>Restaurants & Coffee Shops</Text>
                    <Text style={{textAlign: 'center'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</Text>
                </View>
                <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                    <View>
                    <TouchableHighlight onPress={() => this.props.navigation.goBack()} underlayColor="white">
                        <Text style={{fontWeight: 'bold'}}>Prev></Text>
                    </TouchableHighlight>
                    </View>
                    <View>
                    <TouchableHighlight onPress={()=>{
                                    this.props.navigation.navigate('OnBoardingThree')
                                }} underlayColor="white">
                        <Text style={{fontWeight: 'bold'}}>Next></Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </Container>
        </ImageBackground>
    );
  }
}

