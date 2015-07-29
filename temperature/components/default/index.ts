/// <reference path="../../typings/tsd.d.ts"/>

import * as HSHClient from "../../../../../HSHClient/HSHClient";
import {QueryParent} from "../../../../../HSHCore/index";

let socket = HSHClient.connect();
let namespace = "Pangoraw/temperature/default";
let qp = new QueryParent(namespace, socket);

qp.on("getTemperature", onGetTemperature);
qp.trigger();

function onGetTemperature(temperature) {
  console.log(temperature);
}

socket.emit(`${namespace}:getTemperature`);
