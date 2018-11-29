# Software and PC requirements
To build a release and dev versions for Android, any PC will do.

To build Android and iOS applications, you need a Mac. It's best to have the latest OS and Xcode.

Other requirements include nodejs 8.6 or newer and npm 5.0 or newer.

# Installation and building on Linux.
1. Install nodejs at least 8.6 https://nodejs.org/en/download/
2. Install JDK version 8 http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
3. Install Android studio https://developer.android.com/studio/install.html; during the installation, install
Google APIs
Android SDK Platform 23,
Intel x86 Atom_64 System Image,
Google APIs Intel x86 Atom_64 System Image,
4. Write this in bash_profile:
  export ANDROID_HOME = $ HOME / Android / Sdk
  export PATH = $ PATH: $ ANDROID_HOME / tools
  export PATH = $ PATH: $ ANDROID_HOME / platform-tools
5. Create a signing key and run in the shell
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 and put the key into root ~/
6. Clone the repo and configure paths and keys to the server in the src / config / index.js file
7. Install the dependencies: cd ./project && npm install
8. Install npm install react-native-cli -g
9. To build the release, run cd android && ./gradlew assembleRelease
10. APK release will be compiled and available in the android / app / build / outputs / apk / app-release.apk folder
11. Download it to your phone and install
12. Done


# Install and run macos in dev mode.
1. Install xcode 8.3 or newer
2. Install nodejs 8 or newer
3. Use git clone [https://github.com/cscart/mobile-app](http: //github.com/cscart/mobile-app)
4. cd mobile-app
5. npm install
6. brew install watchman
7. sudo npm install -g react-native-cli
8. react-native run-ios should open a new terminal and emulator. Make sure port 8081 is free!

P.S. Sometimes in the emulator, note may appear in yellow and red; you can hide them and update the application comand + R
You can also open the dev console, use command + shift + Z in the emulator and select the option
