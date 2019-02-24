import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Modal } from 'react-native';
import {
  Text,
  View,
  Container,
  Content,
  Label,
  Item,
  Form,
  Input,
  Button,
  Icon,
  Toast
} from 'native-base';
// Actions
import { registerUser } from '../publics/redux/actions/authActions';
// Component
import ButtonComponent from '../components/Button';
import InfoSlider from 'react-native-infoslider';

class Register extends Component {
  state = {
    user: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    modalVisible: false,
    dataSource: [
      {
        image: require('../../assets/img_slide_register/01.png')
      },
      {
        image: require('../../assets/img_slide_register/02.png')
      },
      {
        image: require('../../assets/img_slide_register/03.png')
      },
      {
        image: require('../../assets/img_slide_register/04.png')
      }
    ]
  };

  static navigationOptions = () => {
    return {
      title: 'Daftarkan Game-mu',
      headerStyle: {
        backgroundColor: '#212121',
        height: 70,
        elevation: 0
      },
      headerTitleStyle: {
        fontSize: 20
      },
      headerTintColor: '#fff'
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.error_message !== prevProps.error_message) {
      Toast.show({
        text: this.props.error_message.error,
        buttonText: 'Okay',
        duration: 2000,
        type: 'danger'
      });
    }
    if (this.props.user.token) {
      this.props.navigation.navigate('Login');
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleUserRegister = () => {
    const { user } = this.state;

    this.props.registerUser(user);
    this.setModalVisible(false);
  };

  render() {
    const { user } = this.state;

    return (
      <Container>
        <Content padder contentContainerStyle={{ alignItems: 'center' }}>
          <View style={{ marginBottom: 30, height: 300 }}>
            <InfoSlider
              style={{ backgroundColor: 'blue' }}
              data={this.state.dataSource}
              showDots={true}
              activeDotColor="#212121"
              loop={true}
              autoplay={true}
            />
          </View>
          <Button
            onPress={() => {
              this.setModalVisible(true);
            }}
            block
            style={{ height: 70, backgroundColor: 'orange', marginBottom: 30 }}
          >
            <Text uppercase={false} style={{ fontSize:  15 }}>
              Daftarkan Dengan Email dan No.Hp
            </Text>
          </Button>
          <Text style={{ fontSize: 15, marginBottom: 30 }}>
            Atau Daftar Dengan
          </Text>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30
            }}
          >
            <Button
              iconLeft
              style={{
                backgroundColor: '#FAFAFA',
                height: 50,
                flex: 1,
                marginRight: 20,
                justifyContent: 'center'
              }}
            >
              <Icon
                style={{ color: '#4A439B' }}
                name="facebook-f"
                type="FontAwesome"
              />
              <Text uppercase={false} style={{ fontSize: 20, color: '#233' }}>
                Facebook
              </Text>
            </Button>
            <Button
              iconLeft
              style={{
                backgroundColor: '#FAFAFA',
                height: 50,
                flex: 1,
                marginLeft: 20,
                justifyContent: 'center'
              }}
            >
              <Icon
                style={{ color: '#E83A2B' }}
                name="google"
                type="FontAwesome"
              />
              <Text uppercase={false} style={{ fontSize: 20, color: '#233' }}>
                Google
              </Text>
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ fontSize: 20 }}> Sudah punya akun login ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={{ color: '#303030', fontSize: 20 }}>
                Login disini
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal Registration */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <Container style={{ marginTop: 22 }}>
              <Content padder>
                <Form>
                  <Item stackedLabel>
                    <Label>Nama Lengkap</Label>
                    <Input
                      style={{ fontSize: 25 }}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(user, {
                            username: value
                          })
                        )
                      }
                    />
                  </Item>
                  <Item stackedLabel last>
                    <Label>Email atau Nomor Handphone</Label>
                    <Input
                      style={{ fontSize: 25 }}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(user, {
                            email: value
                          })
                        )
                      }
                    />
                  </Item>
                  <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input
                      style={{ fontSize: 25 }}
                      secureTextEntry={true}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(user, {
                            password: value
                          })
                        )
                      }
                    />
                  </Item>
                  <Item stackedLabel last>
                    <Label>Konfirmasi Password</Label>
                    <Input
                      style={{ fontSize: 25 }}
                      secureTextEntry={true}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(user, {
                            password_confirmation: value
                          })
                        )
                      }
                    />
                  </Item>
                </Form>
                <Button
                  onPress={() => {
                    this.handleUserRegister();
                  }}
                  block
                  style={{
                    height: 70,
                    backgroundColor: '#303030',
                    marginBottom: 30
                  }}
                >
                  <Text uppercase={false} style={{ fontSize: 20 }}>
                    Daftar
                  </Text>
                </Button>
                <Button
                  block
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={{
                    height: 70,
                    backgroundColor: '#303030',
                    marginBottom: 30
                  }}
                >
                  <Text uppercase={false} style={{ fontSize: 20 }}>
                    Batal
                  </Text>
                </Button>
              </Content>
            </Container>
          </Modal>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    error_message: state.auth.error_message,
    user: state.auth.user
  };
};

const mapDispatchToProps = {
  registerUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
