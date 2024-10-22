import { test } from "./test.js";

const app = {
  init() {
    console.log("start");
    test();
    this.modules();
  },
  listeners() {},
  modules() {},
}.init();
