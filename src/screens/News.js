import React from "react";
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title, Text} from "native-base";

export default class NewsScreen extends React.Component {
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
                    <Title>Новости</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Text>Список новостей</Text>
                </Content>
            </Container>
        );
    }
}
