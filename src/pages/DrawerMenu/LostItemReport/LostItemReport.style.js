import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 15
    },
      header: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 1,
        textAlign: "center"
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 13,
      },
      input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 13,
        marginBottom: 13,
        fontSize: 14,
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      halfInput: {
        width: "48%",
        paddingVertical: 15
      },
      noteInput: {
        height: 80,
        textAlignVertical: "top",
      },
      characterCount: {
        alignSelf: "flex-end",
        fontSize: 13,
        color: "#888",
        marginBottom: 10,
        marginRight: 8 
      },
      buttonContainer: {
        alignItems: "center",
      },
      button: {
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        width: "70%",
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
      },
})