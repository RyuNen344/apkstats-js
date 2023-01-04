import util from "util"
import child_process from "child_process";

describe('addition', () => {
  it('1 + 3 = 4', () => {
    const result = 1 + 3;
    expect(result).toBe(4);
  });
});

describe("given command", () => {
  it("hoge", async () => {
    await util.promisify(child_process.exec)("ls -la")
      .then(({stdout, stderr}) => console.log(stdout))
      .catch((error) => console.log(error))
  })
})
