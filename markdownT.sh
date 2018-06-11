#!/bin/bash

TEMPLATE_FILE=${HOME}/.models/mdHtml
CSS="..\/air.css"
TITLE=Welcome
OUT=${1//.*/.html}


cat ${TEMPLATE_FILE}/headTemplate.html | sed -e "s/#CSS#/${CSS}/" -e "s/#TITLE#/${TITLE}/" > $OUT

markdown $1 >> $OUT

cat ${TEMPLATE_FILE}/tailTemplate.html >> $OUT


