#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build
    cp background.js build
    mkdir build/popup
    cp popup/* build/popup/

    mkdir -p dist
    cp -r build/* dist
    
}

build