import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#ccc',
    borderRadius: 12,
    padding: '4%',
    width: '90%',
    height: '35%',
    marginVertical: '5%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3%',
  },
  title: {
    flexDirection: 'row',
    alignItems:"center",
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: '40%',
    flexDirection: "row",
    alignItems:"center",
  },
  selectionContainer: {
    alignSelf: 'center',
    zIndex: 99
  },
  searchInput: {
    fontSize: 18,
    color: '#222',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:'2%'
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    backgroundColor: '#ccc',
    marginLeft: '2%',
    borderRadius: 50,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#555',
  },
  divider: {
    height: 1,               // çizginin kalınlığı
    backgroundColor: "#777", // çizgi rengi
    width: '80%'
  },
  input: {
    fontSize: 20,
    fontWeight: '500'
  },
  picker:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderRadius: 12,
    padding: '3%',
    marginVertical: '3%',
    marginHorizontal: '15%',
    backgroundColor:'white',
  },
  button: {
    alignItems: 'center',
    borderRadius: 12,
    padding: '3%',
    marginHorizontal: '30%',
    backgroundColor:'white'
  },
});

export default styles;