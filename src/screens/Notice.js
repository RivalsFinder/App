import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { ListView } from 'react-native';
import { Container, Header,Title, Content, Button, Icon, List, Left, Right, Thumbnail, ListItem, Text, Body } from 'native-base';
const datas = [
 {ID1:1,NAME1:'Вася Пупкин',ID2:2,NAME2:'Петя Иванов',GAME:'Tennis',COMMENT:'You wanna play? Lets play!',TIME:'12:68',TYPE:0},
 {ID1:1,NAME1:'Вася Пупкин',ID2:2,NAME2:'Петя Иванов',GAME:'Darts',COMMENT:'You wanna play? Lets play!',TIME:'12:68',TYPE:0},
 {ID1:2,NAME1:'Петя Иванов',ID2:1,NAME2:'Вася Пупкин',GAME:'Billiards',COMMENT:'You wanna play? Lets play!',TIME:'12:68',TYPE:1},
 {ID1:1,NAME1:'Вася Пупкин',ID2:2,NAME2:'Петя Иванов',GAME:'Kicker',COMMENT:'You wanna play? Lets play!',TIME:'12:68',TYPE:2},
 {ID1:1,NAME1:'Вася Пупкин',ID2:2,NAME2:'Петя Иванов',GAME:'Tennis',COMMENT:'You wanna play? Lets play!',TIME:'12:68',TYPE:1},
];

class classname{
    username;
}
export default class NoticeScreen extends React.Component  {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: [],
    };
  }
  deleteRow(secId, rowId, rowMap,key) {

    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  componentDidMount(){
  var self = this;
    firebase.database().ref('Notice').on('value', function (snapshot){
     var arr = [];
    var obj = snapshot.val();
    Object.keys(obj).forEach(function(key){
    obj[key].uid = key;
    arr.push(obj[key]);
    });
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
                                               TIME: new Date().toLocaleString(),
                                               TYPE:t,
                                               timestamp: firebase.database.ServerValue.TIMESTAMP
                                            })
   }


  }

  render() {
  const gameImages={'Tennis':'https://img.icons8.com/ios/2x/ping-pong-filled.png',
                   'Darts':'https://img.icons8.com/ios/2x/goal-filled.png',
                   'Kicker':'https://img.icons8.com/ios/2x/football2-filled.png',
                   'Billiards':'https://img.icons8.com/ios/2x/billiards-filled.png'};
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

                <Thumbnail square style={{width: 30, height: 30}} source={{ uri: gameImages[data.GAME] }}/>
                </Left>
                <Body>
                  <Text>{data.NAME1}</Text>
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
        </Content>
      </Container>
    );
  }
}
