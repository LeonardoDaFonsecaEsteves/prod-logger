# prod-logger

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/LeonardoDaFonsecaEsteves/6efb09a5572ada0bac3126f346d76e32/raw/prod-logger__heads_main.json/?target=_blank) [![CodeQL](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml/?target=_blank)


---

### This is a log management module

the log management module can take as a parameter

- a log level
- a boolean

[Try it](https://codesandbox.io/s/y1658?file=/src/App.js/?target=_blank)

---

## Authorized log level

TRACE = Display the execution stack in the console. The stack is more simply the chaining of calls via the various functions.

INFO = Displays an information message in the browser console. a small i icon appears in front of the message.

DEBUG = Displays a message in the web console, with the log level "debug". The message is displayed only if the console is configured to display debug-type messages.

WARN = Displays a warning message in the web console.

ERROR = Displays an error message in the browser console.TRACE = Affiche la pile d'exécution dans la console. La pile est plus simplement l'enchaînement des appels via les différentes fonctions.

INFO = Affiche un message d'information dans la console du navigateur. une petite icône i apparaît devant le message.

DEBUG = Affiche un message dans la console Web, avec le niveau de journal "debug". Le message s'affiche uniquement si la console est configurée pour afficher des messages de type débogage.

WARN = Affiche un message d'avertissement dans la console Web.

ERREUR = Affiche un message d'erreur dans la console du navigateur.

---

## Start by building your logger

```javascript
   import { logger } from "prod-logger";
   // setup config
   logger.setup(level, seeUpperLevel);
```

`level` = Corresponds to log level ('trace','info','debug','warn','error')
`seeUpperLevel` = Boolean if true displays the upper logs otherwise only displays the logs of the same level :warning: the default value
is false :warning:

---

## To use the logger

First example where the configuration is: `logger.setup('warn', false)`;

```javascript
   import { logger } from "prod-logger";
   // setup config
   // level = warn
   // seeUpperLevel = false
   logger.setup(level, seeUpperLevel);

    logger.trace("this is log trace simple");
    logger.info("this is log info simple");
    logger.debug("this is log debug simple");
    logger.warn("this is log warn simple");
    logger.error("this is log error simple");

---
    // output //
     [ Thu, 23 Sep 2021 16:21:25 GMT | TYPE: WARN ] => "this is log warn simple"
---
```

Second example where the configuration is: `logger.setup('warn', true)`;

```javascript
   import { logger } from "prod-logger";
   // setup config
   // level = warn
   // seeUpperLevel = true
   logger.setup(level, seeUpperLevel);

    logger.trace("this is log trace simple");
    logger.info("this is log info simple");
    logger.debug("this is log debug simple");
    logger.warn("this is log warn simple");
    logger.error("this is log error simple");

---
   // output //
     [ Thu, 23 Sep 2021 16:21:25 GMT | TYPE: WARN ] => "this is log warn simple"
     [ Thu, 23 Sep 2021 16:21:25 GMT | TYPE: ERROR ] => "this is log error simple"
---
```

Depending on your configuration, the higher logs will be displayed or not

---

## :warning: the arguments passed to the logger (trace, info, debug, warn, error) will all be stringify in order to have perfect readability

```javascript
   import { logger } from "prod-logger";
   // setup config
   // level = info
   // seeUpperLevel = false
   logger.setup(level, seeUpperLevel);

    logger.info(
        "this is a complex array ",
        { id: 1, str: "content object" },
        [
            "and another array",
            {
                id: 2,
                str: "object ",
            },
        ]
    );
---
   // output //
     [ Thu, 23 Sep 2021 16:21:25 GMT | TYPE: INFO ] =>  this is a complex array  [{"id":1,"str":"content object"}][["and another array",{"id":2,"str":"whit object ^^"}]]
---
```

---

[CHANGELOG](CHANGELOG.md)
