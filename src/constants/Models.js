import { Dimensions } from "react-native";

// Width,Height
let { width, height } = Dimensions.get("window");

// Models
let Models = {
  window: {
    width: width,
    height: height,
  },
  header: {
    svgHeight: height * 0.4,
    ltrSpace: 70,
    rtlSpace: 300,
  },
};

export default Models;
