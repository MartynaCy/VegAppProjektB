import React, { useContext, useState }  from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, useWindowDimensions, DropDownPicker, Dimensions} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MapView, { Callout, Marker } from 'react-native-maps';

import Item from '../components/Item';

import { ArtContext } from '../data/ArtContext';
import { FilContext } from '../data/FilContext';

import { color } from '../components/colors';
import { ThemeContext } from '../components/Themes';

//Items aus Item.js die im Tab angezeigt werden
const renderItem = ({ item }) => {

    return(
    <Item id={item.id} name={item.name} description={item.description} url={item.url} street={item.street} zipcode={item.zipcode} image={item.image} foodoptions={item.foodoptions} isFav={item.isFav} route={item.route}/>
    )

};

//Filtert die Liste der Restaurants nach omnivor, vegetarisch, vegan
const filterRes = () => {
  const [artData, setArtData] = useContext(ArtContext);
  const [filData, setFilData] = useContext(FilContext);
  const curFilter = filData.filter
  var artArray = []

  if (artData.length >= 3) {
        for (let i = 0; i < curFilter.length; i++) {
            if (curFilter[i] == true) {
                if (i == 0) {
                    artArray = artArray.concat(artData.filter(item => item.foodoptions == "Omni"))
                }
                if (i == 1) {
                    artArray = artArray.concat(artData.filter(item => item.foodoptions == "Veggie"))
                }
                if (i == 2) {
                  artArray = artArray.concat(artData.filter(item => item.foodoptions == "Vegan"))
              }
            }
        }
    }
    return artArray
}

//Listen Tab
const FirstRoute = () => (
  <SafeAreaView style={styles.container}>
    <FlatList
    data={filterRes()}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    />
  </SafeAreaView>
);

//Karten Tab
const SecondRoute = () => (
  <View style={styles.mapcontainer}>
      <View>
    </View>
  <MapView style={styles.map} 
      initialRegion={{
        latitude: 53.53884349786575,
        longitude: 9.994536590141637,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,}}
        >     
        {
          filterRes().map(marker =>(

            <Marker coordinate={{latitude: marker.route.latitude, longitude: marker.route.longitude}}
            pinColor='orange'
            key={marker.id}
            >
              <Callout tooltip>
                <View>
                    <View style={styles.popup}>
                      <Text style={styles.name}>{marker.name}</Text>
                      <Text>{marker.street}</Text>
                      <Text>{marker.zipcode}</Text>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))
          
        }
  </MapView>
  </View>
  
);


export default function HomeScreen () {

    filterRes()
    const { dark, theme, toggle } = useContext(ThemeContext);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Liste' },
      { key: 'second', title: 'Karte' },
    ]);

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    //Tabbar Liste|Karte
    const renderTabBar = props => (
      <TabBar
          {...props}
          activeColor={color.green}
          inactiveColor={'black'}
          indicatorStyle={{backgroundColor: color.orange,height: 2.5}}
          indicatorContainerStyle={{backgroundColor: theme.backgroundColor}}

      />
    );  

    return (
      <TabView style={{backgroundColor: theme.backgroundColor}}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    );
  }

  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    popup: {
      flexDirection: 'column',
      alignSelf: 'flex-start',
      backgroundColor: color.lightgreen,
      borderRadius: 10,
      borderColor: color.green,
      borderWidth: 0.8,
      padding: 15,
      width: 150,
    },
    name: {
      fontSize: 16,
      marginBottom: 5,
    },
    arrow: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#fff',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -32,
    },
    arrowBorder: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -0.5,
    },
    image: {
      width: '100%',
      height: 80,
    },
  });