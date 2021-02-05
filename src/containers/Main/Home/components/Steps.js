import React from "react";
import { View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import { UserActions } from "../../../../stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
let Steps = (props) => {
  let { setSteps } = props;
  let {user} = props.user;
  let _GetStepsMethods = async () => {
    let _Steps = await AsyncStorage.getItem("steps");
    if (!_Steps) {
      let _StepsRand = Math.round(Math.random() * 2000);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");

      let _data = {
        steps: _StepsRand,
        today: dd,
        duration: 1,
        user_id:user.id
      };
      setSteps(_StepsRand);
      await AsyncStorage.setItem("steps", JSON.stringify(_data));
    } else {
      let __steps = JSON.parse(_Steps);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      if(__steps.user_id == user.id) {
        if (dd == __steps.today) {
          // If the same day
          switch (__steps.duration) {
            case 1:
              let _StepsRand = Math.round(Math.random() * 900);
              let _newSteps = __steps.steps + _StepsRand;
              let _data = {
                steps: _newSteps,
                today: dd,
                duration: 2,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            case 2:
              _StepsRand = Math.round(Math.random() * 800);
              _newSteps = __steps.steps + _StepsRand;
              _data = {
                steps: _newSteps,
                today: dd,
                duration: 3,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            case 3:
              _StepsRand = Math.round(Math.random() * 700);
              _newSteps = __steps.steps + _StepsRand;
              _data = {
                steps: _newSteps,
                today: dd,
                duration: 4,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            case 4:
              _StepsRand = Math.round(Math.random() * 600);
              _newSteps = __steps.steps + _StepsRand;
              _data = {
                steps: _newSteps,
                today: dd,
                duration: 5,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            case 5:
              _StepsRand = Math.round(Math.random() * 500);
              _newSteps = __steps.steps + _StepsRand;
              _data = {
                steps: _newSteps,
                today: dd,
                duration: 6,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            case 6:
              _StepsRand = Math.round(Math.random() * 400);
              _newSteps = __steps.steps + _StepsRand;
              _data = {
                steps: _newSteps,
                today: dd,
                duration: 7,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            case 7:
              _StepsRand = Math.round(Math.random() * 300);
              _newSteps = __steps.steps + _StepsRand;
              _data = {
                steps: _newSteps,
                today: dd,
                duration: 8,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            case 8:
              _StepsRand = Math.round(Math.random() * 300);
              _newSteps = __steps.steps + _StepsRand;
              _data = {
                steps: _newSteps,
                today: dd,
                duration: 9,
                user_id:user.id
              };
              await AsyncStorage.setItem("steps", JSON.stringify(_data));
              setSteps(_newSteps);
              break;
            default:
              setSteps(__steps.steps);
              break;
          }
        } else {
          // not the same day
          let _StepsRand = Math.round(Math.random() * 2000);
          let _data = {
            steps: _StepsRand,
            today: dd,
            duration: 1,
            user_id:user.id
          };
          await AsyncStorage.setItem("steps", JSON.stringify(_data));
          setSteps(_StepsRand);
        }
      }else {
        let _StepsRand = Math.round(Math.random() * 2000);
        let _data = {
          steps: _StepsRand,
          today: dd,
          duration: 1,
          user_id:user.id
        };
        await AsyncStorage.setItem("steps", JSON.stringify(_data));
        setSteps(_StepsRand);
      }
      
    }
  };

  React.useEffect(() => {
    _GetStepsMethods();
  }, []);
  return <View></View>;
};

const mapStateToProps = (state) => {
  return {
    user:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSteps: (item) => dispatch(UserActions.setSteps(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Steps);
