import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: '1%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  routeLine: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  favouriteIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },


});