# ping-minecraft

A minecraft server ping & query tool

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
  - [Ping Minecraft Server](#ping-minecraft-server)
  - [Command Line](#command-line)
- [API](#api)
  - [ping](#ping)

## Installation

```
npm i ping-minecraft
```

## Usage

### Simple Example

Code

```js
import ping from 'ping-minecraft';

// Ping localhost:25565
ping('localhost')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    throw err;
  });
```

<details><summary>Result</summary>

```js
{
  error: undefined,
  type: 'ping/minecraft',
  host: 'localhost',
  ip: 127.0.0.1,
  port: 25565,
  version: { name: 'Paper-1.19.2', protocol: 760 },
  description: { text: 'A Minecraft Server' },
  players: {
    current: 4,
    max: 20,
    sample: [
      { name: "Example", id: "long-uuid-string..." },
      { name: "Sample", id: "long-uuid-string..." },
      { name: "Players", id: "long-uuid-string..." },
      { name: "List", id: "long-uuid-string..." }
    ]
  },
  favicon: /* strinf of data:image/png;base64,... */,
  time: 213
}
```

</details>

### Command Line

```
node node_modules/ping-minecraft/index.mjs [host]:<port>
```

or

```
cd node_modules/ping-port
npm run query [host]:<port>
```

Example

```
npm run query localhost:25575
```

<details><summary>Result</summary>

```
Running ping-minecraft at 2022-09-24T14:06:09.163Z

target  : localhost
ip      : 127.0.0.1
port    : 25575

version : Paper 1.19.2 (760)
players : 4/20
  sample  : 4 players
    Example (00000000-0000-0000-0000-000000000000)
    Sample (00000000-0000-0000-0000-000000000000)
    Players (00000000-0000-0000-0000-000000000000)
    List (00000000-0000-0000-0000-000000000000)
motd    : { text: 'A Minecraft Server' }
favicon : 512 chars
```

</details>

## API

### ping

```js
ping(host, port, options); //return Promise
```

host: `string [host]`<br>
port: `number <port>`<br>
options: `Object`<br>
&nbsp;&nbsp;options.timeout: `number <miliseconds>`<br>
&nbsp;&nbsp;options.filterBogon: `boolean`<br>
&nbsp;&nbsp;options.dnsServer: `string <server>`<br>
&nbsp;&nbsp;options.version: `number <version>`<br>
