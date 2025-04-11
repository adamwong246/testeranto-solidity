import { IProject } from "testeranto/src/Types";

import { solidityEsBuildConfig } from "./src/plugin";

const config: IProject = {
  projects: {
    allTests: {
      tests: [
        ["./test/node.ts", "node", { ports: 0 }, []],
        // ["./test/pure.ts", "pure", { ports: 0 }, []],
        // ["./test/web.ts", "web", { ports: 0 }, []],
      ],
      clearScreen: false,
      debugger: false,
      externals: ["ganache", "stream"],
      featureIngestor: function (s: string): Promise<string> {
        return new Promise((res) => res(""));
      },
      webPlugins: [],
      nodePlugins: [solidityEsBuildConfig],
      importPlugins: [],

      minify: false,
      ports: [],
      src: "src",
    },
  },
};
export default config;
