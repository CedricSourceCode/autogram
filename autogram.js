#!/usr/bin/env node
'use strict';

const autogram = require('./lib/autogram');
const colors = require("colors/safe");
const prompt = require('prompt');
const ora = require('ora');
const spinner = ora();

const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .example(
    '$0 run -t \'#instalife #iger\' -e \'#booty #porn\' -i 10mn',
    'Run Autogram every 10 mn on posts hashtagged #instalife, #iger, ' +
    'excluding those hashtagged #booty and #porn."'
  )
  .command(
    'run', 'Launch bot to automatize likes/comments ' +
    'actions on posts of a given hashtag.'
  )
  .option('i', {
    alias: 'interval',
    describe: 'Interval between each run of the bot ' +
    'for new content; can be <integer>mn, <integer>hrs.'
  })
  .option('t', {
    alias: 'hashtags',
    describe: 'Will run automatized actions on posts matching ' +
    'the given list of hashtags.'
  })
  .option('e', {
    alias: 'excludes',
    describe: 'Will avoid applying actions on posts matching ' +
    'the given list of excluded hashtags.'
  })
  .help('h')
  .alias('h', 'help')
  .epilog('MIT Licensed - Davy Peter Braun')
  .argv;

prompt.message = colors.cyan('  A U T O G R A M');

prompt
  .start()
  .get({
    properties: {
      username: {
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be only letters, spaces, or dashes',
        required: true
      },
      password: {
        hidden: true,
        required: true
      }
    }
  }, (err, result) => {
    let msg = colors.cyan('A U T O G R A M');
    msg += ' (Ctrl + C to stop)';

    spinner.color = 'blue';
    spinner.text = msg;
    spinner.start();

    autogram(spinner, msg, argv.hashtags, argv.excludes, argv.interval || '10mn');
  });

