import { StyleSheet,Dimensions } from "react-native";

export default StyleSheet.create ({
      sliderContainer: {
        paddingLeft: 16,
        paddingVertical: 5,
        height: Dimensions.get('window').height/3,
      },
      text: {
        fontSize: 19,
        paddingHorizontal: 3,
        paddingBottom: 2,
        color: '#222'
      },
      seeAll: {
        paddingHorizontal: 3
      },
      sliderTopContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 8,
        width: "100%",
      }
});