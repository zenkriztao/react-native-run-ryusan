import React from 'react';
import { Header, Body, Title, Right, Badge, Left, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

// Data Services
import { getProducts } from '../services/fakeCartServices';

const AppBar = props => {
  const { showBackNav = true, showCartNav = true, title, cart } = props;
  // const cart = getProducts().length;

  return (
    <Header
      androidStatusBarColor="#212121"
      transparent
      style={{ backgroundColor: '#212121' }}
    >
      <Left style={{ flex: 1 }}>
        {showBackNav ? (
          <Button
            onPress={() =>
              // Actions.productList({ totalCart: getProducts().length })
              Actions.popTo('productList')
            }
            transparent
            transparent={true}
            iconName="arrow-back"
          />
        ) : (
          <Button
            onPress={() => alert('Menu')}
            transparent
            transparent={true}
            iconName="menu"
          />
        )}
      </Left>
      <Body style={{ flex: 1, alignItems: 'center' }}>
        <Title>{title}</Title>
      </Body>
      <Right style={{ flex: 1 }}>{renderCartButton(showCartNav, cart)}</Right>
    </Header>
  );
};

const renderCartButton = (showCartNav, cart) => {
  if (showCartNav) {
    return (
      <>
        <Button
          onShow={true}
          onPress={() => alert('Search')}
          transparent={true}
          iconName="search"
        />
        <Button
          onShow={true}
          onPress={() => alert('log-in')}
          transparent={true}
          iconName="log-out"
        />
        <Button
          onShow={true}
          onPress={() => Actions.cartList()}
          transparent={true}
          iconName="cart"
          mg={5}
        />
        <Badge
          style={{ position: 'absolute', backgroundColor: '#303030' }}
          warning
        >
          <Text style={{ color: '#212121' }}>{cart}</Text>
        </Badge>
      </>
    );
  }
};

export default AppBar;
