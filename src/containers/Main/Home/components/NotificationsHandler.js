import React,{useRef,useState} from "react";
import { View, Platform } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apis } from "../../../../services";
let NotificationsHandler = (props) => {
    const notificationListener = useRef();
    const responseListener = useRef();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
  let { user } = props.user;
  let _HandlerIOS = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    // await AsyncStorage.removeItem('@blueberry_app_notification_token');
    // Save Token to the Storage
    let _token_from_storage = await AsyncStorage.getItem(
      "@raccoon_notification_token"
    );
    if (!_token_from_storage) {
      apis.main.storeToken(
        {
          token: token,
          user_id: user.id,
        },
        async (res) => {
          await AsyncStorage.setItem("@raccoon_notification_token", token);
        },
        (err) => {
          console.log(err.response);
        }
      );
    }

    return token;
  };

  React.useEffect(() => {
    if (Platform.OS == "ios") {
      _HandlerIOS();

      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log(notification);
        }
      );

      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(response);
        }
      );
    }
  }, []);
  return <></>;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsHandler);
