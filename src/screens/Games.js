import React from "react";
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
    Item
} from "native-base";

export default class GamesScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            type: 0
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

    render() {
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
                            selectedValue={this.state.type}
                            mode='dropdown'
                            onValueChange={this.onValueChange.bind(this)}>
                            <Item label='Все' value={0}/>
                            <Item label='Теннис' value={1}/>
                            <Item label='Бильярд' value={2}/>
                            <Item label='Кикер' value={3}/>
                        </Picker>
                    </Right>
                </Header>
                <Content>
                    <Text>Список игр</Text>
                </Content>
                <Button rounded onPress={() => this._addNewHot()} style={{alignSelf: 'flex-end', margin: 12}}>
                    <Icon name='add'/>
                </Button>
            </Container>
        );
    }
}
