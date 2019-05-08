
import React, {Component} from 'react';
import { View, Image, TextInput, WebView} from 'react-native';
import { Container, Text,Card, CardItem, Content, Form, Item, Button, Body, Spinner, Icon, Tabs, Tab, TabHeading, Left } from 'native-base';

import MyHeader from './commen/MyHeader'

type Props = {};
export default class Details extends Component<Props> {
    state = {addCommentRes: [], comments: [], currentTab: 0, loaded: 0, name: "", comment: "", addingComment: 0}
    static navigationOptions = {
        header: null,
    };

    componentDidMount(){
        fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?post='+ this.props.navigation.getParam('id'))
            .then((res)=> res.json())
            .then((resJson)=> {
            this.setState({
                comments: resJson,
                loaded: 1,
            });
        })
        .catch((err)=> {
        alert(err);
        });
    }

    render() {
        return (
            <Container>
                <MyHeader title={this.props.navigation.getParam('title')} details='yes'/>
                <Tabs tabBarUnderlineStyle={{borderBottomWidth:2, borderColor: 'green'}} initialPage={this.state.currentTab} onChangeTab={({ i }) => this.setState({ currentTab: i })}>
                    <Tab heading={<TabHeading style={{backgroundColor: 'white'}}>
                    {this.setTabIcon(1)}
                    <Text style={this.state.currentTab == 0 ? {color: '#000'} : {color: '#666'}}>About</Text></TabHeading>}>
                        <Content>
                            <Card>
                                <CardItem>
                                    <Body>
                                    <Image
                                        style={{width: '100%', height: 220, borderRadius: 5}}
                                        source={{uri: this.props.navigation.getParam('image')}} />
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
                                <Body style={{  alignItems: 'flex-start', margin: 10, padding: 10, 
                                                borderWidth: 2, borderColor: '#999', borderStyle: 'solid', borderRadius: 5}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>{this.props.navigation.getParam('title')}</Text>
                                    <Text>{this.props.navigation.getParam('content')}</Text>
                                </Body>
                            </Card>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 8}}>More Info</Text>
                            <Card>
                                <Body style={{  alignItems: 'flex-start', margin: 10, padding: 20, 
                                                borderWidth: 2, borderColor: '#999', borderStyle: 'solid', borderRadius: 5}}>
                                <View style={{flex: 1, flexDirection: 'row', marginBottom: 8}}>
                                    <Image 
                                        style={{width: 20, height: 20, marginRight: 4}}
                                        source={require('./assets/Icons/address.png')} />
                                    <Text style={{fontWeight: 'bold', color: '#666'}}>{this.props.navigation.getParam('address')}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', marginBottom: 8}}>
                                    <Image 
                                        style={{width: 20, height: 20, marginRight: 4}}
                                        source={require('./assets/Icons/call.png')} />
                                    <Text style={{fontWeight: 'bold', color: '#666'}}>{this.props.navigation.getParam('phone')}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Image 
                                        style={{width: 20, height: 20, marginRight: 4}}
                                        source={require('./assets/Icons/mail.png')} />
                                    <Text style={{fontWeight: 'bold', color: '#666'}}>{this.props.navigation.getParam('email')}</Text>
                                </View>
                                </Body>
                            </Card>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 8}}>Leave a comment</Text>
                            {this.getComments()}
                            <Card>
                                <CardItem>
                                    <Body>
                                    <Form style={{width: '100%'}}>
                                        <TextInput
                                            style={{paddingLeft: 8, height: 40, width: '100%', borderColor: 'gray', borderWidth: 2, borderRadius: 5}}
                                            onChangeText={(name) => this.setState({name})}
                                            value={this.state.name}
                                            placeholder="Your Name"
                                            numberOfLines= {1}
                                        />
                                        <TextInput
                                            style={{marginTop: 10, paddingLeft: 8, height: 100, width: '100%', borderColor: 'gray', borderWidth: 2, borderRadius: 5}}
                                            onChangeText={(comment) => this.setState({comment})}
                                            value={this.state.comment}
                                            placeholder="Your Comment"
                                            multiline = {true}
                                            numberOfLines = {4}
                                        />
                                    </Form>
                                    </Body>
                                </CardItem>
                                <CardItem style={{flexDirection: 'column'}}>
                                    {this.commentButton()}
                                </CardItem>
                            </Card>
                        </Content>
                    </Tab>
                    <Tab heading={<TabHeading style={{backgroundColor: 'white'}}>
                    {this.setTabIcon(2)}
                    <Text style={this.state.currentTab == 1 ? {color: '#000'} : {color: '#666'}}>Map</Text></TabHeading>}>
                        <WebView source={{uri: this.props.navigation.getParam('map')}} style={{width: '100%', height: '100%'}}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }

    setTabIcon(section){
        if(section == 1){
            if(this.state.currentTab == 0){
                return(
                    <Image  style={{width: 20, height: 20}}
                            source={require('./assets/Icons/gabout.png')}/>
                )
            } else{
                return(
                    <Image  style={{width: 20, height: 20}}
                            source={require('./assets/Icons/about.png')}/>
                )
            }
        } else{
            if(this.state.currentTab == 1){
                return(
                    <Image  style={{width: 20, height: 20}}
                            source={require('./assets/Icons/map-marker.png')}/>
                )
            } else{
                return(
                    <Image  style={{width: 20, height: 20}}
                            source={require('./assets/Icons/grey-map-marker.png')}/>
                )
            }
        }
    }

    getComments(){
        if(this.state.loaded === 0){
            return(
              <Card>
                <Spinner />
              </Card>
            )
        }else{
            return(
              this.state.comments.map((mapData)=>{
                return(
                  <Card key={mapData.id}>
                    <CardItem style={{flex: 9}}>
                        <Left style={{flex: 1}}>
                            <Image  style={{width: 35, height: 35}}
                                    source={require('./assets/Icons/profile.png')}/>
                        </Left>
                        <Body style={{flex: 8}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 10}}>{mapData.author_name}</Text>
                                <Text style={{fontSize: 11, fontWeight: 'bold', color: '#666'}}>{mapData.date}</Text>
                            </View>
                            <Text note style={{fontSize: 13, marginLeft: 10}}>{mapData.content.rendered}</Text>
                        </Body>
                    </CardItem>
                  </Card>
                );
              })
            )
        }
    }

    commentButton(){
            if(this.state.addingComment === 0){
                return(
                    <Button onPress={()=>{
                        this.addComment();
                        this.setState({addingComment: 1})}}
                        style={{width: '100%', justifyContent: 'center', backgroundColor: 'green',
                                borderColor: 'green', borderWidth: 2, borderRadius: 5}}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>comment</Text>
                    </Button>
                )
            }else{
                return(
                    <Button disabled onPress={()=>{
                    }}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>comment</Text>
                    </Button>

                )
            }
    }

    addComment(){
        fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?author_name='+ this.state.name +'&author_email=itialex39@roqay.com.kw&content='+ this.state.comment +'&post='+ this.props.navigation.getParam('id'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res)=> res.json())
            .then((rj)=>{
                this.setState({addCommentRes: rj, addingComment: 0, name: "", comment: ""}, function(){
                    if(rj.status)
                    {
                      alert('Your comment is '+rj.status);
                    } else {
                      alert('Your comment is rejected');
                    }
                })
            })
      }
}

