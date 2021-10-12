import React, {useState, useEffect} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../api';
import {
  Alert,
  SafeAreaView,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Text,
  Pressable,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const TransactionModal = ({userID}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [PaymentDetails, SetPaymentDetails] = React.useState();
  const [CheckBtn, SetCheckBtn] = React.useState(false);
  const [rows, setRows] = React.useState(true);
  const [toggle, setToggle] = React.useState(true);
  const [cardNumber, setcardNumber] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  setTimeout(() => setToggle(false), 1000);

  useEffect(() => {
    console.log(userID);
    
    if (userID) {
      api
        .get(`/payment/${userID}`)
        .then(res => {
          
            setRows(res.data);
            console.log(res.data);
          
         
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [toggle,modalVisible]);


  return (
    <View>
        <Modal
          animationType="slide"
          transparent={true}
          swipeDirection="down"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            setTimeout(() => setToggle(false), 1000);
          }}>
          <StatusBar
            backgroundColor={'rgba(0,0,0,0.5)'}
            barStyle={'light-content'}
          />
          <View style={styles.centeredView}>
            <TouchableOpacity
              style={styles.modelViewBackground}
              activeOpacity={1}
            >
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Transaction History</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                    <Ionicons style={styles.ModalCloseIcon} name="ios-close" />
                  </Pressable>
                </View>

                <SafeAreaView style={styles.scrollView} >
                  <ScrollView nestedScrollEnabled = {true}>
                {rows.length > 0 &&
              rows.map(row => {
                return (
                  <View>  
                  {row.type =="card" ?
                  <View style={styles.transActionCard} key={row._id}>
                    <View>
                    <View style={styles.transActionCardHead}>
                 
                      <FontAwesome name="level-up" style={styles.TransIcon}/>
                      <Text style={styles.TransType}>Card Recharge</Text>
                   
                    </View>
                 
                  <Text style={styles.transDate}>{row.date.substring(8, 10)+"/"}{row.date.substring(5, 7)+"/"}{row.date.substring(0, 4)}</Text>
                  </View>
                  <Text style={styles.transAmount}>RS:{row.amount}</Text>
                  </View>
                  :
                  <View style={styles.transActionCard} key={row._id}>
                  <View>
                  <View style={styles.transActionCardHead}>
               
                    <FontAwesome name="level-up" style={styles.TransIconR}/>
                    <Text style={styles.TransType}>Bus Payment</Text>
                 
                  </View>
               
                <Text style={styles.transDate}>{row.date.substring(8, 10)+"/"}{row.date.substring(5, 7)+"/"}{row.date.substring(0, 4)}</Text>
                </View>
                <Text style={styles.transAmount}>RS:{row.amount}</Text>
                </View>}
                  </View>
                )})}
                 </ScrollView>
                </SafeAreaView>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        <Pressable
          style={styles.HisButton}
          onPress={() => setModalVisible(true)}>
          <MaterialIcons style={styles.HisIcon} name="history" />
        </Pressable>
     
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView:{
    paddingVertical:30,
    height:650
  },
  transActionCard:{
    width: width-50,
    padding:10,
    backgroundColor:"#EEF2F8",
    borderRadius:12,
    alignSelf:"center",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    margin:8,

  },
  transActionCardHead:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start"
  },
  TransIcon:{
    color:"green",
    fontSize:28,
  },
  TransIconR:{
    color:"red",
    fontSize:28,
    transform: [{ rotate: '180deg'}]
  },
  TransType:{
    fontSize:18,
    marginRight:5,
    marginLeft:10
  },
  transDate:{
    marginLeft:25,
    fontSize:15,
    opacity:0.6,
    marginTop:0,
  },
  transAmount:{
    fontSize:21,
    marginRight:5,
    fontFamily: 'Dosis-Regular',
    color: '#2d3138',
    letterSpacing: 2,
    marginTop:20

  },
  HisButton: {
    width: 48,
    alignSelf: 'flex-end',
    height: 46,
    marginRight: 35,
    borderRadius: 100,
    backgroundColor: '#F7F9FC',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.6,
    elevation: 10,
    marginTop: 5,
  },
  HisIcon: {
    color: '#2870fc',
    fontSize: 32,
    opacity: 0.8,
  },

  modelViewBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: width,
    height: height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    width: width,
    height: 700,
    backgroundColor: '#FFFEFE',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  button: {
    borderRadius: 8,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 25,
    marginBottom: 14,
  },
  ModalCloseIcon: {
    fontSize: 25,
    color: '#555555',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 10,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
  },
  SaveButton: {
    width: 230,
    alignSelf: 'center',
    height: 52,
    marginRight: 20,
    height: 52,
    borderRadius: 10,
    margin: 8,
    backgroundColor: '#5956E9',
    borderColor: '#5956E9',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.7,
    elevation: 5,
    marginTop: 10,
  },
  SaveIcon: {
    color: '#F6F6F9',
    fontSize: 30,
  },
  SaveBtnText: {
    fontFamily: 'Raleway-Bold',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    paddingLeft: 6,
    color: '#F6F6F9',
  },
  InputName: {
    height: 47,
    width: width - 70,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    padding: 10,
    backgroundColor: '#F6F6F6',
    marginBottom: 12,
    color: '#3C3B3B',
    fontSize: 16,
    fontFamily: 'Raleway-Meadium',
  },
  InputDesc: {
    height: 120,
    width: width - 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    padding: 10,
    backgroundColor: '#F6F6F6',
    marginBottom: 12,
    textAlignVertical: 'top',
    color: '#3C3B3B',
    fontSize: 16,
    fontFamily: 'Raleway-Meadium',
  },
  InputLable: {
    marginLeft: 12,
    marginTop: 5,
    color: '#555555',
    fontSize: 17,
    fontFamily: 'Raleway-Meadium',
  },
  StarRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  StarIcon: {
    fontSize: 24,
    marginLeft: 10,
    color: '#FFC22B',
  },
  Anonymous: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  InputSwitch: {
    marginLeft: 10,
    marginTop: 15,
  },
  InputLableSmall: {
    marginLeft: 8,
    color: '#555555',
    fontSize: 16,
    fontFamily: 'Raleway-Meadium',
    marginBottom: 3,
  },
  MsgLable: {
    marginLeft: 10,
    color: '#848484',
    fontSize: 12,
  },
  nameFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  NameLable: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 5,
    padding: 10,
    fontFamily: 'Raleway-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 19,
    color: '#333333',
  },
});

export default TransactionModal;
