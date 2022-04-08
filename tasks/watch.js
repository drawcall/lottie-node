const childProcess = require("child_process");
const watch = require("watch");
const path = require("path");

function runScript(scriptPath, processArguments, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;

  const process = childProcess.fork(scriptPath, processArguments);

  // listen for errors as they may prevent the exit event from firing
  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    const err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });
}

watch.watchTree(path.join(__dirname, "../player/js"), function (f, curr, prev) {
  runScript(path.join(__dirname, "./build.js"), ["reduced"], function (err) {
    if (err) throw err;
    console.log("--------------------------------");
    console.log("rebuild lottie-nodejs library");
  });
});
