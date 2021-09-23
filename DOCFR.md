# Doc prod-logger FR

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/LeonardoDaFonsecaEsteves/6efb09a5572ada0bac3126f346d76e32/raw/prod-logger__heads_main.json) [![codecov](https://codecov.io/gh/LeonardoDaFonsecaEsteves/prod-logger/branch/main/graph/badge.svg?token=5QTMF25PCI)](https://codecov.io/gh/LeonardoDaFonsecaEsteves/prod-logger) [![CodeQL](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/LeonardoDaFonsecaEsteves/prod-logger/actions/workflows/codeql-analysis.yml)

---

### Ceci est un module de gestion des journaux

le module de gestion des logs peut prendre en paramètre

- un niveau de journal
- un booléan

[essayez-le.](https://codesandbox.io/s/y1658?file=/src/App.js)

---

## niveau de journal autorisé

TRACE = Affiche la pile d'exécution dans la console. La pile est plus simplement l'enchaînement des appels via les différentes fonctions.

INFO = Affiche un message d'information dans la console du navigateur. une petite icône i apparaît devant le message.

DEBUG = Affiche un message dans la console Web, avec le niveau de journal "debug". Le message s'affiche uniquement si la console est configurée pour afficher des messages de type débogage.

WARN = Affiche un message d'avertissement dans la console Web.

ERREUR = Affiche un message d'erreur dans la console du navigateur.

---

## Commencer par construire votre logger

```
   import { logger } from "prod-logger";
   // setup config
   logger.setup(level, seeUpperLevel);
```

`level` = correspont au niveau de log ('trace','info','debug','warn','error')
`seeUpperLevel` = Booléan si vrai affiche les logs superrieur sinon n'affiche que les logs du même niveau :warning: par default valeur a faux :warning:

---

## utilisation du logger

premier exemple ou la configuration et : `logger.setup('warn', false)`;

```
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

deuxieme exemple ou la configuration et : `logger.setup('warn', true)`;

```
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

selon votre configuration les logs superieur seron afficher ou non

---

## :warning: les argumenst passer au logger (trace,info,debug,warn,error) seront tous stringify afin d'avoir une parfaite lisibilité :warning:

```
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

