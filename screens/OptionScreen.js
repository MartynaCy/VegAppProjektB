import React, {useContext, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Switch, Image, Dimensions, DropDownPicker } from 'react-native';

import CheckBoxTile from '../components/CheckBoxTile';
import { ThemeContext } from '../components/Themes';

export default OptionScreen = ({navigation}) => {

  const [state, setState] = React.useState(false);
  const { dark, theme, toggle } = useContext(ThemeContext);

  //Filter & Light/Dark mode
  return (
    <View style={{backgroundColor: theme.backgroundColor}}>
      <Text style={styles.text}>Wähle aus nach welcher Ernährungsweise du filtern möchtest:</Text>
    <View>
    <CheckBoxTile title="Omnivor" />
    <CheckBoxTile title="Vegetarisch" />
    <CheckBoxTile title="Vegan" />
    </View>
      <View style = {[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Image style={styles.images} source={require('../assets/sun.png')} />
                <Switch
                    trackColor={{ false: "#767577", true: "#ccc" }}
                    thumbColor={dark ? "#fff" : "#f4f3f4"}
                    onChange={toggle} value = {dark}
                    style={{transform: [{ scaleX: 2 }, { scaleY: 2 }]}} />
            <Image style={styles.images} source={require('../assets/moon.png')} />
        </View>

    </View>   
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize:20,
    fontWeight:"bold",
    padding: 10
  },
  headlineContainer: {
      alignItems: "center",
      justifyContent: "center",
  },
  themesText: {
      color: "white",
      fontSize: 26,
      textDecorationLine: 'underline'
  },
  viewVertical:{
  },
  viewHorizontal: {
      flexDirection: "row"
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row",
    marginTop: Dimensions.get('window').height /3
 },
 images:{
  width: 200,
  height: 200
 }
});