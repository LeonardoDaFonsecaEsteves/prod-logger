# prodlogger FR

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/LeonardoDaFonsecaEsteves/8a6c3dd8d57f8bcab1d4126ee2caf9d0/raw/prod-logger__heads_main.json) [![codecov](https://codecov.io/gh/LeonardoDaFonsecaEsteves/prod-logger/branch/main/graph/badge.svg?token=5QTMF25PCI)](https://codecov.io/gh/LeonardoDaFonsecaEsteves/prod-logger) [![CodeQL](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml)

***

### Ceci est un module de gestion des journaux

le module de gestion des journaux peut prendre un niveau de journal comme paramètre [essayez-le.](https://codesandbox.io/s/y1658?file=/src/App.js)
***

## niveau de journal autorisé

INFO = Affiche un message d'information dans la console du navigateur. une petite icône i apparaît devant le message.

DEBUG = Affiche un message dans la console Web, avec le niveau de journal "debug". Le message s'affiche uniquement si la console est configurée pour afficher des messages de type débogage.

WARN = Affiche un message d'avertissement dans la console Web.

ERREUR = Affiche un message d'erreur dans la console du navigateur.

TRACE = Affiche la pile d'exécution dans la console. La pile est plus simplement l'enchaînement des appels via les différentes fonctions.

***
## le premier paramètre et le niveau de log à afficher, le deuxième paramètre et un booléen qui définit si vous souhaitez afficher les niveaux au dessus de votre log
 `logger("INFO", true)`
 
****
## si vous voulez afficher le niveau supérieur à info ajoutez dans le deuxième paramètre `true`

 `logger("INFO", true).info('info visible')`
 
 `logger("INFO", true).debug('debug visible')`

 `logger("INFO", true).warn('warn visible')`

 `logger("INFO", true).error('error visible')`

 `logger("INFO", true).trace('trace visible')`

****

## si aucun paramètre n'est saisi alors aucun niveau de journal ne sera affiché

`logger().info('info non visible')`

`logger().debug('debug non visible')`

`logger().warn('warn non visible')`

`logger().error('error non visible')`

`logger().trace('trace non visible')`

*****

## Nous pouvons définir quel niveau de journaux nous voulons afficher pour cela, il suffit de passer le niveau dans le premier paramètre et vrai dans le second
:warning: attention le niveau supérieur sera également affiché :warning:

 `logger("erreur").info('info non visible')`

 `logger("error").debug('debug non visible')`

 `logger("error").warn('warn non visible')`

 `logger("error").error('error visible')`

 `logger("error").trace('trace visible')`
