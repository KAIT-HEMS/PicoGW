# PicoGW

A minimalist's housing Web API gateway that supports ECHONET Lite. The license is MIT.
The primary distribution site is [here](https://github.com/KAIT-HEMS/PicoGW).

## HowTo

**Checking your node.js version**

```bash
$ node -v
```

We develop this software on node.js v7.6. If you are using an older version, we recommend to update to the latest one.

**Setup**

Clone this repository and install necessary node.js libraries.

```bash
$ git clone --depth 1 https://github.com/KAIT-HEMS/PicoGW.git
$ cd PicoGW
$ npm i
```

**Running**

```bash
$ node main.js
```

**Web access**

Access **8080 port** of the running machine from your favorite Web browser.
Follow the instruction shown in the opened page.

## Additional settings

**Background execution**

The first line is necessary only for first time. The second line should be executed in PicoGW directory.
```bash
$ sudo npm install forever -g
$ forever start main.js
```

**Stop background execution**

```bash
$ forever stop main.js
```


**Changing the server port**

```bash
$ echo '{"serverport":12345}' > v1/clients/web/localstorage.json
```

**Changing the maker code**

```bash
$ echo '{"makercode":12345}' > v1/plugins/echonet/localstorage.json
```

## Licenses

#### MIT

[jQuery](https://jquery.com/)  
[jsTree](https://www.jstree.com/)  
[arped](https://www.npmjs.com/package/arped)  
[echonet-lite](https://www.npmjs.com/package/echonet-lite)  
[express](https://www.npmjs.com/package/express)  
[ipmask](https://www.npmjs.com/package/ipmask)  
[mime](https://www.npmjs.com/package/mime)  
[ping](https://www.npmjs.com/package/ping)  

#### Apache 2

[websocket](https://www.npmjs.com/package/websocket)  
