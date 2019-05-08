
import React, {Component} from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';

type Props = {};
class MyHeader extends Component<Props> {
  render() {
    if(this.props.details == 'yes'){
      return(
        <ImageBackground source={require('../assets/Backgrounds/theme-header.png')} style={{width: '100%'}}>
          <Header hasTabs style={{backgroundColor: "rgb(0,0,0,0)"}}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back'/>
              </Button>
            </Left>
            <Body>
              <Title>{this.props.title}</Title>
            </Body>
          </Header>
        </ImageBackground>
      )
    } else {
      return (
        <ImageBackground source={require('../assets/Backgrounds/theme-header.png')} style={{width: '100%'}}>
          <Header style={{backgroundColor: "rgb(0,0,0,0)"}}>
            <Body>
              <Title>{this.props.title}</Title>
            </Body>
          </Header>
        </ImageBackground>
      );
    }
  }

}

export default withNavigation(MyHeader);