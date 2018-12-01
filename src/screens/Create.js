import React, { Component } from "react";
import { Container, Header, Content, Icon, Item, Left, Body, Button, Right, Title, Picker, Form, Input } from "native-base";


export default class CreateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
    selectedGame :'',
    selectedTime: '',
    text: ''
    };
  }

  onValueChangeGame(value) {
    this.setState({
      selectedGame: value
    });
  }

  onValueChangeTime(value) {
    this.setState({
      selectedTime: value
    });
  }

  saveAdv() {
  if (!this.state.selectedTime || !this.state.selectedGame) {
        alert('Заполните поля');
    } else {
    //create and send to db
    //if text is empty, notification will be without comment
      this.props.navigation.navigate('GameScreen');
    }
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
            Новая игра
          </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.saveAdv()}>
              <Icon name='checkmark'/>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              placeholder="Выберите игру"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selectedGame}
              onValueChange={this.onValueChangeGame.bind(this)}
            >
            <Picker.Item label="Выберите игру" value={0}/>
            <Picker.Item label="Бильярд" value="Billiards" />
            <Picker.Item label="Дартс" value="Darts" />
            <Picker.Item label="Кикер" value="Kicker" />
            <Picker.Item label="Теннис" value="Tennis" />
          </Picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            placeholder="Актуальность"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={this.state.selectedTime}
            onValueChange={this.onValueChangeTime.bind(this)}
          >
            <Picker.Item label="Актуальность" value={0} />
            <Picker.Item label="Бессрочно" value={4} />
            <Picker.Item label="1 час" value={1} />
            <Picker.Item label="2 часа" value={2} />
            <Picker.Item label="3 часа" value={3} />
          </Picker>
          <Item>
            <Icon active name='create' />
            <Input onChangeText={(text) => this.setState({text: text})} placeholder="Введите комментарий..." />
          </Item>
        </Form>
        </Content>
      </Container>
    );
  }
}