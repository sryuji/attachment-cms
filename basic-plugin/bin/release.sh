# !/bin/bash

cd ../web/static/plugins/basic
PRE_CSS=`ls -rt | grep plugin\\..*\\.css | tail -n 1`
rm ${PRE_CSS}
cp ../../../../basic-plugin/dist/* .

rm plugin.css
LATEST_CSS=`ls -rt | grep plugin\\..*\\.css | tail -n 1`
ln -s ${LATEST_CSS} plugin.css
