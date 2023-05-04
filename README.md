# Timeblok Playground

This repo contains the online playground for the [timeblok](https://github.com/JettChenT/timeblok).

For descriptions of how to use the timeblok language, see the README of [timeblok](https://github.com/JettChenT/timeblok).
Note that most commands and filters that require internet access / filesystem IO are not supported as of now.

## Installation
`pnpm i`

## Development
`pnpm run dev`


## Note to self
To update a dependency in this dev environment, run `pnpm update <package-name>`.
Then, you need to run `pnpm build` before runing `pnpm run dev`
Then, you need to restart vscode so that it picks up on the udpated deps.
