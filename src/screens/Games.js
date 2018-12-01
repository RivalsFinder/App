import React from "react";
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
  {name:'Simon Mignolet', game:'теннис'},
  {name:'Nathaniel Clyne',game:'кикер'},
  {name:'Dejan Lovren',game:'кикер'},
  {name:'Mama Sakho',game:'кикер'},
  {name:'Alberto Moreno',game:'теннис'},
  {name:'Emre Can',game:'теннис'},
  {name:'Joe Allen',game:'теннис'},
  {name:'Phil Coutinho',game:'теннис'}
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

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
      }

    render() {
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
                                <Thumbnail source={{ uri: 'data:image/png;base64,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' }} />
                              </Left>
                              <Body>
                                <Text>{data.name + 'приглашает в ' + data.game}</Text>
                                <Text note>{}</Text>
                              </Body>
                              <Right>
                                <Text note>{(today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getMinutes() + ':' + today.getSeconds()}</Text>
                              </Right>
                        </ListItem>
                        }
                        renderLeftHiddenRow={data =>
                          <Button full onPress={() => alert(data)} style={{backgroundColor: '#11dd11'}}>
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
