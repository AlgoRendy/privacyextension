#!/bin/bash

build() {
    echo 'building react'
    rm -rf build/*
    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build
   

    mkdir build/popup
    
    cp background/* build/
    
    cp popup/* build/popup/

    

    mkdir -p dist
    cp -r build/* dist
    
}

build