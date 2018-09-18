#!/bin/sh

# Import build utils script
. ./build_utils.sh

# Artifact information
APP_NAME=classpip
DISPLAY_NAME=Classpip
APP_VERSION=1.0.3
OUTPUT_DIR=${PWD}
ARCHIVE=${OUTPUT_DIR}/${APP_NAME}-${APP_VERSION}.xcarchive
IPA=${OUTPUT_DIR}/${APP_NAME}-${APP_VERSION}.ipa

# Build information
BUILD_DIR=${PWD}/../platforms/ios
XCODEPROJ=${BUILD_DIR}/${DISPLAY_NAME}.xcodeproj
SCHEME=${DISPLAY_NAME}

# Check env variables
check_env "${PROV}" "PROV environment variable must be set to the name of the mobileprovision name on the Apple Developer Portal"
check_env "${UUID}" "UUID environment variable must be set to the UUID of the mobile provisioning profile that will be used to build the app"
check_env "${CODE_SIGN}" "CODE_SIGN environment variable must be set to the identity that will be used to sign the app"

# Dependencies
execute_command "npm install --loglevel warn" "Downloading npm dependencies..."
execute_command "cordova prepare" "Installing cordova dependencies..."

# Build the application
execute_command "ionic info" ""
execute_command "ionic build ios --prod --release" "Building the app..."
execute_command "xcodebuild clean -project ${XCODEPROJ} -configuration Release -alltargets" "Cleaning the project..."
execute_command "rm -rf ${ARCHIVE}" ""
execute_command "xcodebuild archive -project ${XCODEPROJ} -scheme ${SCHEME} -archivePath ${ARCHIVE} -configuration Release PROVISIONING_PROFILE=${UUID} CODE_SIGN_IDENTITY=\"${CODE_SIGN}\"" "Generating xcarchive..."
execute_command "rm -rf ${IPA}" ""
execute_command "xcodebuild -exportArchive -archivePath ${ARCHIVE} -exportPath ${IPA} -exportFormat ipa -exportProvisioningProfile \"${PROV}\"" "Building ipa..."
echo "[${APP_NAME}] xcarchive: \"${ARCHIVE}\""
echo "[${APP_NAME}] ipa: \"${IPA}\""
