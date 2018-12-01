import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { ListView } from 'react-native';
import { Container, Header,Title, Content, Button, Icon, List, Left, Right, Thumbnail, ListItem, Text, Body } from 'native-base';

class classname{
    username;
}
export default class NoticeScreen extends React.Component  {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      isThereNotes:false,
      listViewData: [],
    };
  }

  componentDidMount(){
  var self = this;
    firebase.database().ref('Notice').on('value', function (snapshot){
        var arr = [];
        var obj = snapshot.val();
        self.state.isThereNotes=false;
        if (obj){

            self.state.isThereNotes=true;
            Object.keys(obj).forEach(function(key){
                obj[key].uid = key;
                arr.push(obj[key]);
            });
        }
        self.setState({listViewData: arr.slice()});
    })

  }

  clickHandler(data,t) {
    console.log(data);
    firebase.database().ref('Notice').child(data.uid).remove();
    if (!data.TYPE) {
       firebase.database().ref('Notice').push({
                                               ID1:data.ID2,
                                               NAME1:data.NAME2,
                                               ID2:data.ID1,
                                               NAME2:data.NAME1,
                                               GAME:data.GAME,
                                               COMMENT:data.COMMENT,
                                               TIME: new Date().toLocaleTimeString(),
                                               TYPE:t,
                                               timestamp: firebase.database.ServerValue.TIMESTAMP
                                            })
    }
  }

  render() {
  const gameImages={'Tennis':require('../assets/Ping-pong.png'),
                    'Darts':require('../assets/Darts.png'),
                    'Kicker':require('../assets/Kicker.png'),
                    'Billiards':require('../assets/Billiard.png')};
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back'/>
          </Button>
          </Left>
          <Body>
            <Title>Notifications</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem avatar style={data.TYPE==0?{ backgroundColor: '#ddddff' }:(data.TYPE==1?{ backgroundColor: '#ddffdd' }:{backgroundColor: '#ffdddd'})}>
                <Left >

                <Thumbnail square style={{width: 30, height: 30, marginLeft: 4}} source={gameImages[data.GAME]}/>
                </Left>
                <Body>
                  <Text>{data.NAME2}</Text>
                  <Text note>{data.COMMENT}</Text>

                </Body>
                <Right>
                  <Text note>{data.TIME}</Text>
                </Right>
              </ListItem>}

            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full style={data.TYPE==0?{ backgroundColor: '#11dd11' }:{backgroundColor: '#cc1111'}}
              onPress={this.clickHandler.bind(this, data, 1)}>

                <Icon active name={data.TYPE==0?"checkmark":"trash"} />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full style={data.TYPE==0?{ backgroundColor: '#ee1111' }:(data.TYPE==1?{ backgroundColor: '#cc1111' }:{backgroundColor: '#cc1111'})}
              onPress={this.clickHandler.bind(this, data, 2)}>
                <Icon active name={data.TYPE==0?"close":"trash"} />
              </Button>}
          />
          <Text note style={{textAlign:'center', fontSize:35}}>{this.state.isThereNotes==false?"Пока нет уведомлений\n¯\\_(ツ)_/¯":""}</Text>

        </Content>
      </Container>
    );
  }
}
