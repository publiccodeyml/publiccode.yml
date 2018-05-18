
# Public code Schema

```
http://w3id.org/publiccode/version/0.1.schema.json
```


| Abstract | Extensible | Status | Identifiable | Custom Properties | Additional Properties | Defined In |
|----------|------------|--------|--------------|-------------------|-----------------------|------------|
| Can be instantiated | Yes | Experimental | No | Forbidden | Permitted |  |

# Public code Properties

| Property | Type | Required | Defined by |
|----------|------|----------|------------|
| [applicationSuite](#applicationsuite) | `string` | Optional | Public code (this schema) |
| [awards](#awards) | `string[]` | Optional | Public code (this schema) |
| [countriesNotSupported](#countriesnotsupported) | `string[]` | Optional | Public code (this schema) |
| [countriesSupported](#countriessupported) | `string[]` | Optional | Public code (this schema) |
| [dependencies](#dependencies) | `object` | Optional | Public code (this schema) |
| [developmentStatus](#developmentstatus) | `object` | Optional | Public code (this schema) |
| [intendedAudience](#intendedaudience) | `object` | Optional | Public code (this schema) |
| [it](#it) | `object` | Optional | Public code (this schema) |
| [legal](#legal) | `object` | Optional | Public code (this schema) |
| [localization](#localization) | `object` | Optional | Public code (this schema) |
| [logo](#logo) | `string` | Optional | Public code (this schema) |
| [maintenance](#maintenance) | `object` | Optional | Public code (this schema) |
| [name](#name) | `string` | Optional | Public code (this schema) |
| [platforms](#platforms) | `string[]` | Optional | Public code (this schema) |
| [publiccode-yaml-version](#publiccode-yaml-version) | `string` | **Required** | Public code (this schema) |
| [releaseDate](#releasedate) | `string` | Optional | Public code (this schema) |
| [repoURL](#repourl) | `string` | Optional | Public code (this schema) |
| [roadmap](#roadmap) | `string` | Optional | Public code (this schema) |
| [softwareType](#softwaretype) | `object` | Optional | Public code (this schema) |
| [softwareVersion](#softwareversion) | `string` | Optional | Public code (this schema) |
| [usedBy](#usedby) | `string[]` | Optional | Public code (this schema) |
| `*` | any | Additional | this schema *allows* additional properties |

## applicationSuite
### The Applicationsuite Schema 

`applicationSuite`
* is optional
* type: `string`
* defined in this schema

### applicationSuite Type


`string`





### applicationSuite Example

```json
"MegaProductivitySuite"
```


## awards


`awards`
* is optional
* type: `string[]`

* defined in this schema

### awards Type


Array type: `string[]`

All items must be of the type:
`string`









## countriesNotSupported


`countriesNotSupported`
* is optional
* type: `string[]`

* defined in this schema

### countriesNotSupported Type


Array type: `string[]`

All items must be of the type:
`string`









## countriesSupported


`countriesSupported`
* is optional
* type: `string[]`

* defined in this schema

### countriesSupported Type


Array type: `string[]`

All items must be of the type:
`string`



  
A list of countries explicitly supported







## dependencies


`dependencies`
* is optional
* type: `object`
* defined in this schema

### dependencies Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `hardware`| array | Optional | 
| `open`| array | Optional | 
| `proprietary`| array | Optional | 



#### hardware

undefined

`hardware`
* is optional
* type: `array`


##### hardware Type


Array type: `array`

All items must be of the type:
`string`











#### open

undefined

`open`
* is optional
* type: `array`


##### open Type


Array type: `array`

All items must be of the type:
`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `name`| string | Optional | 
| `optional`| boolean | Optional | 
| `version`| object | Optional | 



#### name
##### The Name Schema 

undefined

`name`
* is optional
* type: `string`

##### name Type


`string`





##### name Example

```json
MySQL
```




#### optional
##### The Optional Schema 

undefined

`optional`
* is optional
* type: `boolean`

##### optional Type


`boolean`



##### optional Example

```json
true
```




#### version

undefined

`version`
* is optional
* type: `object`

##### version Type

Unknown type `object`.

```json
{
  "$id": "/properties/dependencies/properties/open/items/properties/version",
  "type": "object",
  "properties": {
    "greaterThan": {
      "$id": "/properties/dependencies/properties/open/items/properties/version/properties/greaterThan",
      "type": "number",
      "title": "The Greaterthan Schema ",
      "default": 0,
      "examples": [
        1.100000023841858
      ]
    },
    "lesserThan": {
      "$id": "/properties/dependencies/properties/open/items/properties/version/properties/lesserThan",
      "type": "number",
      "title": "The Lesserthan Schema ",
      "default": 0,
      "examples": [
        1.2999999523162842
      ]
    }
  },
  "simpletype": "`object`"
}
```














#### proprietary

undefined

`proprietary`
* is optional
* type: `array`


##### proprietary Type


Array type: `array`

All items must be of the type:
`string`














## developmentStatus


`developmentStatus`
* is optional
* type: `object`
* defined in this schema

### developmentStatus Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `beta`| boolean | Optional | 
| `concept`| boolean | Optional | 
| `development`| boolean | Optional | 
| `obsolete`| boolean | Optional | 
| `stable`| boolean | Optional | 



#### beta
##### Whether the software is a beta

undefined

`beta`
* is optional
* type: `boolean`

##### beta Type


`boolean`



##### beta Example

```json
false
```




#### concept
##### The Concept Schema 

undefined

`concept`
* is optional
* type: `boolean`

##### concept Type


`boolean`



##### concept Example

```json
false
```




#### development
##### The Development Schema 

undefined

`development`
* is optional
* type: `boolean`

##### development Type


`boolean`



##### development Example

```json
true
```




#### obsolete
##### The Obsolete Schema 

undefined

`obsolete`
* is optional
* type: `boolean`

##### obsolete Type


`boolean`



##### obsolete Example

```json
false
```




#### stable
##### The Stable Schema 

undefined

`stable`
* is optional
* type: `boolean`

##### stable Type


`boolean`



##### stable Example

```json
false
```







## intendedAudience


`intendedAudience`
* is optional
* type: `object`
* defined in this schema

### intendedAudience Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `countries`| array | Optional | 
| `institutionType`| string | Optional | 
| `world`| boolean | Optional | 



#### countries

undefined

`countries`
* is optional
* type: `array`


##### countries Type


Array type: `array`

All items must be of the type:
`string`



  
List of the countries









#### institutionType
##### The institution type


`institutionType`
* is optional
* type: `string`

##### institutionType Type


`string`





##### institutionType Example

```json
city
```




#### world
##### The World Schema 

undefined

`world`
* is optional
* type: `boolean`

##### world Type


`boolean`



##### world Example

```json
true
```







## it


`it`
* is optional
* type: `object`
* defined in this schema

### it Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `accessibile`| boolean | Optional | 
| `pianoTriennale`| object | Optional | 
| `riuso`| object | Optional | 



#### accessibile
##### The Accessibile Schema 

undefined

`accessibile`
* is optional
* type: `boolean`

##### accessibile Type


`boolean`



##### accessibile Example

```json
true
```




#### pianoTriennale

undefined

`pianoTriennale`
* is optional
* type: `object`

##### pianoTriennale Type

Unknown type `object`.

```json
{
  "$id": "/properties/it/properties/pianoTriennale",
  "type": "object",
  "properties": {
    "piattaformeAbilitanti": {
      "$id": "/properties/it/properties/pianoTriennale/properties/piattaformeAbilitanti",
      "type": "object",
      "properties": {
        "spid": {
          "$id": "/properties/it/properties/pianoTriennale/properties/piattaformeAbilitanti/properties/spid",
          "type": "boolean",
          "title": "The Spid Schema ",
          "default": false,
          "examples": [
            true
          ]
        },
        "pagopa": {
          "$id": "/properties/it/properties/pianoTriennale/properties/piattaformeAbilitanti/properties/pagopa",
          "type": "boolean",
          "title": "The Pagopa Schema ",
          "default": false,
          "examples": [
            true
          ]
        },
        "cie": {
          "$id": "/properties/it/properties/pianoTriennale/properties/piattaformeAbilitanti/properties/cie",
          "type": "boolean",
          "title": "The Cie Schema ",
          "default": false,
          "examples": [
            true
          ]
        },
        "anpr": {
          "$id": "/properties/it/properties/pianoTriennale/properties/piattaformeAbilitanti/properties/anpr",
          "type": "boolean",
          "title": "The Anpr Schema ",
          "default": false,
          "examples": [
            true
          ]
        }
      }
    },
    "designers": {
      "$id": "/properties/it/properties/pianoTriennale/properties/designers",
      "type": "array",
      "items": {
        "$id": "/properties/it/properties/pianoTriennale/properties/designers/items",
        "type": "object",
        "properties": {
          "kits": {
            "$id": "/properties/it/properties/pianoTriennale/properties/designers/items/properties/kits",
            "type": "array",
            "items": {
              "$id": "/properties/it/properties/pianoTriennale/properties/designers/items/properties/kits/items",
              "type": "object",
              "properties": {
                "service-design": {
                  "$id": "/properties/it/properties/pianoTriennale/properties/designers/items/properties/kits/items/properties/service-design",
                  "type": "boolean",
                  "title": "The Service-design Schema ",
                  "default": false,
                  "examples": [
                    false
                  ]
                }
              }
            }
          }
        }
      }
    },
    "tema": {
      "$id": "/properties/it/properties/pianoTriennale/properties/tema",
      "type": "string",
      "title": "The Tema Schema ",
      "default": "",
      "examples": [
        "theme-school"
      ]
    },
    "api": {
      "$id": "/properties/it/properties/pianoTriennale/properties/api",
      "type": "array",
      "items": {
        "$id": "/properties/it/properties/pianoTriennale/properties/api/items",
        "type": "object",
        "properties": {
          "uses": {
            "$id": "/properties/it/properties/pianoTriennale/properties/api/items/properties/uses",
            "type": "boolean",
            "title": "The Uses Schema ",
            "default": false,
            "examples": [
              true
            ]
          }
        }
      }
    }
  },
  "simpletype": "`object`"
}
```







#### riuso

undefined

`riuso`
* is optional
* type: `object`

##### riuso Type

Unknown type `object`.

```json
{
  "$id": "/properties/it/properties/riuso",
  "type": "object",
  "properties": {
    "codiceIPA": {
      "$id": "/properties/it/properties/riuso/properties/codiceIPA",
      "type": "string",
      "title": "The Codiceipa Schema ",
      "default": "",
      "examples": [
        "http://w3id.org/italia/data/ipa/c_h501"
      ]
    },
    "tag": {
      "$id": "/properties/it/properties/riuso/properties/tag",
      "type": "array",
      "items": {
        "$id": "/properties/it/properties/riuso/properties/tag/items",
        "type": "string",
        "title": "The 0th Schema ",
        "default": "",
        "examples": [
          "comune",
          "anagrafe",
          "cittadino"
        ]
      }
    },
    "categoria": {
      "$id": "/properties/it/properties/riuso/properties/categoria",
      "type": "string",
      "title": "The Categoria Schema ",
      "default": "",
      "examples": [
        "it-anagrafe"
      ]
    }
  },
  "simpletype": "`object`"
}
```










## legal


`legal`
* is optional
* type: `object`
* defined in this schema

### legal Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `authorsFile`| string | Optional | 
| `license`| string | Optional | 
| `mainCopyrightOwner`| string | Optional | 
| `repoOwner`| string | Optional | 



#### authorsFile
##### The Authorsfile Schema 

undefined

`authorsFile`
* is optional
* type: `string`

##### authorsFile Type


`string`





##### authorsFile Example

```json
AUTHORS
```




#### license
##### The License Schema 

undefined

`license`
* is optional
* type: `string`

##### license Type


`string`





##### license Example

```json
AGPL-3.0-or-later
```




#### mainCopyrightOwner
##### The Maincopyrightowner Schema 

undefined

`mainCopyrightOwner`
* is optional
* type: `string`

##### mainCopyrightOwner Type


`string`





##### mainCopyrightOwner Example

```json
Comune di Reggio Emilia and friends
```




#### repoOwner
##### The Repoowner Schema 

undefined

`repoOwner`
* is optional
* type: `string`

##### repoOwner Type


`string`





##### repoOwner Example

```json
Comune di Reggio Emilia
```







## localization


`localization`
* is optional
* type: `object`
* defined in this schema

### localization Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `availableLanguages`| array | Optional | 
| `it`| object | Optional | 
| `localizationReady`| boolean | Optional | 



#### availableLanguages

undefined

`availableLanguages`
* is optional
* type: `array`


##### availableLanguages Type


Array type: `array`

All items must be of the type:
`string`











#### it

undefined

`it`
* is optional
* type: `object`

##### it Type

Unknown type `object`.

```json
{
  "$id": "/properties/localization/properties/it",
  "type": "object",
  "properties": {
    "localizedName": {
      "$id": "/properties/localization/properties/it/properties/localizedName",
      "type": "string",
      "title": "The Localizedname Schema ",
      "default": "",
      "examples": [
        "Medusa"
      ]
    },
    "shortDesc": {
      "$id": "/properties/localization/properties/it/properties/shortDesc",
      "type": "string",
      "title": "The Shortdesc Schema ",
      "default": "",
      "examples": [
        "A really interesting software."
      ]
    },
    "longDesc": {
      "$id": "/properties/localization/properties/it/properties/longDesc",
      "type": "string",
      "title": "The Longdesc Schema ",
      "default": "",
      "examples": [
        "Very long description of this software, also split on multiple rows. You should note what the software is and why one should need it.\n"
      ]
    },
    "screenshots": {
      "$id": "/properties/localization/properties/it/properties/screenshots",
      "type": "array",
      "items": {
        "$id": "/properties/localization/properties/it/properties/screenshots/items",
        "type": "string",
        "title": "The 0th Schema ",
        "default": "",
        "examples": [
          "img/sshot1.jpg",
          "img/sshot2.jpg",
          "img/sshot3.jpg"
        ]
      }
    },
    "videos": {
      "$id": "/properties/localization/properties/it/properties/videos",
      "type": "array",
      "items": {
        "$id": "/properties/localization/properties/it/properties/videos/items",
        "type": "string",
        "title": "The 0th Schema ",
        "default": "",
        "examples": [
          "https://youtube.com/xxxxxxxx"
        ]
      }
    },
    "featureList": {
      "$id": "/properties/localization/properties/it/properties/featureList",
      "type": "array",
      "items": {
        "$id": "/properties/localization/properties/it/properties/featureList/items",
        "type": "string",
        "title": "The 0th Schema ",
        "default": "",
        "examples": [
          "Very important feature",
          "Will run without a problem",
          "Has zero bugs",
          "Solves all the problems of the world"
        ]
      }
    },
    "documentation": {
      "$id": "/properties/localization/properties/it/properties/documentation",
      "type": "string",
      "title": "The Documentation Schema ",
      "default": "",
      "examples": [
        "https://read.the.documentation/medusa/v1.0"
      ]
    }
  },
  "simpletype": "`object`"
}
```







#### localizationReady
##### The Localizationready Schema 

undefined

`localizationReady`
* is optional
* type: `boolean`

##### localizationReady Type


`boolean`



##### localizationReady Example

```json
true
```







## logo
### The Logo Schema 

`logo`
* is optional
* type: `string`
* defined in this schema

### logo Type


`string`





### logo Example

```json
"img/logo.jpg"
```


## maintenance


`maintenance`
* is optional
* type: `object`
* defined in this schema

### maintenance Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `community`| boolean | Optional | 
| `contacts`| array | Optional | 
| `contract`| boolean | Optional | 
| `internal`| boolean | Optional | 
| `unmaintained`| boolean | Optional | 
| `until`| string | Optional | 



#### community
##### The Community Schema 

undefined

`community`
* is optional
* type: `boolean`

##### community Type


`boolean`



##### community Example

```json
true
```




#### contacts

undefined

`contacts`
* is optional
* type: `array`


##### contacts Type


Array type: `array`

All items must be of the type:
`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `affiliation`| string | Optional | 
| `email`| string | Optional | 
| `leadMaintainer`| boolean | Optional | 
| `name`| string | Optional | 
| `phone`| string | Optional | 



#### affiliation
##### The Affiliation Schema 

undefined

`affiliation`
* is optional
* type: `string`

##### affiliation Type


`string`





##### affiliation Example

```json
Comune di Reggio Emilia
```




#### email
##### The Email Schema 

undefined

`email`
* is optional
* type: `string`

##### email Type


`string`





##### email Example

```json
francesco.rossi@comune.reggioemilia.it
```




#### leadMaintainer
##### The Leadmaintainer Schema 

undefined

`leadMaintainer`
* is optional
* type: `boolean`

##### leadMaintainer Type


`boolean`



##### leadMaintainer Example

```json
true
```




#### name
##### The Name Schema 

undefined

`name`
* is optional
* type: `string`

##### name Type


`string`





##### name Example

```json
Francesco Rossi
```




#### phone
##### The Phone Schema 

undefined

`phone`
* is optional
* type: `string`

##### phone Type


`string`





##### phone Example

```json
+39 231 13215112
```











#### contract
##### The Contract Schema 

undefined

`contract`
* is optional
* type: `boolean`

##### contract Type


`boolean`



##### contract Example

```json
false
```




#### internal
##### The Internal Schema 

undefined

`internal`
* is optional
* type: `boolean`

##### internal Type


`boolean`



##### internal Example

```json
false
```




#### unmaintained
##### The Unmaintained Schema 

undefined

`unmaintained`
* is optional
* type: `boolean`

##### unmaintained Type


`boolean`



##### unmaintained Example

```json
false
```




#### until
##### The Until Schema 

undefined

`until`
* is optional
* type: `string`

##### until Type


`string`





##### until Example

```json
2019-01-01
```







## name
### The Name Schema 

`name`
* is optional
* type: `string`
* defined in this schema

### name Type


`string`





### name Example

```json
"Medusa"
```


## platforms


`platforms`
* is optional
* type: `string[]`

* defined in this schema

### platforms Type


Array type: `string[]`

All items must be of the type:
`string`









## publiccode-yaml-version
### Version of the specification

This key specifies the version to which the current publiccode.yml adheres to, for forward compatibility. Current version is 0.1. Accepts a URL

`publiccode-yaml-version`
* is **required**
* type: `string`
* defined in this schema

### publiccode-yaml-version Type


`string`





### publiccode-yaml-version Example

```json
"http://w3id.org/publiccode/version/0.1"
```


## releaseDate
### The Releasedate Schema 

`releaseDate`
* is optional
* type: `string`
* defined in this schema

### releaseDate Type


`string`





### releaseDate Example

```json
"2017-04-15"
```


## repoURL
### The Repourl Schema 

`repoURL`
* is optional
* type: `string`
* defined in this schema

### repoURL Type


`string`





### repoURL Example

```json
"https://example.com/italia/repo.git"
```


## roadmap
### The Roadmap Schema 

`roadmap`
* is optional
* type: `string`
* defined in this schema

### roadmap Type


`string`





### roadmap Example

```json
"https://example.com/italia/medusa/roadmap"
```


## softwareType


`softwareType`
* is optional
* type: `object`
* defined in this schema

### softwareType Type


`object` with following properties:


| Property | Type | Required
|----------|------|----------|
| `configurationFiles`| boolean | Optional | 
| `library`| boolean | Optional | 
| `softwareAddon`| boolean | Optional | 
| `standalone`| boolean | Optional | 



#### configurationFiles
##### The Configurationfiles Schema 

undefined

`configurationFiles`
* is optional
* type: `boolean`

##### configurationFiles Type


`boolean`



##### configurationFiles Example

```json
false
```




#### library
##### The Library Schema 

undefined

`library`
* is optional
* type: `boolean`

##### library Type


`boolean`



##### library Example

```json
false
```




#### softwareAddon
##### The Softwareaddon Schema 

undefined

`softwareAddon`
* is optional
* type: `boolean`

##### softwareAddon Type


`boolean`



##### softwareAddon Example

```json
false
```




#### standalone
##### The Standalone Schema 

undefined

`standalone`
* is optional
* type: `boolean`

##### standalone Type


`boolean`



##### standalone Example

```json
true
```







## softwareVersion
### The Softwareversion Schema 

`softwareVersion`
* is optional
* type: `string`
* defined in this schema

### softwareVersion Type


`string`





### softwareVersion Example

```json
"1.0"
```


## usedBy


`usedBy`
* is optional
* type: `string[]`

* defined in this schema

### usedBy Type


Array type: `string[]`

All items must be of the type:
`string`








