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
          noteCount:0,
          isThereGames:false,
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
            self.state.isThereGames=false;
            if (obj){

            self.state.isThereGames=true;
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
    const gameImages={'Tennis':require('../assets/Ping-pong.png'),
                       'Darts':require('../assets/Darts.png'),
                       'Kicker':require('../assets/Kicker.png'),
                       'Billiards':require('../assets/Billiard.png')};
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var bad;
        if (this.state.noteCount>0){
            bad=<Badge style={{marginLeft:-10}}><Text style={{}}>{this.state.noteCount}</Text></Badge>;
        }
        else{
            bad=undefined;
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('NoticeScreen')}>
                            <Icon name='notifications'/>
                            {bad}
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
                                <Thumbnail square style={{width: 30, height: 30, marginLeft: 4}} source={gameImages[data.GAME]}/>
                              </Left>
                              <Body>
                                <Text>{data.NAME}</Text>
                                <Text note>{data.COMMENT}</Text>
                              </Body>
                              <Right>
                                <Text note>{data.TIME}</Text>
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
                                  TIME: new Date().toLocaleTimeString(),
                                  TYPE:0,
                                  timestamp: firebase.database.ServerValue.TIMESTAMP
                              })}
                              style={{backgroundColor: '#11dd11'}}>
                            <Icon active name="checkmark" />
                          </Button>}
                    />
                    <Text note style={{textAlign:'center', fontSize:35}}>{this.state.isThereGames==false?"Пока нет предложений\n¯\\_(ツ)_/¯":""}</Text>
                </Content>
                <Button rounded onPress={() => this._addNewHot()} style={{alignSelf: 'flex-end', margin: 12}}>
                    <Icon name='add'/>
                </Button>
            </Container>
        );
    }
}
