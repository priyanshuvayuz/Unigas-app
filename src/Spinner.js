import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" />
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    opacity:0.7
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;