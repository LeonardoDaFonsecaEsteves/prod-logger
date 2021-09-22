# Doc prod-logger EN

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/LeonardoDaFonsecaEsteves/8a6c3dd8d57f8bcab1d4126ee2caf9d0/raw/prod-logger__heads_main.json) [![codecov](https://codecov.io/gh/LeonardoDaFonsecaEsteves/prod-logger/branch/main/graph/badge.svg?token=5QTMF25PCI)](https://codecov.io/gh/LeonardoDaFonsecaEsteves/prod-logger) [![CodeQL](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml)
***

### This is a logs management module

the log management module can take a log level as a parameter [try it.](https://codesandbox.io/s/y1658?file=/src/App.js)
***

## authorized log level

INFO = Displays an informational message in the browser console. a small i icon appears in front of the message.

DEBUG = Displays a message in the web console, with the log level "debug". The message is displayed only if the console is configured to display debug type messages.

WARN = Displays a warning message in the web console.

ERROR = Displays an error message in the browser console.

TRACE = Displays the execution stack in the console. The stack is more simply the sequence of calls via the various functions.

***
## the first parameter and the log level to display, the second parameter and a boolean that defines if you want to display the levels above your log
 `logger("INFO", true)`
 
****
## if you want to display the level higher than info add in second parameter `true`

 `logger("INFO", true).info('log info visible')`
 
 `logger("INFO", true).debug('log debug visible')`

 `logger("INFO", true).warn('log warn visible')`

 `logger("INFO", true).error('log error visible')`

 `logger("INFO", true).trace('log trace visible')`

****

## if no parameter is entered then no log level will be displayed

`logger().info('log info not visible')`

`logger().debug('log debug not visible')`

`logger().warn('log warn not visible')`

`logger().error('log error not visible')`

`logger().trace('log trace not visible')`

*****

## We can define what level of logs we want to display for this, just pass the level in the first parameter and true in the second
:warning: be careful the higher level will also be displayed :warning:  

 `logger("error").info('log info not visible')`

 `logger("error").debug('log debug not visible')`

 `logger("error").warn('log warn not visible')`

 `logger("error").error('log error visible')`

 `logger("error").trace('log trace visible')`

