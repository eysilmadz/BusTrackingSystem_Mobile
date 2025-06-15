import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 0.35,
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
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: '40%',
    flexDirection: "row",
    alignItems: "center",
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
    paddingVertical: '2%'
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
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderRadius: 12,
    padding: '3%',
    marginVertical: '3%',
    marginHorizontal: '15%',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    borderRadius: 12,
    padding: '3%',
    marginHorizontal: '30%',
    backgroundColor: 'white'
  },
  bottomContainer: {
   flex: 0.65,
    backgroundColor: '#fff',            // beyaz
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    // gölge (Android / iOS)
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },

  tabItem: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',          // hafif gri
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: '#FFC107',          // sarı (örnek)
  },
  tabText: {
    fontSize: 14,
    color: '#555',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    // hafif gölge
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardSegment: {
    alignItems: 'center',
    marginRight: 16,
  },
  cardSegText: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
  },

  sep: {
    height: 12,
  },
});

export default styles;