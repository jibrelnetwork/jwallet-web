#!/bin/sh

echo "OSX version of script"

npx lingui extract --clean
lokalise --config ./lokalise.cfg import --file ./src/data/lingui/en/messages.json --icu_plurals 1 --lang_iso en --cleanup_mode 1
lokalise --config ./lokalise.cfg export --type json --unzip_to ./src/data/lingui --placeholder_format icu --json_unescaped_slashes 1 && \

cd ./src/data/lingui && \
  mv ./locale/en.json ./en/messages.json && \
  mv ./locale/es.json ./es/messages.json && \
  mv ./locale/ja.json ./ja/messages.json && \
  mv ./locale/ko.json ./ko/messages.json && \
  mv ./locale/ru.json ./ru/messages.json && \
  mv ./locale/zh_CN.json ./zh-Hans/messages.json && \
  mv ./locale/zh_TW.json ./zh-Hant/messages.json && \
  rm -rf ./locale

npx lingui compile

echo "Locales successfully synced"
