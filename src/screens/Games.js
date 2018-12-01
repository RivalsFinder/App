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

export default class GamesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          type: 0,
          listViewData: [],
        };
     }

    _addNewHot() {
        this.props.navigation.navigate('CreatorScreen');
    }

    onValueChange(value) {
        this.setState({
            type: value
        });

    }
    componentDidUpdate(prevProps,prevState){
        if (this.state.type!==prevState.type)
            this.getGames();
    }
    getGames(){
        var self = this;
        var tmp;
        if (self.state.type!==0) {
            tmp = firebase.database().ref('Games').orderByChild('GAME').equalTo(self.state.type);
        }
        else{
            tmp=firebase.database().ref('Games');
        }
        tmp.on('value', function (snapshot){
        var arr = [];
            var obj = snapshot.val();
            if (obj){
            Object.keys(obj).forEach(function(key){
                obj[key].uid = key;
                arr.push(obj[key]);
                });
            }
             self.setState({listViewData: arr.slice()});
            })

    }
componentDidMount(){
  this.getGames();


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
                            <Icon name='notifications'/>
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
                            <Item label='Теннис' value='Tennis'/>
                            <Item label='Бильярд' value='Billiards'/>
                            <Item label='Кикер' value='Kicker'/>
                            <Item label='Дартс' value='Darts'/>
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
                              })}
                              style={{backgroundColor: '#11dd11'}}>
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
