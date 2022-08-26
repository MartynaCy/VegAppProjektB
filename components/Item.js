import React, { useState, useContext } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Linking, Modal, Pressable, Image, TouchableOpacity, useWindowDimensions, ImageBackground, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';
import { DATA } from '../RestaurantData'
import { ThemeContext } from '../components/Themes';
import { color } from './colors';


export default Item = ({ id, name, description, url, street, zipcode, image, foodoptions, isFav, route}) => {

  const { dark, theme, toggle } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const layout = useWindowDimensions();


  const goToWebsite = () => {
      Linking.openURL(url)
    }
  return(
  <View style={styles.item}>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Image style={styles.image} source={image} />
      <View style={[styles.totalText, {backgroundColor: theme.transparent}]}>
        <Text style={[styles.title, {color: theme.textColor}]}>{name}</Text>
        <Text style={[{color: theme.textColor}]}>{description.substring(0, 40) + "..."}</Text>
      </View>
    </TouchableOpacity>
    
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalscreen}>
          <View style={[styles.modalView,{backgroundColor: theme.backgroundColor}]}>
            <View style={[styles.toptext,{backgroundColor: theme.backgroundColor}]}>
              <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.modaltitle,{color: theme.textColor, backgroundColor: theme.color}]}>{name}</Text>
              <Pressable
                style={[styles.xbutton, {backgroundColor: theme.color}]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{fontSize: 20, alignSelf: "center", marginTop: 18, fontWeight: "bold", color: theme.textColor}}>X</Text>
              </Pressable>
            </View>
            <Image style={styles.modalimage} source={image} />
            <View style={[styles.modalback,{backgroundColor: theme.backgroundColor}]}>
              <Text style={[styles.modalText,{color: theme.textColor}]}>{description}</Text>
              <Text></Text>
              <Text style={[styles.modalText,{color: theme.textColor}]}>{street}, {zipcode}</Text>
            </View>
            <Pressable
              style={[styles.buttonWebsite,{backgroundColor: theme.color}]}
              onPress={goToWebsite}>
              <Text style={[styles.textStyle,{color:theme.textColor}]}>Webseite</Text>
            </Pressable>
          </View>
          </View>
      </Modal>

  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      borderRadius: 0,
      padding: 0,
      marginVertical: 8,
      justifyContent: "center",
      alignItems:"center",
      alignContent: "center",    
    },
    title: {
      fontSize: 32,
    },
    modaltitle:{
      fontSize: 32,
      fontWeight: "bold",
      height: 65,
      padding: 15,
      maxWidth: Dimensions.get('window').width * 0.8,
      borderBottomRightRadius:25,
      borderTopLeftRadius: 25,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 0,
    },
    modalView: {
      marginTop:150,
      height: Dimensions.get('window').height / 1.5,
      margin: 10,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    xbutton: {
      fontWeight: "bold",
      borderTopRightRadius:25,
      borderBottomLeftRadius:25,
      height: 65,
      width: 40,
      
    },
    buttonWebsite: {
      borderTopLeftRadius: 25,
      borderTopRightRadius:25,
      padding: 10,
      elevation: 5,
      width: Dimensions.get('window').width -80,
      height: 50,
      backgroundColor: color.green,
    },
    textStyle: {
      fontSize: 25,
      color: "black",
      fontWeight: "bold",
      textAlign: "center",

    },
    modalText: {
      fontSize:15,
      padding: 10,
      
    },
    totalText: {
      padding: 7,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    image: {
      height: 150,
      width: Dimensions.get('window').width -20,
      borderRadius: 25,
    },
    modalimage: {
      width: Dimensions.get('window').width -20,
      height: 200
    },
    toptext:{
      width: Dimensions.get('window').width -20,
      flexDirection: "row", 
      justifyContent: "space-between",
      height: 65,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,

    },
    modalback:{
      width: Dimensions.get('window').width -20,
    },
    modalscreen:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: "srgba(0, 0, 0, 0.8)"
    }
  });