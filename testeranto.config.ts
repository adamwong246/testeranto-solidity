import { IProject } from "testeranto/src/Types";

const config: IProject = {
  projects: {
    allTests: {
      tests: [
        ["./test/node.ts", "node", { ports: 0 }, []],
        ["./test/pure.ts", "pure", { ports: 0 }, []],
        ["./test/web.ts", "web", { ports: 0 }, []],
      ],
      clearScreen: false,
      debugger: false,
      externals: [],
      featureIngestor: function (s: string): Promise<string> {
        return new Promise((res) => res(""));
      },
      importPlugins: [],
      minify: false,
      nodePlugins: [],
      ports: [],
      src: "",
      webPlugins: [],
    },
  },
};
export default config;
