const fs = require("fs");
const path = require("path");

function readIfExists(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

const nextTrace = readIfExists(path.join(process.cwd(), ".next", "standalone", "package.json")) || readIfExists(path.join(process.cwd(), ".next", "BUILD_ID"));
console.log("Build trace snippet:", nextTrace ? nextTrace.slice(0, 200) : "No trace available. Run build first.");
