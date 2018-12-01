import React, { Component } from 'react';
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
      listViewData: datas,
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
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
              <Button full style={data.TYPE==0?{ backgroundColor: '#11dd11' }:(data.TYPE==1?{ backgroundColor: '#cc1111' }:{backgroundColor: '#cc1111'})}
              onPress={data.TYPE==0?() => alert(data):_ => this.deleteRow(secId, rowId, rowMap)}>

                <Icon active name={data.TYPE==0?"checkmark":"trash"} />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full style={data.TYPE==0?{ backgroundColor: '#ee1111' }:(data.TYPE==1?{ backgroundColor: '#cc1111' }:{backgroundColor: '#cc1111'})}
              onPress={_ => this.deleteRow(secId, rowId, rowMap)}>

                <Icon active name={data.TYPE==0?"close":"trash"} />
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}
