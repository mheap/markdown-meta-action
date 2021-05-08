const core = require("@actions/core");
const fs = require("fs").promises;
const action = require("./index");

beforeEach(() => {
  jest.spyOn(core, "setOutput").mockImplementation();
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("parses simple front matter", async () => {
  mockFile(`---
title: This is a demo
highlighted: false
---
This is the body of the post`);

  jest.spyOn(core, "getInput").mockImplementation(() => "./simple");
  await action();
  expect(core.setOutput).toBeCalledWith("title", "This is a demo");
  expect(core.setOutput).toBeCalledWith("highlighted", false);
});

it("handles special characters", async () => {
  mockFile(`---
t!tle: This is a demo
should be highlighted: false
🚀 lift-off: 3-2-1 GO
---
Post with special chars`);

  jest.spyOn(core, "getInput").mockImplementation(() => "./special");
  await action();
  expect(core.setOutput).toBeCalledWith("ttle", "This is a demo");
  expect(core.setOutput).toBeCalledWith("should-be-highlighted", false);
  expect(core.setOutput).toBeCalledWith("lift-off", "3-2-1 GO");
});

it("handles no front matter", async () => {
  mockFile(`Post with with no front matter`);

  jest.spyOn(core, "getInput").mockImplementation(() => "Demo");
  await action();
  expect(core.setOutput).not.toBeCalled();
});

it("reads the filename provided", async () => {
  jest.spyOn(core, "getInput").mockImplementation(() => "./demo-file");
  jest.spyOn(fs, "readFile").mockImplementation(() => Promise.resolve(""));
  await action();
  expect(fs.readFile).toBeCalledWith("./demo-file");
});

it("throws with missing input", async () => {
  expect(action).rejects.toThrow("Input required and not supplied: file");
});

function mockFile(content) {
  jest
    .spyOn(fs, "readFile")
    .mockImplementation(() => Promise.resolve(Buffer.from(content)));
}
