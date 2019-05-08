import React, {Component} from 'react';
import { ImageBackground, Image, TouchableHighlight} from 'react-native';
import { Container, Text, View } from 'native-base';

type Props = {};
export default class OnBoardingOne extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    render() {
    return (
        <ImageBackground source={require('./assets/Backgrounds/onboarding-bg-left.png')} style={{width: '100%', height: '100%'}}>
            <Container style={{backgroundColor: "rgb(0,0,0,0)", justifyContent: "flex-end"}}>
                <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Image source={require('./assets/Vector-Icons/onboard-first-icon.png')} style={{width: 100, height: 100, resizeMode: 'stretch'}} />
                    <Text style={{fontWeight: 'bold'}}>Places For Going Out</Text>
                    <Text style={{textAlign: 'center'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</Text>
                </View>
                <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                    <TouchableHighlight onPress={()=>{
                                    this.props.navigation.navigate('OnBoardingTwo')
                                }} underlayColor="white">
                        <Text style={{fontWeight: 'bold'}}>Next></Text>
                    </TouchableHighlight>
                </View>
            </Container>
        </ImageBackground>
    );
  }
}

