import React from "react";
import { View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import {UserActions} from '../../../../stores'
import GoogleFit, { Scopes } from "react-native-google-fit";
import { Pedometer } from 'expo-sensors';
let AndroidSteps = (props) => {
    let {steps} = props.user
    let {setSteps} = props;

    let _RegisterStepsInStore = (step) => {
        setSteps(step)
        Pedometer.watchStepCount(watchRes => {
            setSteps(step + watchRes.steps)
          });
    }

  let _GetAfterAuth = () => {
    const end = new Date();
    const start = new Date();
    start.setHours(0,0,0,0);
    start.toISOString()
    end.setHours(23,59,59,999);
    end.toISOString()
    const opt = {
      startDate: start, // required ISO8601Timestamp
      endDate: end, // required ISO8601Timestamp
      bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };

    GoogleFit.getDailyStepCountSamples(opt)
      .then((res) => {
        // console.log("Daily steps >>> ", res);
        res.forEach((trg,index) => {
            if(trg.source == "com.google.android.gms:estimated_steps") {
                let _steps = 0;
                trg.steps.forEach((step) => {
                    _steps = _steps + step.value
                })
                console.log(_steps)
                _RegisterStepsInStore(_steps)
            }
        })
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  let _GetSteps = async () => {
    // The list of available scopes inside of src/scopes.js file
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ,Scopes.FITNESS_ACTIVITY_WRITE, Scopes.FITNESS_BODY_READ,Scopes.FITNESS_BODY_WRITE,],
    };
    GoogleFit.authorize(options)
      .then((authResult) => {
        if (authResult.success) {
          console.log("AUTH_SUCCESS");
          _GetAfterAuth();
        } else {
          alert("You have reject fitness api please reopen app and accept it")
        }
      })
      .catch(() => {
        alert("You have reject fitness api please reopen app and accept it")
      });
  };

  React.useEffect(() => {
    _GetSteps();
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
    setSteps:item => dispatch(UserActions.setSteps(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AndroidSteps);
