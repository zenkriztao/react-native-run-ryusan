import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import {
  View,
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Footer,
  Button,
  Icon
} from 'native-base';
// Actions
import { loginUser, getUser } from '../publics/redux/actions/authActions';
// Component
import ButtonComponent from '../components/Button';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.navigation.navigate('Profile');
    }
  }

  componentDidMount() {
    // this._retrieveData();
    // this.props.getUser();
    this.props.getUser();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        this.props.navigation.navigate('Profile');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  handleUserLogin = () => {
    const userdata = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userdata);
  };

  static navigationOptions = () => {
    return {
      title: 'Ryusan',
      headerStyle: {
        backgroundColor: '#212121',
        height: 50,
        elevation: 0
      },
      headerTitleStyle: {
        color: 'orange',
        fontSize: 20
      },
      headerTitleContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
      }
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight:'bold' }}>LOGIN AKUN RYUSAN</Text>

          <View style={{ marginBottom: 30 }}>
            <Item>
              <Input
                style={{ fontSize: 15 }}
                onChangeText={email => this.setState({ email })}
                placeholder="Email / Username"
              />
            </Item>
            <Item>
              <Input
                style={{ fontSize: 15 }}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
              />
            </Item>
          </View>

          <Text style={{ fontSize: 15, color: '#939B9B' }}>
            Kamu Belum Punya Akun ?
          </Text>
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text
              style={{ color: 'orange', fontSize: 15, fontWeight: 'Bold' }}
            >
              Daftar Disini
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: '#939B9B' }}>
            Lupa Password ?
          </Text>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{ color: 'orange', fontSize: 15, fontWeight: 'bold' }}
            >
              Reset Password Disini
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: '#939B9B' }}>
            Belum Menerima Kode E-mail Konfirmasi ?
          </Text>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{ color: 'orange', fontSize: 15, fontWeight: 'bold' }}
            >
              Kirim Ulang Email Konfirmasi
            </Text>
            <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: 50,
              marginBottom: 30
            }}
          >
            ATAU
          </Text>

          <Button
            block
            iconLeft
            style={{ backgroundColor: '#4A439B', marginBottom: 20 }}
          >
            <Icon name="facebook-f" type="FontAwesome" />
            <Text uppercase={false} style={{ fontSize: 15 }}>
              Login Dengan FB
            </Text>
          </Button>
          <Button
            block
            iconLeft
            style={{ backgroundColor: '#E83A2B', marginBottom: 30 }}
          >
            <Icon name="google" type="FontAwesome" />
            <Text uppercase={false} style={{ fontSize:15 }}>
              Login Dengan Google
            </Text>
          </Button>
          </TouchableOpacity>
        </Content>
        <Footer
          style={{
            backgroundColor: 'black',
            padding: 10,
            paddingBottom: 10,
            height: 70
          }}
        >
          <View style={{ flex: 1 }}>
            <ButtonComponent
              onPress={() => this.handleUserLogin()}
              buttonName="Login"
              block={true}
            />
          </View>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.user
});

const mapDispatchToProps = {
  loginUser,
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
