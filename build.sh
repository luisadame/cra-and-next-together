#!/bin/bash
yarn build;
cd partners;
yarn build;
yarn next export;
cd ..;
mkdir -p ./build/with && cp -R ./partners/out/* "$_"
yarn serve
