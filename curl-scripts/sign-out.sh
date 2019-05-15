#!/bin/bash
# TODO - Move this link into some sort of config file or env variable.
URL="https://tic-tac-toe-wdi.herokuapp.com"

if [ $# -ne 1 ]
then
  echo
  echo "     Usage: $0 <token>"
  echo
  exit 1
fi

TOKEN=${1}

#echo ${URL}
#echo ${TOKEN}

curl "${URL}/sign-out" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
