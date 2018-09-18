#!/bin/sh

# Import build utils script
. ./build_utils.sh

# Artifact information
APP_NAME=classpip
APP_VERSION=1.0.3
APK_NAME=${APP_NAME}-${APP_VERSION}.apk
OUTPUT_APK=${PWD}/${APK_NAME}

# Build information
BUILD_DIR=${PWD}/../platforms/android/build/outputs/apk
BUILD_APK=${BUILD_DIR}/android-release-unsigned.apk
BUILD_TOOLS=${ANDROID_HOME}/build-tools/25.0.0

# Check env variables
check_env "${ANDROID_HOME}" "ANDROID_HOME environment variable must define the location of the Android SDK"
check_env "${KEYSTORE}" "KEYSTORE environment variable must point to a valid keystore"
check_env "${KEYSTOREPWD}" "KEYSTOREPWD environment variable must contain the keystore password"
check_env "${KEYSTOREALIAS}" "KEYSTOREALIAS environment variable must contain the keystore alias"

# Dependencies
execute_command "npm install --loglevel warn" "Downloading npm dependencies..."
execute_command "cordova prepare" "Installing cordova dependencies..."

# Build the application
execute_command "ionic info" ""
execute_command "ionic build android --prod --release" "Building the app..."
execute_command "echo ${KEYSTOREPWD} | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ${KEYSTORE} ${BUILD_APK} ${KEYSTOREALIAS}" "Signing the app..."
execute_command "${BUILD_TOOLS}/zipalign -f -v 4 ${BUILD_APK} ${BUILD_DIR}/${APK_NAME}" "Aligning the app..."
execute_command "mv ${BUILD_DIR}/${APK_NAME} ${OUTPUT_APK}" "Moving final apk..."
echo "[${APP_NAME}] apk: ${OUTPUT_APK}"
