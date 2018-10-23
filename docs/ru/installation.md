# Требование к ПО и компьютеру.
Для сборки релищза и dev версии android подойдет любой PC.

Для сборки android и IOS приложения нужен mac. Желатель иметь последню версию ОС и Xcode.

Так же требуется nodejs не ниже 8.6 и npm не ниже 5.0 

# Установка и сборка на linux.
1. Установить nodejs не ниже 8.6 https://nodejs.org/en/download/
2. Установить JDK 8 версии http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
3. Установить Android studio https://developer.android.com/studio/install.html во время установки установить
Google APIs,
Android SDK Platform 23,
Intel x86 Atom_64 System Image,
Google APIs Intel x86 Atom_64 System Image,
4. Прописать в bash_profile
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/platform-tools
5. Создать signing key запустить в shell
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 и положить ключь в корень ~/
6. Клонировать репо и настроить пути и ключи до сервера в файле src/config/index.js
7. Установить зависимости cd ./project && npm install
8. Установить npm install react-native-cli -g
9. Для сборки релиза запустить cd android && ./gradlew assembleRelease
10. APK релиз будет собран и доступен в папке android/app/build/outputs/apk/app-release.apk
11. Закачать его на диск телефона и установить 12. Done


# Установка и запуск macos в режиме dev.
1. Установить xcode не ниже 8.3
2. Установить nodejs не ниже 8
3. Клонируем git clone [https://github.com/cscart/mobile-app](https://github.com/cscart/mobile-app)
4. cd mobile-app
5. npm install
6. brew install watchman
7. sudo npm install -g react-native-cli
8. react-native run-ios должен открыться новый терминал и эмулятор. Убедитесь что порт 8081 свооден!

PS/ Иногда в эмуляторе могут появляться нотисы желтые и красные их можно скрыть и обновить приложение comand + R
Так же можно открыть dev консоль нажам в эмуляторе comand + shift + Z и выбрав там пункт 