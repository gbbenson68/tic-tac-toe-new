#!/bin/bash
# TODO - Move this link into some sort of config file or env variable.
URL="https://tic-tac-toe-wdi.herokuapp.com"

if [ $# -ne 2 ]
then
  echo
  echo "     Usage: ${0} <token> <OVER|NOVER>"
  echo
  exit 1
fi

TOKEN=${1}
VAL=${2}



if [ "${VAL}" = "NOVER" ]
then
  QUERY="?over=false"
else
  QUERY="?over=true"
fi

#echo ${URL}
#echo ${TOKEN}
#echo ${VAL}
#echo ${QUERY}

curl "${URL}/games/${QUERY}" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}"

echo
