import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeaderBackButton } from 'react-navigation';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Input,
  Icon,
  Footer,
  Row,
  Col,
  Spinner,
  View
} from 'native-base';
// Actions
import {
  getOrders,
  deleteOrder,
  incOrderQty,
  decOrderQty,
  updateTotalPrice,
  updateTotalPriceOrder
} from '../publics/redux/actions/orderActions';
// Helper
import { idrCurrency } from '../helper/helper';
// Components
import ButtonComponent from '../components/Button';
import AlertComponent from '../components/Alert';

class CartList extends Component {
  // state = {
  //   products: [],
  //   totalPrice: 0,
  //   spinner: true,
  //   showAlert: false
  // };

  static navigationOptions = ({ navigation }) => {
    const cartLength = navigation.getParam('cartLength');
    return {
      title: 'Daftar Belanja',
      headerStyle: {
        backgroundColor: '#303030',
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="orange"
          onPress={() => {
            navigation.navigate('ProductList', { cartLength });
          }}
        />
      ),
      headerTintColor: 'orange'
    };
  };

  componentDidUpdate(prevProps) {
    if (this.props.orders !== prevProps.orders) {
      this.props.updateTotalPrice(this.props.orders);
    }
  }

  componentDidMount() {
    this.props.getOrders();
    this.props.updateTotalPrice(this.props.orders);
  }

  handleDeleteConfimation = product => {
    Alert.alert(
      'Hapus Barang',
      `Apa kamu yakin ingin menghapus barang yang dipilih ?\n${
        product.products.name
      }`,
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Hapus',
          onPress: () => this.props.deleteOrder(product)
        }
      ],
      { cancelable: false }
    );
  };

  handlePressPay = () => {
    this.props.navigation.navigate('Payment');
  };

  handleIncrementQuantity = product => {
    this.props.incOrderQty(product);
  };

  handleDecrementQuantity = product => {
    this.props.decOrderQty(product);
  };

  render() {
    // const { products, totalPrice, spinner, showAlert } = this.state;
    const { orders, isLoading, totalPrice } = this.props;

    return (
      <Container>
        {isLoading ? (
          <Spinner color="#303030" />
        ) : orders.length === 0 ? (
          <Content
            contentContainerStyle={{ marginTop: '20%', alignItems: 'center' }}
          >
            <Icon name="cart" />
            <Text>Belum Ada Barang Di Keranjang Belanja Kamu</Text>
          </Content>
        ) : (
          <>
            <Content contentContainerStyle={{ backgroundColor: '#303030' }}>
              {orders.map((product, index) => (
                <Card key={index} noShadow transparent>
                  <CardItem
                    header
                    style={{
                      backgroundColor: '#303030'
                    }}
                  >
                    <Text>
                      <Icon name="cart" />
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Card
                        transparent
                        style={{
                          flex: 4
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>
                          {product.products.name}
                        </Text>
                        <Text style={{ fontSize: 20, color: '#303030' }}>
                          {idrCurrency(product.products.price)}
                        </Text>
                      </Card>
                      <Card
                        transparent
                        style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}
                      >
                        <Thumbnail
                          square
                          style={{ width: '100%', height: 70 }}
                          source={{ uri: product.products.image }}
                        />
                      </Card>
                    </Content>
                  </CardItem>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Content
                        contentContainerStyle={{
                          flexDirection: 'row'
                        }}
                      >
                        <ButtonComponent
                          iconName="remove"
                          onPress={() => this.handleDecrementQuantity(product)}
                        />
                        <Input
                          keyboardType="number-pad"
                          value={product.qty.toString()}
                          style={{
                            width: 5,
                            textAlign: 'center'
                          }}
                        />
                        <ButtonComponent
                          iconName="add"
                          onPress={() => this.handleIncrementQuantity(product)}
                        />
                      </Content>
                      <Card
                        transparent
                        style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}
                      >
                        <Icon
                          onPress={() => this.handleDeleteConfimation(product)}
                          style={{ color: '#303030' }}
                          name="trash"
                        />
                      </Card>
                    </Content>
                  </CardItem>
                  <CardItem
                    footer
                    style={{
                      backgroundColor: '#FAFAFA',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Content>
                      <Text style={{ color: '#9A9A9A' }}>SUB TOTAL</Text>
                      <Text style={{ fontSize: 25, color: '#303030' }}>
                        {idrCurrency(product.price)}
                      </Text>
                    </Content>
                  </CardItem>
                </Card>
              ))}
            </Content>
            <Footer style={{ backgroundColor: 'white', height: '10%' }}>
              <Row style={{ alignItems: 'center' }}>
                <Col style={{ padding: 10 }}>
                  <Text style={{ color: '#9A9A9A' }}>TOTAL BELANJA</Text>
                  <Text style={{ fontSize: 20, color: '#303030' }}>
                    {idrCurrency(totalPrice)}
                  </Text>
                </Col>
                <Col style={{ padding: 10 }}>
                  <ButtonComponent
                    onPress={() => this.handlePressPay()}
                    block={true}
                    buttonName="Bayar"
                  />
                </Col>
              </Row>
            </Footer>
          </>
        )}
      </Container>
    );
  }
}

CartList.propTypes = {
  orders: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  incOrderQty: PropTypes.func.isRequired,
  decOrderQty: PropTypes.func.isRequired,
  updateTotalPrice: PropTypes.func.isRequired,
  updateTotalPriceOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  totalPrice: state.order.totalPrice,
  message: state.order.message,
  isLoading: state.order.isLoading
});

const mapDispatchToProps = {
  getOrders,
  deleteOrder,
  incOrderQty,
  decOrderQty,
  updateTotalPrice,
  updateTotalPriceOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartList);
