import React from 'react';
import {
  Container, Content, Button, Icon, Left, Text, Header, Right, Body, Title
} from 'native-base';

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      actual: 0,
      text: ''
    };
  }

  saveAdv() {
    this.props.navigation.navigate('GameScreen');
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='close'/>
            </Button>
          </Left>
          <Body>
          <Title>
            Создание
          </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.saveAdv()}>
              <Icon name='checkmark'/>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Text>Форма создания</Text>
        </Content>
      </Container>
    );
  }
}
