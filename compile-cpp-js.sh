#!/bin/bash
emcc hello.cpp  --bind -O3 -o hello.js -lwebsocket.js -lmyfunc.js -s ASYNCIFY=1