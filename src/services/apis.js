import axios from "axios";
import { env } from "../constants";

let apis = {
  user: {
    auth(token, onSuccess, onError) {
      axios
        .get(env.server + "api/user/auth", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err.response));
    },
    login(data, onSuccess, onError) {
      axios
        .post(env.server + "api/user/login", data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    register(data, onSuccess, onError) {
      axios
        .post(env.server + "api/user/register", data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    updateBio(data,onSuccess,onError) {
      axios
      .post(env.server + "api/user/updateBio", data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err);
      });
    },
    updateAddress(data,onSuccess,onError) {
      axios
      .post(env.server + "api/user/updateAddress", data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err);
      });
    },
    updateProfile(data,onSuccess,onError) {
      axios
      .post(env.server + "api/user/updateProfile", data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err);
      });
    }
  },
  coins: {
    resiveCoins(data, onSuccess, onError) {
      axios
        .post(env.server + "api/coins/reciveCoins", data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
  },
  main: {
    index(data, onSuccess, onError) {
      axios
        .post(env.server + "api/main/index", data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    storeToken(data,onSucces,onError) {
      axios
        .post(env.server + "api/main/notification_token/store", data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    }
  },
  social:{
    addPost(data,onSuccess,onError) {
      axios
        .post(env.server + "api/social/addpost",{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }, data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    index(data,onSuccess,onError) {
      axios
        .post(env.server + "api/social/index", data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    getProfile(id,data,onSuccess,onError) {
      axios
        .post(env.server + "api/social/getProfile/" + id,data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    follow(data,onSuccess,onError) {
      axios
        .post(env.server + "api/social/follow",data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    unFollow(data,onSuccess,onError) {
      axios
        .post(env.server + "api/social/unfollow",data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    like(data,onSuccess,onError) {
      axios
        .post(env.server + "api/social/like",data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    unLike(data,onSuccess,onError) {
      axios
        .post(env.server + "api/social/unlike",data)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          onError(err);
        });
    },
    comment(data,onSuccess,onError) {
      axios
      .post(env.server + "api/social/comment",data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err);
      });
    },
    search(data,onSuccess,onError) {
      axios
      .post(env.server + "api/social/search",data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err);
      });
    }
  },
  order:{
    store(data,onSuccess,onError) {
      axios
      .post(env.server + "api/order/store",data)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch((err) => {
        onError(err);
      });
    }
  }
};

export default apis;
