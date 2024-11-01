import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({    
    container: {
        width: Dimensions.get("window").width/1.2,
        justifyContent: "center",
        margin: 10,
      },
      dropdown: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        paddingHorizontal: 8,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#a9a9a9',
      },
      selectedText: {
        fontSize: 16,
        color: '#222',
      },
      dropdownList: {
        position: 'absolute',
        top: 60, 
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#a9a9a9',
        maxHeight: 150, // Dropdown listesi çok uzun olursa kaydırma için sınırlama
        zIndex: 10,
      },
      dropdownItem: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
      },
      itemText: {
        fontSize: 16,
        color: '#222',
      },
})

