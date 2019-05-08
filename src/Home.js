
import React, {Component} from 'react';
import { View, FlatList, Image, ImageBackground, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native';
import { Container, Text,Card, CardItem, Footer, FooterTab, Content, Left, Body, Spinner, Header, Button, Icon, Right, Item, Input } from 'native-base';

import MyHeader from './commen/MyHeader'

type Props = {};
export default class News extends Component<Props> {
    state = {at: 'Home', searchKey: "", searchData: [], placesData: [], restaurantsData: [], todoData: [], loaded: 0}
    searchData = []

    static navigationOptions = {
        header: null,
    };

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
            .then((response)=> response.json())
            .then((resJson)=>{
                this.setState({
                    placesData: resJson});
                fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
                    .then((response)=> response.json())
                    .then((resJson)=>{
                        this.setState({
                            restaurantsData: resJson});
                        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2")
                            .then((response)=> response.json())
                            .then((resJson)=>{
                                this.setState({
                                    todoData: resJson, loaded: 1});
                            });
                    });
            });
    }

    render() {
        return (
            <Container>
                {this.returnHeader()}
                <Content>
                    {this.returnContent()}
                </Content>
                {this.returnFooter()}
            </Container>
        );
    }

    returnHeader(){
        if(this.state.at === 'Home'){
            return(
                <ImageBackground source={require('./assets/Backgrounds/home-header.png')} style={{width: '100%'}}>
                    <Header span style={{backgroundColor: "rgb(0,0,0,0)"}}>
                        <Body style={{alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                        <Image source={require('./assets/Logo/khrogaty-logo.png')} style={{width: 100, height: 100, resizeMode: 'stretch'}} />
                        </Body>
                    </Header>
                </ImageBackground>
            )
        } else{
            return(
                <MyHeader title={this.state.at}/>
            )
        }
    }

    sectionHead(section){
        if(section == 1){
            return(
                <View style={{flex: 4, flexDirection: 'row', marginTop: 5}}>
                    <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Image source={require('./assets/Vector-Icons/home-first-icon.png')} style={{marginHorizontal: 5, width: 20, height: 20, resizeMode: 'stretch'}} />
                    <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>Places For Going Out</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TouchableHighlight onPress={()=>{
                                    this.setState({at: 'Places'});
                                }} underlayColor="white">
                        <Text style={{fontWeight: 'bold', color: 'green'}}>View More</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            )
        } else if(section == 2){
            return(
                <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Image source={require('./assets/Vector-Icons/home-second-icon.png')} style={{marginHorizontal: 5, width: 20, height: 20, resizeMode: 'stretch'}} />
                    <Text style={{fontWeight: 'bold'}}>Restaurants & Coffee Shops</Text>
                    </View>
                    <View  style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TouchableHighlight onPress={()=>{
                                    this.setState({at: 'Rest/Coffees'});
                                }} underlayColor="white">
                        <Text style={{fontWeight: 'bold', color: 'green'}}>View More</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            )
        } else{
            return(
                <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Image source={require('./assets/Vector-Icons/home-third-icon.png')} style={{marginHorizontal: 5, width: 20, height: 20, resizeMode: 'stretch'}} />
                    <Text style={{fontWeight: 'bold'}}>What Do I Do?</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TouchableHighlight onPress={()=>{
                                    this.setState({at: 'Activities'});
                                }} underlayColor="white">
                        <Text style={{fontWeight: 'bold', color: 'green'}}>View More</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            )
        }
    }

    sectionSpinner(){
        return(
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Spinner/>
            </View>
        )
    }

    sectionData(section){
        var myData;
        if(section == 1){
            myData = this.state.placesData;
        } else if(section == 2){
            myData = this.state.restaurantsData;
        } else{
            myData = this.state.todoData;
        }
        return(
            <FlatList
                horizontal
                data={myData}
                renderItem={({ item: rowData }) => {
                return (
                    <Card>
                        <Left>
                            <Image
                                style={{width: 180, height: 180, borderRadius: 10}}
                                source={{uri: rowData.better_featured_image.source_url}} />
                        </Left>
                        <Body>
                            <Text style={{fontWeight: 'bold', fontSize: 12}}>{rowData.title.rendered}</Text>
                        </Body>
                        <Right>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Image 
                                    style={{width: 20, height: 20}}
                                    source={require('./assets/Icons/map-marker.png')} />
                                <Text style={{fontSize: 10}}>{rowData.acf.address}</Text>
                            </View>
                        </Right>
                    </Card>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        )
    }

    setUpSearch(){
        searchData = this.state.placesData.concat(this.state.restaurantsData.concat(this.state.todoData))
    }
    doSearch(searchKey){
        // this.setState({searchData: searchData.match(searchKey), searchKey: searchKey})
        this.state.searchData = []
        searchData.map((element)=>{
            if (element.title.rendered.indexOf(searchKey) != -1 && searchKey != "") {
                this.state.searchData.push(element)
            }
        })
        this.setState({searchData: this.state.searchData, searchKey: searchKey})
    }
    showSearchResults(){
        if (this.state.searchKey == ""){
            return(
                <View style={{alignContent: "center", alignItems: 'center'}}>
                    <Image
                        style={{width: 90, height: 90, borderRadius: 10}}
                        source={require('./assets/Vector-Icons/nosearch-icon.png')} />
                    <Text>Search for any places</Text>
                </View>
            )
        }
        return(
            this.state.searchData.map((mapingData)=>{
                return(
                    <Card key={mapingData.id}>
                        <CardItem>
                            <Left style={{flex: 2}}>
                                <Image
                                    style={{width: 120, height: 150, borderRadius: 10}}
                                    source={{uri: mapingData.better_featured_image.source_url}} />
                            </Left>
                            <Body style={{flex: 3}}>
                                <Text style={{fontWeight: 'bold'}}>{mapingData.title.rendered}</Text>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Image 
                                        style={{width: 20, height: 20}}
                                        source={require('./assets/Icons/map-marker.png')} />
                                    <Text style={{fontWeight: 'bold', color: 'green'}}>{mapingData.acf.address}</Text>
                                </View>
                                <Text style={{color: '#999', marginTop: 10}}>{mapingData.excerpt.rendered}</Text>
                                <TouchableOpacity onPress={()=>{
                                        this.props.navigation.navigate('Details', { title: mapingData.title.rendered, 
                                                                                    image: mapingData.better_featured_image.source_url, 
                                                                                    content: mapingData.content.rendered, 
                                                                                    address: mapingData.acf.address,
                                                                                    phone: mapingData.acf.phone_number,
                                                                                    email: mapingData.acf.email_address,
                                                                                    map: mapingData.acf.map_location,
                                                                                    id: mapingData.id })
                                    }} 
                                    underlayColor="white">
                                    <View style={{backgroundColor: 'green', borderRadius: 10, width: 70, height: 30, paddingHorizontal: 10, paddingTop: 3}}>
                                        <Text style={{fontWeight: 'bold', color: '#fff'}}>Details</Text>
                                    </View>
                                </TouchableOpacity>
                            </Body>
                        </CardItem>
                    </Card>
                )
            })
        )
    }

    returnContent(){
        var myContent;
        if(this.state.at === 'Home'){
            if(this.state.loaded === 0){
                return(
                    <View>
                        {this.sectionHead(1)}
                        {this.sectionSpinner()}
                        {this.sectionHead(2)}
                        {this.sectionSpinner()}
                        {this.sectionHead(3)}
                        {this.sectionSpinner()}
                    </View>
                )
            }else {
                return(
                    <View>
                        {this.sectionHead(1)}
                        {this.sectionData(1)}                      
                        {this.sectionHead(2)}
                        {this.sectionData(2)}
                        {this.sectionHead(3)}
                        {this.sectionData(3)}
                    </View>
                )
            }
        } else if(this.state.at === 'Search'){
            this.setUpSearch()
            return(
                <View>
                    <Container>
                        <View style={{alignContent: "center", alignItems: 'center'}}>
                            <View searchBar style={{height: 50, width: '70%', borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingLeft: 5, marginVertical: 30}}>
                                <Item>
                                    <Icon name="ios-search"/>
                                    <Input  placeholder="Search here by place"
                                            onChangeText={(searchKey) => this.doSearch(searchKey)}
                                            value={this.state.searchKey}
                                    />
                                </Item>
                            </View>
                        </View>
                        {this.showSearchResults()}
                    </Container>
                </View>
            )
        } else if(this.state.at === 'Rest/Coffees'){
            myContent = this.state.restaurantsData;
        } else if(this.state.at === 'Places'){
            myContent = this.state.placesData;
        } else{
            myContent = this.state.todoData;
        }
        return(
            myContent.map((mapingData)=>{
                return(
                    <Card key={mapingData.id}>
                        <CardItem>
                            <Left style={{flex: 2}}>
                                <Image
                                    style={{width: 120, height: 150, borderRadius: 10}}
                                    source={{uri: mapingData.better_featured_image.source_url}} />
                            </Left>
                            <Body style={{flex: 3}}>
                                <Text style={{fontWeight: 'bold'}}>{mapingData.title.rendered}</Text>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Image 
                                        style={{width: 20, height: 20}}
                                        source={require('./assets/Icons/map-marker.png')} />
                                    <Text style={{fontWeight: 'bold', color: 'green'}}>{mapingData.acf.address}</Text>
                                </View>
                                <Text style={{color: '#999', marginTop: 10}}>{mapingData.excerpt.rendered}</Text>
                                <TouchableOpacity onPress={()=>{
                                        this.props.navigation.navigate('Details', { title: mapingData.title.rendered, 
                                                                                    image: mapingData.better_featured_image.source_url, 
                                                                                    content: mapingData.content.rendered, 
                                                                                    address: mapingData.acf.address,
                                                                                    phone: mapingData.acf.phone_number,
                                                                                    email: mapingData.acf.email_address,
                                                                                    map: mapingData.acf.map_location,
                                                                                    id: mapingData.id })
                                    }} 
                                    underlayColor="white">
                                    <View style={{backgroundColor: 'green', borderRadius: 10, width: 70, height: 30, paddingHorizontal: 10, paddingTop: 3}}>
                                        <Text style={{fontWeight: 'bold', color: '#fff'}}>Details</Text>
                                    </View>
                                </TouchableOpacity>
                            </Body>
                        </CardItem>
                    </Card>
                )
            })
        )
    }

    returnFooter(){
        if(this.state.at === 'Home'){
            return(
                <Footer>
                    <FooterTab style={{backgroundColor: "#fff"}}>
                        <Button onPress={()=>{
                            this.setState({at: 'Home'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/ghome.png')}/>
                        <Text>Home</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Search'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/filter.png')}/>
                        <Text>Search</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Places'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/find-places.png')}/>
                        <Text>Find Places</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Rest/Coffees'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/restaurants.png')}/>
                        <Text>Restaurants</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Activities'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/todo.png')}/>
                        <Text>Things To do</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            )
        } else if(this.state.at === 'Search'){
            return(
                <Footer>
                    <FooterTab style={{backgroundColor: "#fff"}}>
                        <Button onPress={()=>{
                            this.setState({at: 'Home'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/home.png')}/>
                        <Text>Home</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Search'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/gfilter.png')}/>
                        <Text>Search</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Places'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/find-places.png')}/>
                        <Text>Find Places</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Rest/Coffees'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/restaurants.png')}/>
                        <Text>Restaurants</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Activities'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/todo.png')}/>
                        <Text>Things To do</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            )
        } else if(this.state.at === 'Rest/Coffees'){
            return(
                <Footer>
                    <FooterTab style={{backgroundColor: "#fff"}}>
                        <Button onPress={()=>{
                            this.setState({at: 'Home'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/home.png')}/>
                        <Text>Home</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Search'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/filter.png')}/>
                        <Text>Search</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Places'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/find-places.png')}/>
                        <Text>Find Places</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Rest/Coffees'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/grestaurants.png')}/>
                        <Text>Restaurants</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Activities'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/todo.png')}/>
                        <Text>Things To do</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            )
        } else if(this.state.at === 'Places'){
            return(
                <Footer>
                    <FooterTab style={{backgroundColor: "#fff"}}>
                        <Button onPress={()=>{
                            this.setState({at: 'Home'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/home.png')}/>
                        <Text>Home</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Search'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/filter.png')}/>
                        <Text>Search</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Places'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/gfind-places.png')}/>
                        <Text>Find Places</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Rest/Coffees'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/restaurants.png')}/>
                        <Text>Restaurants</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Activities'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/todo.png')}/>
                        <Text>Things To do</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            )
        } else{
            return(
                <Footer>
                    <FooterTab style={{backgroundColor: "#fff"}}>
                        <Button onPress={()=>{
                            this.setState({at: 'Home'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/home.png')}/>
                        <Text>Home</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Search'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/filter.png')}/>
                        <Text>Search</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Places'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/find-places.png')}/>
                        <Text>Find Places</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Rest/Coffees'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/restaurants.png')}/>
                        <Text>Restaurants</Text>
                        </Button>
                        <Button onPress={()=>{
                            this.setState({at: 'Activities'});
                            }}>
                        <Image  style={{width: 20, height: 20}}
                                source={require('./assets/Icons/gtodo.png')}/>
                        <Text>Things To do</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            )
        }
    }

}

