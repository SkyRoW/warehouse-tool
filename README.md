
  
  

  

## Description

  

  

NestJS app for ABRA Flexi integration

  

  

## Installation

  

  

```bash
$  npm  install
```

  

## Env setup

  

Create .env file with Flexi credentials

```bash
FLEXIBEE_SERVER=server:port
FLEXIBEE_COMPANY=company
FLEXIBEE_USERNAME=username
FLEXIBEE_PASSWORD=password
```

  

## Running the app

  

  

```bash
$  npm  run  start
```
## APIs

  
 **GET /warehouse/items** - fetch items in warehouse
Params:

isCompleteXml - adds/removes starting and ending SHOP tags

limit - tells how many items we want to fetch (if not present we are fetching all)

warehouseCode - filter results by warehouse

lastUpdate - filter results by lastUpdate (takes ones that are newer)

 **GET /warehouse/sets** - fetch sets in warehouse


 