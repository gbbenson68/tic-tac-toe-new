#!/bin/bash
# TODO - Move this link into some sort of config file or env variable.
URL="https://tic-tac-toe-wdi.herokuapp.com"

if [ $# -ne 1 ]
then
  echo
  echo "     Usage: ${0} <email>"
  echo
  exit 1
fi

EMAIL=${1}
echo -n "Enter password: "
stty -echo
read PASSWORD
stty echo
echo

#echo ${URL}
#echo ${EMAIL}
#echo ${PASSWORD}

curl "${URL}/sign-up" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
