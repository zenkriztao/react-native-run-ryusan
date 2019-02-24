import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { HeaderBackButton } from 'react-navigation';
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  Footer,
  Row,
  Col,
  Spinner,
  CardItem
} from 'native-base';
// Product
import { getProduct } from '../publics/redux/actions/productActions';
import { createOrder } from '../publics/redux/actions/orderActions';
// Utils
import { REST_API } from '../utils/constants';
// Helper
import { idrCurrency } from '../helper/helper';
// Components
import ButtonComponent from '../components/Button';

class ProductDetail extends Component {
  state = {
    name: '',
    image: 'default',
    price: '',
    description: '',
    data: [],
    spinner: true,
    cart: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#303030"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  componentWillReceiveProps(nextProps) {
    const { name, image, price, description } = nextProps.product;

    this.setState({
      name,
      image,
      price,
      description
    });
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;

    this.props.getProduct(id);
  }

  handlePressAdd = product => {
    this.props.createOrder(product);
  };

  handlePressBuy = product => {
    const { handlePressBuyItem } = this.props.navigation.state.params;

    handlePressBuyItem(product);

    this.props.navigation.navigate('CartList');
  };

  render() {
    const { name, image, price, description } = this.state;
    const { isLoading } = this.props;

    return (
      <Container>
        {isLoading ? (
          <Spinner color="#303030" />
        ) : (
          <>
            <Content
              contentContainerStyle={{
                backgroundColor: '#EFF0F4'
              }}
            >
              <Card
                noShadow
                style={{
                  margin: 0,
                  padding: 0,
                  marginBottom: 10,
                  borderColor: 'white'
                }}
              >
                <Thumbnail
                  square
                  source={{ uri: image }}
                  style={{
                    height: 400,
                    width: null,
                    flex: 1
                  }}
                />
                <CardItem>
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                    {name}
                  </Text>
                </CardItem>
                <CardItem>
                  <Text
                    style={{
                      fontSize: 23,
                      color: '#303030',
                      fontWeight: 'bold'
                    }}
                  >
                    {idrCurrency(price)}
                  </Text>
                </CardItem>
              </Card>

              <Card
                noShadow
                style={{
                  padding: 10,
                  marginBottom: 10,
                  borderColor: 'white'
                }}
              >
                <Text
                  style={{ fontSize: 25, color: '#4E4E4E', fontWeight: 'bold' }}
                >
                  Informasi Barang
                </Text>
                <Text style={{ marginTop: 5, color: '#9A9A9A' }}>
                  {description}
                </Text>
              </Card>
            </Content>
            <Footer
              style={{
                backgroundColor: '#FFFF',
                height: '10%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1
              }}
            >
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: 5
                }}
              >
                <Col style={{ marginRight: 3 }}>
                  <ButtonComponent
                    onPress={() => this.handlePressAdd(this.props.product)}
                    buttonColor="#f5f5f5"
                    textColor="#303030"
                    block={true}
                    buttonName="Tambah"
                  />
                </Col>
                <Col style={{ marginLeft: 3 }}>
                  <ButtonComponent
                    onPress={() => this.handlePressBuy(this.state.data)}
                    buttonColor="#62DE55"
                    block={true}
                    buttonName="Beli Sekarang"
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

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product.product,
  isLoading: state.product.isLoading
});

const mapDispatchToProps = {
  getProduct,
  createOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
