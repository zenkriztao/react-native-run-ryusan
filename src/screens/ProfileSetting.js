import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { ListItem, Container, Content, List, Text, Button } from 'native-base';

class ProfileSetting extends Component {
  static navigationOptions = () => {
    return {
      title: 'Pengaturan',
      headerStyle: {
        backgroundColor: '#303030',
        height: 70,
        elevation: 0
      },
      headerTitleStyle: {
        fontSize: 20
      },
      headerTintColor: '#fff'
    };
  };

  _removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      this.props.navigation.navigate('Login');
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text> Informasi Akun </Text>
            </ListItem>
            <ListItem>
              <Text> Alamat Saya </Text>
            </ListItem>
            <ListItem>
              <Text> Pesan</Text>
            </ListItem>
            <ListItem>
              <Text> Kebijakan </Text>
            </ListItem>
            <ListItem>
              <Text> Bantuan </Text>
            </ListItem>
          </List>
          <Button
            style={{ backgroundColor: '#303030', height: 50 }}
            block
            onPress={() => this._removeData()}
          >
            <Text uppercase={false} style={{ fontSize: 18 }}>
              Logout
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default ProfileSetting;
