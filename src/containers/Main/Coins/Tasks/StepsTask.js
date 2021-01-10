import React from "react";
import { View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import styles from "../styles";
import { TaskList } from "../components";
import { apis, Helper } from "../../../../services";
import { UserActions } from "../../../../stores";
import {Images} from '../../../../constants'
import {translate} from '../../../../translations'

let Tasks = ({ user, setShowToast, setCoinsLogs, setTodayCoins, setCoins,locale }) => {
  
  let [isSync,setIsSync] = React.useState(false)
  
  let TaskStepsChecker = (title, step) => {
    let takenToday = Helper.coinsLogsChecker(title, user.coinsLogs);
    if (takenToday) {
      return false;
    } else {
      if (user.steps > step) {
        return true;
      }
      return false;
    }
  };

  let _insertCoins = (coinsLog, coin) => {
    let _coinsLogs = user.coinsLogs;
    _coinsLogs.push(coinsLog);
    setCoinsLogs(_coinsLogs);
    let _newTodayCoins = user.todayCoins + coin;
    let _newCoins = user.coins + coin;
    setTodayCoins(_newTodayCoins);
    setCoins(_newCoins);
  };

  let _recive = (coin, scope) => {
    if(!isSync) {
      setIsSync(true)
      let data = {
        user_id: user.user.id,
        coin: coin,
        way: scope,
      };
      apis.coins.resiveCoins(
        data,
        (res) => {
          // TODO: Coins added methods
          setShowToast(true);
          _insertCoins(res.coinsLog, coin);
          setTimeout(() => {
            setShowToast(false);
          }, 3500);
          setIsSync(false)
        },
        (err) => {
          setIsSync(false)
          console.log(err.response);
        }
      );


    }
    
  };
  return (
    <View style={styles.taskGroup} id="TaskGroup">
      <View style={styles.taskHeader}>
        <Text category="h5">{translate('coins.step_tasks')}</Text>
      </View>
      <TaskList
        title={"3000 " + translate('coins.tasks.steps_daiy')}
        scope={"3000 Steps daily"}
        coins={2}
        done={TaskStepsChecker("3000 Steps daily", 3000)}
        recive={_recive}
        icon={Images.DailySteps}
        translate={translate}
        rtl={locale.rtl}
      />
      <TaskList
        title={"5000 " + translate('coins.tasks.steps_daiy')}
        scope={"5000 Steps daily"}
        coins={2}
        done={TaskStepsChecker("5000 Steps daily", 5000)}
        recive={_recive}
        icon={Images.DailySteps}
        translate={translate}
        rtl={locale.rtl}
      />
      <TaskList
        title={"8000 " + translate('coins.tasks.steps_daiy')}
        scope={"8000 Steps daily"}
        coins={3}
        done={TaskStepsChecker("8000 Steps daily", 8000)}
        recive={_recive}
        icon={Images.DailySteps}
        translate={translate}
        rtl={locale.rtl}
      />
      <TaskList
        title={"10000 " + translate('coins.tasks.steps_daiy')}
        scope={"10000 Steps daily"}
        coins={3}
        done={TaskStepsChecker("10000 Steps daily", 10000)}
        recive={_recive}
        icon={Images.DailySteps}
        translate={translate}
        rtl={locale.rtl}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCoinsLogs: (item) => dispatch(UserActions.setCoinsLogs(item)),
    setTodayCoins: (item) => dispatch(UserActions.setTodayCoins(item)),
    setCoins: (item) => dispatch(UserActions.setCoins(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
