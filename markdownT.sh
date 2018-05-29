#!/bin/bash

TEMPLATE_FILE=mdHtml

cat ${TEMPLATE_FILE}/headTemplate.html

markdown $1

cat ${TEMPLATE_FILE}/tailTemplate.html
