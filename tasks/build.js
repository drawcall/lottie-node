const fs = require("fs-extra");
const cheerio = require("cheerio");
const package = require("../package.json");

const rootFolder = "player/";
const bm_version = package.version;
const buildReducedVersion = process.argv[2] === "reduced";

function loadIndex() {
  return new Promise((resolve, reject) => {
    function onLoad(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }
    fs.readFile(`${rootFolder}index.html`, "utf8", onLoad);
  });
}

function parseHTML(html) {
  return new Promise((resolve, reject) => {
    try {
      const $ = cheerio.load(html);
      resolve($);
    } catch (err) {
      reject(err);
    }
  });
}

function getScripts($) {
  return new Promise((resolve, reject) => {
    try {
      const defaultBuilds = ["canvas", "canvas_light"];
      const scriptNodes = [];
      let shouldAddToScripts = false;
      $("head")
        .contents()
        .each((index, node) => {
          if (node.nodeType === 8 && node.data.indexOf("build:js") !== -1) {
            shouldAddToScripts = true;
          } else if (shouldAddToScripts) {
            if (node.type === "script") {
              scriptNodes.push(node);
            } else if (
              node.nodeType === 8 &&
              node.data.indexOf("endbuild") !== -1
            ) {
              shouldAddToScripts = false;
            }
          }
        });

      const scripts = scriptNodes.map((node) => {
        const builds = node.attribs["data-builds"]
          ? node.attribs["data-builds"].split(",")
          : defaultBuilds;
        return {
          src: node.attribs.src,
          builds: builds,
        };
      });
      resolve(scripts);
    } catch (err) {
      reject(err);
    }
  });
}

function concatScripts(scripts, build) {
  return new Promise((resolve, reject) => {
    // Concatenating scripts
    try {
      let scriptsString = "";
      scripts.forEach((script) => {
        if (script.builds.indexOf(build) !== -1) {
          scriptsString += fs.readFileSync(`${rootFolder}${script.src}`, {
            encoding: "utf8",
          });
          scriptsString += "\r\n";
        }
      });
      resolve(scriptsString);
    } catch (err) {
      reject(err);
    }
  });
}

function wrapScriptWithModule(code) {
  return new Promise((resolve, reject) => {
    try {
      // Wrapping with module
      let wrappedCode = fs.readFileSync(`${rootFolder}js/module.js`, "utf8");
      wrappedCode = wrappedCode.replace("/*<%= contents %>*/", code);
      wrappedCode = wrappedCode.replace("[[BM_VERSION]]", bm_version);
      resolve(wrappedCode);
    } catch (err) {
      reject(err);
    }
  });
}

async function buildVersion(scripts, version) {
  const code = await concatScripts(scripts, version.build);
  const wrappedCode = await wrapScriptWithModule(code);
  const processedCode = await version.process(wrappedCode);
  const saved = await save(processedCode, version.fileName);
  return true;
}

function save(code, fileName) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`build/${fileName}`, code, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("File Saved");
      }
    });
  });
}

function noop(code) {
  return Promise.resolve(code);
}

function buildVersions(scripts) {
  console.log("begin build ");
  return new Promise((resolve, reject) => {
    let versions = [
      {
        fileName: "lottie_canvas.js",
        build: "canvas",
        process: noop,
      },
    ];

    if (buildReducedVersion) {
      versions = versions.splice(0, 1);
    }

    const buildProcesses = versions.map((version) => {
      return buildVersion(scripts, version);
    });
    Promise.all(buildProcesses)
      .then(() => {
        resolve("Build Process Ended");
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function handleError(err) {
  console.log(err);
}

async function build() {
  try {
    fs.emptyDir('build');
    const htmlData = await loadIndex();
    const parsedData = await parseHTML(htmlData);
    const scripts = await getScripts(parsedData);
    const result = await buildVersions(scripts);
    console.log(result);
  } catch (err) {
    handleError(err);
  }
}

build();
