#!/usr/bin/env node

const { string, argv } = require("yargs");
const yargs = require("yargs");
expandHomeDir = require('expand-home-dir')
const cliHandler = require('./handlers/cli-handler');

function processArgs() {
    const argv = yargs
        .usage("node $0 <command>")
        .command(LIST_FILES_IN_A_DIR, "list the files contents ", yargs => {
            yargs.option('folder', {
                alias: "f",
                type: string,
                description: 'Folder location',
                demandOption: true,
                default: '~/'
            })
        }, argv => {
            if (argv._ && argv._[0]) {
                const folder = argv.folder && expandHomeDir(argv.folder);

                console.log(folder);
                cliHandler.listFiles(folder);
                // cliHandler.executeESSearch(env, index, query);
            }
        })
        .command(GET_LARGEST_NVME, "get the largest nvme from a list of nvme", yargs =>{

        }, argv=>{
            cliHandler.getLargestNVMEDrive();
        })
        .help()
        .strict()
        .demandCommand()
        .argv
}

async function main() {
    processArgs();
}


// Command constents for cli
const LIST_FILES_IN_A_DIR = 'list';
const GET_LARGEST_NVME = "get-largest-nvme"

main();