import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Map_cmp from '@/components/Vinuk/Map_cmp';
import MapView from "react-native-maps";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ //specify our coordinates.
          latitude: 7.8731, // Central point of Sri Lanka
          longitude: 80.7718, // Central point of Sri Lanka
          latitudeDelta: 2.5, // Larger values to show more area
          longitudeDelta: 2.5, // Larger values to show more area
        }}
      />
    </View>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;