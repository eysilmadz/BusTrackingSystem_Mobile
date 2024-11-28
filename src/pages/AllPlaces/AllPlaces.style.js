import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
      },
    title: {
        fontSize: 28,
        fontWeight: "medium",
        color: '#222',
        textAlign: "center",
        marginBottom: 10,
        opacity: 0.8
    },
    list: {
      paddingHorizontal: 10,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 20,
      marginBottom: 15,
      overflow: "hidden",
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
    },
    image: {
      width: "100%",
      height: Dimensions.get("window").height/3.8,
      resizeMode: "cover",
    },
    name: {
      fontSize: 18,
      textAlign: "center",
      fontWeight: "semibold",
      padding: 10,
      color: "#333",
      opacity: 0.9
    },
    description: {
      fontSize: 15,
      paddingBottom: 10,
      marginHorizontal: 15,
      color: "#666",
    },
  });