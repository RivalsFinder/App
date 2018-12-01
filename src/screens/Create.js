import React, { Component } from "react";
import firebase from 'react-native-firebase';
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



  saveAdv() {
  if ( !this.state.selectedGame) {
        alert('Заполните поля');
    } else {
    //create and send to db
    //if text is empty, notification will be without comment
      firebase.database().ref('Games').push({
            ID:1,
            NAME:'Вася Пупкин',
            GAME:this.state.selectedGame,
            COMMENT:this.state.text,
            TIME: new Date().toLocaleTimeString(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
       });
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
              style={{ marginLeft:40}}
              selectedValue={this.state.selectedGame}
              onValueChange={this.onValueChangeGame.bind(this)}
            >
            <Picker.Item label="Выберите игру" value={0}/>
            <Picker.Item label="Бильярд" value="Billiards" />
            <Picker.Item label="Дартс" value="Darts" />
            <Picker.Item label="Кикер" value="Kicker" />
            <Picker.Item label="Теннис" value="Tennis" />
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