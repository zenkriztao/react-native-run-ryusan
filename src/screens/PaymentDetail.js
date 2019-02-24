import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Content,
  View,
  Text,
  Card,
  Thumbnail,
  Spinner
} from 'native-base';
// Actions
import { getOrders } from '../publics/redux/actions/orderActions';
// Helper
import { idrCurrency } from '../helper/helper';
// Image
const bri_logo = require('../../assets/img/bri_logo.png');
// Components
import ButtonComponent from '../components/Button';

class PaymentDetail extends Component {
  static navigationOptions = () => {
    return {
      headerLeft: null,
      headerTransparent: true
    };
  };

  async componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const {
      orders,
      customer,
      isLoading,
      totalPriceOrders,
      courier
    } = this.props;

    return (
      <Container>
        <Content contentContainerStyle={{ backgroundColor: '#F5F5F5' }}>
          {isLoading ? (
            <Spinner color="#303030" />
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 20 }}>ID Pemesanan</Text>
                <Text style={{ fontSize: 20 }}>93DKJFI</Text>
              </View>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 20 }}>Total Belanja :</Text>
                <Text style={{ fontSize: 20, color: '#303030' }}>
                  {idrCurrency(totalPriceOrders)}
                </Text>
              </Card>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    alignSelf: 'flex-start',
                    marginBottom: 10
                  }}
                >
                  Instruksi Pembayaran :
                </Text>
                <Thumbnail
                  style={{ flex: 1, minHeight: 100, width: 120 }}
                  large
                  square
                  source={bri_logo}
                />
                <Text style={{ fontSize: 20 }}>2877499293</Text>
                <Text style={{ fontSize: 20 }}>PT PAYMENT SEJAHTERA</Text>
              </Card>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white'
                }}
              >
                <Text style={{ fontSize: 17, marginBottom: 10 }}>
                  Alamat Pengiriman :
                </Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  {customer.name}
                </Text>
                <Text style={{ fontSize: 17 }}>
                  {customer.street} {customer.city} {customer.prov}
                </Text>
                <Text>{customer.email}</Text>
                <Text>{customer.tlp}</Text>
              </Card>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white'
                }}
              >
                <Text style={{ fontSize: 17, marginBottom: 10 }}>
                  Daftar Belanja :
                </Text>
                {orders.map((product, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      marginBottom: 10
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
                        flexDirection: 'column',
                        marginBottom: 10
                      }}
                    >
                      <Text style={{ fontSize: 17 }}>
                        {product.products.name}
                      </Text>
                      <Text style={{ fontSize: 17 }}>Qty : {product.qty}</Text>
                    </View>
                  </View>
                ))}
              </Card>
              <ButtonComponent block={true} buttonName="Selesai" />
            </>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  customer: state.order.customer,
  totalPriceOrders: state.order.totalPriceOrders,
  courier: state.order.courier,
  isLoading: state.order.isLoading
});

const mapDispatchToProps = {
  getOrders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetail);
