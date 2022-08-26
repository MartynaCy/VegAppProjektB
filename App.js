import React, {useEffect, useState } from 'react';
import {View, StyleSheet, Text, Switch, Image, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import OptionScreen from './screens/OptionScreen';

import { ArtContext } from './data/ArtContext';
import { FilContext } from './data/FilContext';

import { DATA } from './RestaurantData';
import { color } from './components/colors';
import { ThemeProvider} from './components/Themes'

const Stack = createStackNavigator();

export default App => {

    //globale Variable für die Filter
    const [filData, setFilData] = useState({
      // [Omnivor, Vegetarisch, Vegan]
      filter: [true, true, true]
    });

    const [artData, setArtData] = useState([]);

    useEffect(() => {
          setArtData(DATA)
    }, []);

    function LogoTitle() {
      return (
        <Image
          source={require('./assets/LogoVegAppSmall.png')}
        />
      );
    }

  return (
    <FilContext.Provider value={[filData, setFilData]}>
      <ArtContext.Provider value={[artData, setArtData]}>
       <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: color.green
                },
                }} 
              initialRouteName="Home">
              <Stack.Screen 
                  name={'.'}
                  component={HomeScreen} 
                  options={({navigation}) => ({
                      headerTitle: (props) => <LogoTitle {...props}/>,
                      headerRight: () => (
                        <View style={style.headerIcon}>
                          <Icon 
                          style={style.headerIcon}
                          name="menu" 
                          type="feather" 
                          color="#fff"
                          onPress={() => navigation.navigate('Filter')}
                        />
                      </View>
                    )
                  })}
              />
              <Stack.Screen name="Filter" component={OptionScreen} />

            </Stack.Navigator>
           </NavigationContainer>
          </ThemeProvider>
        </ArtContext.Provider>
      </FilContext.Provider>
  );
}

const style = StyleSheet.create({
  headerIcon: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    padding: 10
  }
});