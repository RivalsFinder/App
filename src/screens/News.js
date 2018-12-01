import React from "react";
import {Linking, StyleSheet} from "react-native";
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title, Text, List, ListItem} from "native-base";

export default class NewScreen extends React.Component {
    _openNews(url) {
        Linking.openURL(url);
    }
    constructor(props) {
        super(props);
        this.state = {
          listViewData: [],
        };
      }

      componentDidMount() {
        var self = this, arr = [];
        fetch('https://rivalsfinder.herokuapp.com/news')
        .then(res=>res.json())
        .then(body=>{
            body.items.forEach(function(elem) {
                var element = JSON.parse(elem);
                element.Date = new Date(Date.parse(element.Date)).toLocaleDateString();
                arr.push(element);
            })
            self.setState({
                listViewData: [...arr]
            });
        });
      }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('NoticeScreen')}>
                            <Icon name='person'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Новости</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <List dataArray={this.state.listViewData}
            renderRow={(data) =>
                    <ListItem avatar onPress={this._openNews.bind(this, data.Link)}>
                        <Body>
                            <Text note >{data.Name}</Text>
                            <Text style={styles.titleText} numberOfLines={2}>{data.Title}</Text>
                            <Text style={styles.baseText} numberOfLines={3}>{data.Text}</Text>
                        </Body>
                        <Right>
                            <Text note>{data.Date}</Text>
                        </Right>
                    </ListItem>
            
            }>
          </List>
                </Content>
            </Container>
        );
        
    }
}

const styles = StyleSheet.create({
    baseText: {
      fontSize: 16,
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
