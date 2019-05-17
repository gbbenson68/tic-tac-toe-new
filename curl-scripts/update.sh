#!/bin/bash
# TODO - Move this link into some sort of config file or env variable.
URL="https://tic-tac-toe-wdi.herokuapp.com"

if [ $# -ne 4 ]
then
  echo
  echo "     Usage: $0 <token> <ID> <cell-idx> <val>"
  echo
  exit 1
fi

TOKEN=${1}
ID=${2}
IDX=${3}
VAL=${4}

#echo ${URL}
#echo ${TOKEN}
#echo ${ID}
#echo ${CELL}
#echo ${IDX}

curl "${URL}/games/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
      "game": {
        "cell": {
          "index": "'"${IDX}"'",
          "value": "'"${VAL}"'"
        },
        "over": false
      }
    }'

echo
