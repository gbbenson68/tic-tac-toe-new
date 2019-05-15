#!/bin/bash
# TODO - Move this link into some sort of config file or env variable.
URL="https://tic-tac-toe-wdi.herokuapp.com"

if [ $# -ne 1 ]
then
  echo
  echo "     Usage: ${0} <token>"
  echo
  exit 1
fi

TOKEN=${1}

echo -n "Enter old password: "
stty -echo
read OLDPASS
stty echo
echo

echo -n "Enter new password: "
stty -echo
read NEWPASS
stty echo
echo
#echo ${TOKEN}
#echo ${OLDPASS}
#echo ${NEWPASS}

curl "${URL}/change-password" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPASS}"'",
      "new": "'"${NEWPASS}"'"
    }
  }'

echo
