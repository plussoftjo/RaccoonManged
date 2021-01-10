import { StyleSheet } from "react-native";

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentCard: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "10%",
    borderTopLeftRadius: 150,
    paddingHorizontal:15
  },
  totalContentCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  centerText: {
    textAlign: "center",
  },
  goButton: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginTop: 10,
  },
  detailsCard: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop:'5%'
  },
});

export default styles;
