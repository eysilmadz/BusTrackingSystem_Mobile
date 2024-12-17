import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity, Button } from "react-native";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

function Cards() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Merhaba card sayfası!</Text>
    </SafeAreaView>
  )
}

export default Cards;