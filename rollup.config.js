import typescript from "rollup-plugin-ts"
import {lezer} from "@lezer/generator/rollup"

export default {
  input: "src/timeblok-grammar/index.ts",
  external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
  output: [
    {file: "./src/tb-grammar-comp/index.cjs", format: "cjs"},
    {dir: "./src/tb-grammar-comp", format: "es"}
  ],
  plugins: [lezer(), typescript()]
}