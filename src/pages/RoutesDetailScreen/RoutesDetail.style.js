import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  stationContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerName: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",        
  },
  routeName: {
    backgroundColor: '#fff',
    width: 60,
    height: 35,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#666',
    marginLeft: '3%'
  },
  routeLine: {
    width:'75%',
  },
  routeTitle: {
    marginLeft: '2%',
    fontSize: 16,
    fontWeight: "bold"
  },
  timeContainer:{
    width: '20%',
  },
  scheduleButton: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#666'
  },
  scheduleText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 12
  },
  stationList: {
    flex: 1,
    paddingVertical: 30,
    flexGrow: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  stationItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
  },
  titleContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems:"center",
    marginBottom: '3%',
    paddingHorizontal: '2%'
  },
  stationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  routeNumbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  routeNumber: {
    backgroundColor: "#f5f5f5",
    width: 40,
    height: 35,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#666",
    marginBottom: 3,
  },
});