import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        padding:20
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom:3,
        marginLeft: 10
    },
    valueContainer: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        padding: 15,
    },
    value: {
        fontSize: 16,
    },
    loading: {
        fontSize: 16,
        fontStyle: 'italic'
    },
    verified:{
        marginLeft: 15,
        marginTop: 3
    },
    mailLabel:{
        color: '#222',
        marginVertical:8,
        marginLeft: 15
    },
    buttonContainer:{
        alignItems: "center",
    },
    button: {
        backgroundColor: "#666",
        width: "80%",
        padding: 15,
        marginVertical:10,
        borderRadius: 20,
        alignItems:"center"
    },
    disabledButton:{
        backgroundColor: '#d3d3d3',
    },
    buttontext: {
        color: "#fff",
        fontWeight: "500",
        fontSize:16
    }
});