import React, {Component} from 'react';
import { View, Image, AsyncStorage, ImageBackground} from 'react-native';
import { Container, Text,Spinner, CardItem, Content, Left, Body, Right } from 'native-base';

type Props = {};
export default class Splash extends Component<Props> {

    static navigationOptions = {
        header: null,
    };

    render() {
    return (
        <ImageBackground source={require('./assets/Backgrounds/splash-bg.png')} style={{width: '100%', height: '100%'}}>
            <Container style={{backgroundColor: "rgb(0,0,0,0)", alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                <Image source={require('./assets/Logo/khrogaty-logo.png')} style={{width: 140, height: 150, resizeMode: 'stretch'}} />
                <Spinner color="#fff"/>
                {this.moveToHome()}
            </Container>
        </ImageBackground>
        );
    }

    moveToHome(){
        AsyncStorage.getItem("intro-checked").then((val)=>{
            setTimeout(()=>{
                if(val === "yes"){
                    this.props.navigation.navigate('Home');
                }else{
                    this.props.navigation.navigate('OnBoardingOne');
                }
            }, 1000);
        });
    }
}

