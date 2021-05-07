const core = require("@actions/core");
const matter = require("gray-matter");
const slugify = require("slugify");
const fs = require("fs").promises;

async function action() {
  const targetFile = core.getInput("file", { required: true });
  const content = (await fs.readFile(targetFile)).toString();
  const parsed = matter(content);
  for (let k in parsed.data) {
    core.setOutput(slugify(k, { lower: true, strict: true }), parsed.data[k]);
  }
}

if (require.main === module) {
  action();
}

module.exports = action;
