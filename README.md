# nbot
Simple IRC bot written in JS

Dependencies

install nodejs and npm

https://nodejs.org/en/download/package-manager/

``` bash
    # Installs modules
    npm install

    # NB! irc module is not maintained and cointains a bug related to channel modes
    # Apply the included patch after npm install

    # Patch irc module
    patch node_modules/irc/lib/irc.js irc.patch


    # Start bot with first time configuration wizard:
    npm start

```
