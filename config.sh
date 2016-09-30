#!/bin/bash
if [[ ! -f config.json ]]; then
	node setup.js;
else
	exit 0;
fi
