import React, {Component} from 'react';
import { View, ImageBackground, Image, TouchableHighlight, TouchableOpacity, AsyncStorage} from 'react-native';
import { Container, Text } from 'native-base';

type Props = {};
export default class OnBoardingThree extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ImageBackground source={require('./assets/Backgrounds/onboarding-bg-left.png')} style={{width: '100%', height: '100%'}}>
                <Container style={{backgroundColor: "rgb(0,0,0,0)", justifyContent: "flex-end"}}>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('./assets/Vector-Icons/onboard-third-icon.png')} style={{width: 100, height: 100, resizeMode: 'stretch'}} />
                        <Text style={{fontWeight: 'bold'}}>What Do I Do?</Text>
                        <Text style={{textAlign: 'center'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</Text>
                    </View>
                    <View style={{
                                flexDirection: 'row'
                            }}>
                        <TouchableHighlight onPress={() => this.props.navigation.goBack()} underlayColor="white" style={{flex: 2}}>
                            <Text style={{fontWeight: 'bold'}}>Prev></Text>
                        </TouchableHighlight>
                        <View style={{flex: 3}}>
                        <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('Home')
                                }} underlayColor="white">
                            <View style={{backgroundColor: 'green', borderRadius: 6, width: 57, height: 28, paddingHorizontal: 10, paddingTop: 3}}>
                                <Text style={{fontWeight: 'bold', color: '#fff'}}>Start</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>                    
                </Container>
                {this.saveDate()}
            </ImageBackground>
        );
    }

    saveDate(){
        AsyncStorage.setItem("intro-checked", "yes")
    }
}

