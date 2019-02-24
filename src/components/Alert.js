import { Alert } from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

const AlertComponent = props => {
  const { show } = props;

  return (
    <AwesomeAlert
      alertContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        heigth: '100%'
      }}
      titleStyle={{ fontSize: 35, marginHorizontal: 30 }}
      messageStyle={{ fontSize: 25, textAlign: 'center' }}
      confirmButtonTextStyle={{ fontSize: 25, width: 100, textAlign: 'center' }}
      cancelButtonTextStyle={{ fontSize: 25, width: 100, textAlign: 'center' }}
      show={show}
      showProgress={false}
      title="Hapus Barang"
      message="Apa Kamu Yakin Ingin Menghapus Barang Yang Terpilih ?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Batal"
      confirmText="Hapus"
      confirmButtonColor="#212121"
      onCancelPressed={() => {
        this.hideAlert();
      }}
      onConfirmPressed={() => {
        this.hideAlert();
      }}
    />
  );
};

export default AlertComponent;
