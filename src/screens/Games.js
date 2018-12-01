import React from "react";
import firebase from 'react-native-firebase';
import { ListView } from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    Picker,
    Item,
    Footer,
    Thumbnail,
    TextLeft,
    FooterTab,
    Badge,
    List,
    ListItem
} from "native-base";

today = new Date();
const datas = [
  {NAME:'Simon Mignolet', GAME:'теннис'},
  {NAME:'Nathaniel Clyne',GAME:'кикер'},

];
export default class GamesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          basic: true,
          listViewData: datas,
        };
     }

    _addNewHot() {
        this.props.navigation.navigate('CreatorScreen');
    }

    onValueChange(value) {
        this.setState({
            type: value
        });
        //tyt'
//        switch(value)
//        case 0: //подтягиваем всю бд
//        case 1: data
    }
componentDidMount(){
  var self = this;
    firebase.database().ref('Games').on('value', function (snapshot){
     var arr = [];
    var obj = snapshot.val();
    Object.keys(obj).forEach(function(key){
    obj[key].uid = key;
    arr.push(obj[key]);
    });
     self.setState({listViewData: arr.slice()});
    })

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
                        <Button transparent onPress={() => this.props.navigation.navigate('NoticeScreen')}>
                            <Icon name='person'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Игры</Title>
                    </Body>
                    <Right>
                        <Picker
                            style={{color: '#FFF'}}
                            selectedValue={this.state.type}
                            mode='dropdown'
                            onValueChange={this.onValueChange.bind(this)}>
                            <Item label='Все игры' value={0}/>
                            <Item label='Теннис' value={1}/>
                            <Item label='Бильярд' value={2}/>
                            <Item label='Кикер' value={3}/>
                        </Picker>
                    </Right>
                </Header>
                <Content>
                    <List
                        leftOpenValue={75}
                        rightOpenValue={0}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                          <ListItem avatar>
                              <Left>
                                <Thumbnail square style={{width: 30, height: 30}} source={{ uri: gameImages[data.GAME] }}/>
                              </Left>
                              <Body>
                                <Text>{data.NAME}</Text>
                                <Text note>{data.COMMENT}</Text>
                              </Body>
                              <Right>
                                <Text>{data.TIME}</Text>
                              </Right>
                        </ListItem>
                        }
                        renderLeftHiddenRow={data =>
                          <Button full onPress={() => firebase.database().ref('Notice').push({
                                                                        ID1:data.ID,
                                                                        NAME1:data.NAME,
                                                                        ID2:1,
                                                                        NAME2:'Вася Пупкин',
                                                                        GAME:data.GAME,
                                                                        COMMENT:data.COMMENT,
                                                                        TIME: new Date().toLocaleString(),
                                                                        TYPE:0,
                                                                        timestamp: firebase.database.ServerValue.TIMESTAMP
                                                                     })} style={{backgroundColor: '#11dd11'}}>
                            <Icon active name="checkmark" />
                          </Button>}
                    />
                </Content>
                <Button rounded onPress={() => this._addNewHot()} style={{alignSelf: 'flex-end', margin: 12}}>
                    <Icon name='add'/>
                </Button>
            </Container>
        );
    }
}
