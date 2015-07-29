import * as http from "http";
import {QueryParent} from "../../../../../../HSHCore/index";

export default class TemperatureManager extends QueryParent {

  constructor(socket : SocketIO.Socket) {
    super("Pangoraw/temperature/default", socket);

    this.on("getTemperature", this._onGetTemperature);
    this.trigger();
  }

  _onGetTemperature = () => {
    this.socket.emit(this.namespace + "getTemperature", this.getTemperature())
  }

  getTemperature() : string {
    let options = {
      host : "192.168.0.30",
      path : "/temperature"
    }

    let temperature : string = "";

    let callback = function(res : http.IncomingMessage) {
      let str = "";
      res.on("data", (chunk : string) => {
        str += chunk;
      });
      res.on("end", () => {
        temperature = str;
      });
    }

    http.request(options, callback).end();
    return temperature;
  }

}
