import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Card,
  CardItem,
  Form,
  Item,
  Label,
  Input,
  Text,
  Picker,
  Icon,
  Thumbnail,
  Spinner,
  View,
  Row,
  Col,
  Footer,
  H2
} from 'native-base';
// Actions
import {
  getOrders,
  pickCourier,
  updateTotalPriceOrder,
  createCustomer
} from '../publics/redux/actions/orderActions';
// Helper
import { idrCurrency } from '../helper/helper';
// Services
import { getTotalPrice } from '../services/fakeCartServices';
// Components
import ButtonComponent from '../components/Button';

class Payment extends Component {
  static navigationOptions = () => {
    return {
      title: 'Pembayaran',
      headerStyle: {
        backgroundColor: '#303030'
      },
      headerTintColor: '#fff'
    };
  };

  handleCourierChange = courier => {
    let courierInState = this.props.couriers.find(c => c.name === courier);
    let price = this.props.totalPrice + courierInState.price;

    this.props.pickCourier(courierInState);
    this.props.updateTotalPriceOrder(price);
  };

  componentDidMount() {
    let price = this.props.totalPrice + this.props.courier.price;

    this.props.getOrders();
    this.props.updateTotalPriceOrder(price);
  }

  handlePressPay = () => {
    this.props.navigation.navigate('PaymentDetail');
  };

  render() {
    const { couriers, courier, customer } = this.props;
    const { orders, totalPriceOrders, totalPrice, isLoading } = this.props;

    return (
      <Container>
        {isLoading ? (
          <Spinner color="#303030" />
        ) : (
          <>
            <Content
              contentContainerStyle={{
                padding: 10,
                backgroundColor: '#F5F5F5'
              }}
            >
              <Text>Data Pembeli</Text>
              <Card noShadow style={{ padding: 5, paddingBottom: 20 }}>
                <Form>
                  <Item stackedLabel>
                    <Label>Nama Pembeli</Label>
                    <Input
                      value={customer.name}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(customer, {
                            name: value
                          })
                        )
                      }
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Email Pembeli</Label>
                    <Input
                      value={customer.email}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(customer, {
                            email: value
                          })
                        )
                      }
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Telepon/Handphone</Label>
                    <Input
                      keyboardType="number-pad"
                      value={customer.tlp}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(customer, {
                            tlp: value
                          })
                        )
                      }
                    />
                  </Item>
                </Form>
              </Card>
              <Text style={{ marginTop: 20 }}>Alamat Pengiriman</Text>
              <Card noShadow style={{ padding: 5, paddingBottom: 20 }}>
                <Form>
                  <Item stackedLabel>
                    <Label>Provinsi</Label>
                    <Input
                      value={customer.prov}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(customer, {
                            prov: value
                          })
                        )
                      }
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Kota</Label>
                    <Input
                      value={customer.city}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(customer, {
                            city: value
                          })
                        )
                      }
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Jalan</Label>
                    <Input
                      value={customer.street}
                      onChangeText={value =>
                        this.setState(
                          Object.assign(customer, {
                            street: value
                          })
                        )
                      }
                    />
                  </Item>
                </Form>
              </Card>
              <Text style={{ marginTop: 20 }}>
                Daftar Belanja dan Pengiriman
              </Text>
              <Card noShadow style={{ paddingBottom: 20 }}>
                <CardItem
                  style={{ flex: 1, alignItems: 'flex-start', padding: 0 }}
                >
                  <Content contentContainerStyle={{ padding: 0 }}>
                    <Content
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 0
                      }}
                    >
                      <Text>Barang</Text>
                      <Text>Sub Total</Text>
                    </Content>
                    {orders.map((product, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: 'gray'
                        }}
                      >
                        <Thumbnail
                          large
                          style={{
                            backgroundColor: 'green',
                            flex: 0.3,
                            borderRadius: 10
                          }}
                          square
                          source={{ uri: product.products.image }}
                        />
                        <View
                          style={{
                            flex: 1,
                            paddingHorizontal: 10,
                            flexDirection: 'column',
                            marginBottom: 10
                          }}
                        >
                          <Text style={{ fontSize: 17 }}>
                            {product.products.name}
                          </Text>
                          <Text style={{ fontSize: 17 }}>
                            Qty : {product.qty}
                          </Text>
                          <Text style={{ fontSize: 17 }}>
                            {idrCurrency(product.products.price)}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 17,
                            alignSelf: 'flex-end',
                            marginBottom: 10
                          }}
                        >
                          {idrCurrency(product.price)}
                        </Text>
                      </View>
                    ))}

                    <View style={{ marginTop: 20 }}>
                      <Form>
                        <Label>Jasa Pengiriman</Label>

                        <Item picker>
                          <Picker
                            inlineLabel
                            mode="dialog"
                            iosIcon={<Icon name="arrow-down" />}
                            selectedValue={courier.name}
                            onValueChange={this.handleCourierChange.bind(this)}
                          >
                            {couriers.map((courier, index) => (
                              <Picker.Item
                                key={index}
                                label={`${courier.name}\t-\t${idrCurrency(
                                  courier.price
                                )}`}
                                value={courier.name}
                              />
                            ))}
                          </Picker>
                        </Item>
                      </Form>
                    </View>
                    <Content
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 20
                      }}
                    >
                      <Text>Harga Barang</Text>
                      <Text>{idrCurrency(totalPrice)}</Text>
                    </Content>
                    <Content
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 20
                      }}
                    >
                      <Text>Biaya Kirim (J&T REG)</Text>
                      <Text>{idrCurrency(courier.price)}</Text>
                    </Content>
                    <Content
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20
                      }}
                    >
                      <Text>Sub Total</Text>
                      <Text>{idrCurrency(totalPriceOrders)}</Text>
                    </Content>
                  </Content>
                </CardItem>
              </Card>

              <Card
                noShadow
                style={{ marginTop: 20, padding: 5, paddingBottom: 20 }}
              >
                <CardItem header>
                  <H2>Ringkasan Belanja</H2>
                </CardItem>
                <Content contentContainerStyle={{ paddingHorizontal: 20 }}>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row'
                    }}
                  >
                    <Text>Harga Barang</Text>
                    <Text>{idrCurrency(totalPrice)}</Text>
                  </Content>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20
                    }}
                  >
                    <Text>Biaya Kirim (J&T REG)</Text>
                    <Text>{idrCurrency(courier.price)}</Text>
                  </Content>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20
                    }}
                  >
                    <Text>Sub Total</Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#303030'
                      }}
                    >
                      {idrCurrency(totalPriceOrders)}
                    </Text>
                  </Content>
                </Content>
              </Card>
            </Content>
            <Footer style={{ backgroundColor: 'white', height: '10%' }}>
              <Row style={{ alignItems: 'center' }}>
                <Col style={{ padding: 10 }}>
                  <Text style={{ color: '#9A9A9A' }}>Total Harga Barang</Text>
                  <Text style={{ fontSize: 20, color: '#303030' }}>
                    {idrCurrency(totalPriceOrders)}
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

const mapStateToProps = state => ({
  orders: state.order.orders,
  couriers: state.order.couriers,
  courier: state.order.courier,
  customer: state.order.customer,
  isLoading: state.order.isLoading,
  totalPrice: state.order.totalPrice,
  totalPriceOrders: state.order.totalPriceOrders
});

const mapDispatchToProps = {
  getOrders,
  pickCourier,
  updateTotalPriceOrder,
  createCustomer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
