#!/usr/bin/env node

/* eslint-disable */
var po2json = require('po2json');
var parser = require('react-gettext-parser');

function parseJsFiles() {
  parser.parseGlob(['./src/**/{*.js,*.jsx}'], {
    output: './template.pot',
  }, function () {
    msgmerge();
  });
}

//exec
parseJsFiles();