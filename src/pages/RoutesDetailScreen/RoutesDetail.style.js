import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
      },
      mapContainer: {
        flex: 2,
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
      scrollContainer: {
        flex: 1,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      },
      routeTitle: {
        fontSize: 18,
        fontWeight: "bold",
      },
      scheduleButton: {
        backgroundColor: "#f00",
        padding: 8,
        borderRadius: 8,
      },
      scheduleText: {
        color: "#fff",
        fontWeight: "bold",
      },
      stationList: {
        flex: 1,
      },
      stationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 8,
        borderRadius: 10,
        elevation: 1,
      },
      stationName: {
        fontSize: 16,
        fontWeight: "bold",
      },
      lineContainer: {
        flexDirection: "row",
        marginTop: 5,
      },
      lineBadge: {
        backgroundColor: "#eee",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginRight: 5,
        fontSize: 12,
        color: "#555",
      },
      availabilityButton: {
        backgroundColor: "#d4edda",
        padding: 8,
        borderRadius: 8,
      },
      availabilityText: {
        color: "#155724",
        fontWeight: "bold",
      },
})