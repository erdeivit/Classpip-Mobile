#!/bin/sh

# Check the status of a return value of a command
# If the return value != 0 > Exit the program
check_status () {
  if [ "$*" != "0" ]; then
    echo "[${APP_NAME}] Program exited with: $*" >&2
    exit $*
  fi
}

# Execute a command into the bash terminal
# @param $1 Command to execute
# @param $2 Comment to print
execute_command () {
  if [ "$2" != "" ]; then
    echo "[${APP_NAME}] $2"
  fi
  eval $1
  check_status $?
}

# Check environment variable is set
# @param $1 Variable name to check
# @param $2 Message to print in case of error
check_env () {
  echo "[${APP_NAME}] Validating environmental variable: $1"
  [ -z "$1" ] && echo $2 && exit 1;
}
