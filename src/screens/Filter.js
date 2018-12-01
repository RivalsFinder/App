import React from "react";
import {Body, Button, Container, Content, Header, Icon, Left, ListItem, Text} from "native-base";

export default class FilterScreen extends React.Component {
  _filterList(type) {
    this.props.navigation.navigate('HotScreen', {
      filter: type
    });
  }

  render() {
    return (
      <Container>
        <Header/>
        <Content>
          <ListItem icon onPress={() => this._filterList(5)}>
            <Left>
              <Button>
                <Icon name="list"/>
              </Button>
            </Left>
            <Body>
            <Text>Все виды</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this._filterList(1)}>
            <Left>
              <Button>
                <Icon name="tennisball"/>
              </Button>
            </Left>
            <Body>
            <Text>Теннис</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this._filterList(2)}>
            <Left>
              <Button>
                <Icon name="contrast"/>
              </Button>
            </Left>
            <Body>
            <Text>Бильярд</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this._filterList(3)}>
            <Left>
              <Button>
                <Icon name="football"/>
              </Button>
            </Left>
            <Body>
            <Text>Кикер</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this._filterList(4)}>
            <Left>
              <Button>
                <Icon name="locate"/>
              </Button>
            </Left>
            <Body>
            <Text>Дартс</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
