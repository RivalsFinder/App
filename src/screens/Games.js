import React from "react";
import firebase from 'react-native-firebase';
import {ListView} from 'react-native';
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
    Thumbnail,
    List,
    ListItem, Spinner
} from "native-base";

export default class GamesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.tmp = null;
        this.firstLoad = true;
        this.state = {
            noteCount: 0,
            isThereGames: false,
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

    addNotice(data, isMy) {
        if (isMy) {
            firebase.database().ref('Games').child(data.uid).remove();
            return;
        }
        var user = firebase.auth().currentUser, name, uid;

        if (user) {
            name = user.displayName;
            uid = user.uid;
        } else {
            name = 'Шапокляк';
            uid = 'Uss3SHit2ohPrxvwFKI0o6lctth1';
        }
        var curDate = new Date().toLocaleTimeString();
        if (curDate.length < 8) {
            curDate = 0 + curDate;
        }
        curDate = curDate.slice(0, 5);
        firebase.database().ref('Notice').push({
            ID1: data.ID,
            NAME1: data.NAME,
            ID2: uid,
            NAME2: name,
            GAME: data.GAME,
            COMMENT: data.COMMENT,
            TIME: curDate,
            TYPE: 0,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.type !== prevState.type) {
            this.getGames();
        }
    }

    getGames() {
        var self = this, tmp;
        this.tmp && this.tmp.off();
        if (self.state.type !== 0) {
            tmp = firebase.database().ref('Games').orderByChild('GAME').equalTo(self.state.type);
        }
        else {
            tmp = firebase.database().ref('Games');
        }
        this.tmp = tmp;
        tmp.on('value', function (snapshot) {
            var arr = [], obj = snapshot.val();
            if (obj) {
                Object.keys(obj).forEach(function (key) {
                    obj[key].uid = key;
                    arr.push(obj[key]);
                });
                arr.sort(function (a, b) {
                    return b.timestamp - a.timestamp;
                });
                self.setState({isThereGames: true});
            } else {
                self.setState({isThereGames: false});
            }
            self.setState({listViewData: arr.slice()});
        })

    }

    componentDidMount() {
        firebase.notifications().onNotification(notification => {
            alert('Notification received!', notification);
        });
        this.getGames();
    }

    render() {
        var user = firebase.auth().currentUser, uid;
        var bad, empty;
        if (this.state.noteCount > 0) {
            bad = <Badge style={{marginLeft: -10}}><Text style={{}}>{this.state.noteCount}</Text></Badge>;
        }
        else {
            bad = undefined;
        }
        if (user) {
            uid = user.uid;
        } else {
            uid = 'Uss3SHit2ohPrxvwFKI0o6lctth1';
        }
        const gameImages = {
            'Tennis': require('../assets/Ping-pong.png'),
            'Darts': require('../assets/Darts.png'),
            'Kicker': require('../assets/Kicker.png'),
            'Billiards': require('../assets/Billiard.png')
        };
        if (!this.state.listViewData.length) {
            empty = this.firstLoad ? <Spinner/> : <Text note style={{
                textAlign: 'center',
                fontSize: 35
            }}>{"Пока нет уведомлений\n¯\\_(ツ)_/¯"}</Text>;
            this.firstLoad = false;
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
                    <List leftOpenValue={75} dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                          renderRow={data =>
                              <ListItem avatar>
                                  <Left>
                                      <Thumbnail square style={{width: 30, height: 30, marginLeft: 4}}
                                                 source={gameImages[data.GAME]}/>
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
                              <Button full onPress={this.addNotice.bind(this, data, data.ID === uid)}
                                      style={data.ID === uid ? {backgroundColor: '#cc1111'} : {backgroundColor: '#11dd11'}}>
                                  <Icon active name={data.ID === uid ? 'trash' : 'checkmark'}/>
                              </Button>}
                    />
                    {empty}
                </Content>
                <Button rounded onPress={() => this._addNewHot()}
                        style={{alignSelf: 'flex-end', bottom: 12, right: 12, position: 'absolute'}}>
                    <Icon name='add'/>
                </Button>
            </Container>
        );
    }
}
