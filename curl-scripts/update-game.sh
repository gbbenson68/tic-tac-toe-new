#!/bin/bash
# TODO - Move this link into some sort of config file or env variable.
URL="https://tic-tac-toe-wdi.herokuapp.com"

if [ $# -ne 2 ]
then
  echo
  echo "     Usage: $0 <token> <ID>"
  echo
  exit 1
fi

TOKEN=${1}
ID=${2}

#echo ${URL}
#echo ${TOKEN}
#echo ${ID}

curl "${URL}/games/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
      "game": {
        "cell": {
          "index": 0,
          "value": "x"
        },
        "over": false
      }
    }'

echo
