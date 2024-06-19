import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor={"#1C2A3A"} />
      <View style={styles.logoWrap}>
      <Image
        source={require("@assets/images/LogoColor.png")}
        style={styles.logo}
      />
      <Text style={styles.logoText}>HealthPal</Text>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 75,
    height: 75,
    marginTop:50, 
  },
  logoWrap:{
    alignItems:'center'
  },
  logoText:{
    fontSize:24,
    fontWeight:'700',
    marginTop:10
  }
});
