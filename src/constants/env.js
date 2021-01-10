// Envs
let dev = false;
let devserver = "http://192.168.1.152:8082/";
let deploy = "http://159.203.92.75/";

let env = {
  server:dev?devserver:deploy,
  dev:dev
};

export default env;