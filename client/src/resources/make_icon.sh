#!/bin/bash
inkscape -w 16 -h 16 icon.svg -o 16.png
inkscape -w 24 -h 24 icon.svg -o 24.png
inkscape -w 32 -h 32 icon.svg -o 32.png
inkscape -w 64 -h 64 icon.svg -o 64.png
convert 16.png 32.png 48.png 64.png ../public/favicon.ico