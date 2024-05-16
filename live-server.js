import liveServer from "live-server";

let params = {
  port: "1234",
  root: "src",
  file: "index.html",
};
liveServer.start(params);
