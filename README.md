# nbot
nodejs IRC bot

Deps:

install nodejs and npm

https://nodejs.org/en/download/package-manager/


Installs dependent modules
  npm install

NB! irc module is not maintained and cointains a bug related to channel modes
Apply the included patch after npm install

  patch node_modules/irc/lib/irc.js irc.patch


Start bot with first time configuration wizard:
  npm start
