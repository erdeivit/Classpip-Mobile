# Classpip Mobile Application

[![Classpip Badge](https://img.shields.io/badge/classpip-mobile-brightgreen.svg)](https://github.com/classpip/classpip-mobile)
[![Build Status](https://travis-ci.org/classpip/classpip-mobile.svg?branch=master)](https://travis-ci.org/classpip/classpip-mobile)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/65b8b3d1b7234b14b6d05db424ce6f09)](https://www.codacy.com/app/classpip/classpip-mobile?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=classpip/classpip-mobile&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/classpip/classpip-mobile/badge.svg?branch=master)](https://coveralls.io/github/classpip/classpip-mobile?branch=master)

[![classpip-icon](https://github.com/classpip/classpip/raw/master/resources/icontext-land.png)](http://www.classpip.com/)

[Classpip](https://www.classpip.com) is a Mobile application for School Gamification. The application is builded around a stack of services and websites to provide a full experience in order to gamificate any educational environment.

This repository contains the mobile application for the [Classpip](https://www.classpip.com) architecture. With this application you could connect to the services oriented architecture.

## Global dependencies

Make sure you have NodeJS installed. Download the installer [here](https://nodejs.org/dist/latest-v5.x/) or use your favorite package manager. It's best to get the 5x version of node along with the 3x version of npm. This offers the best in stability and speed for building.

```
npm install -g ionic@2.2.2
npm install -g cordova@6.4.0
```

For building iOS projects you have to install **Xcode** and **Ruby** for installing the following gem:

```
gem install xcodeproj
```

Install **ios-deploy** to deploy iOS applications to devices.

```
sudo npm install -g ios-deploy --unsafe-perm=true --allow-root
```

## Local dependencies

All the project dependencies are manage through [npmjs](https://www.npmjs.com/). To install this dependencies you should run:

```
npm install
```

## Development

For development purposes, you have to restore the cordova state of the application. All the platforms and plugins files are not uploaded into the repo but you could download with the following command:

```
mkdir www
cordova prepare
```

To see all the **HTML5 development** you could run the following command to see with livereload all the changes on the browser.

```
ionic serve
```

If you want to **emulate** your changes on the platform emulators: android ([Android Emulator](https://developer.android.com/studio/run/emulator.html) or [Genymotion](https://www.genymotion.com/)), iOS emulator

```
ionic emulate [ios|android]
```

If you want to **test the application on real devices** or the browser emulator you could connect a real device in your computer and run:

```
ionic run [ios|android]
```

Finally if you want to build the application for generating the final artifacts for the market deployment you should run the following command for every platform:

```
ionic build [ios|android] --release
```

## Testing

There are some unit tests configured in the application to validate the integrity of the code. This tests are running using karma over phantomJS. To tun the unit tests configured in the application you should run:

```
npm test
```

## Building

For building the application you should execute two scripts located into the /build folder. These scripts use some ENV_VARS that points to diferent certificates and keystores located in your machine.

```
cd build
sh build_{ios|android}.sh
```

## License

Classpip is released under the [Apache2 License](https://github.com/classpip/classpip-mobile/blob/master/LICENSE).
