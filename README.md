# MY TS backend boilerplate

Main idea behind template is to create modular project with several layers of access to codebase.

## Table of Contents

- [About](#about)
- [Usage](#usage)

## About <a name = "about"></a>

### Layers:

- **core** directory supposed to contain heavy logic of module, bare generic methods, etc.
- **access-layer** directory supposed to contain wrappers (api) to **core** modules, interfaces with only required functionality, critical values checks, etc.
- **logic** directory is where user writes business logic and calls access-layer api to interact with core modules

In case of express, for example, it's useless to throw it into core/access-layer since framework is already designed to be used in place, would be hard to integrate in the middle of some project (as a module) and doesn't really have anything to wrap around.

On the other hand, jwt library could be integrated almost anywhere and has lots of options, which could be easily configured through wrappers, so it's in core/access-layer.

---

### Modules:

- cli-prompts
- dashboad
- errors (generic class)
- fs
- jwt
- logger
- pubsub
- services -...

---

### Features:

~ work in progress ~~ rework in progress

1. Nested Errors throw structure
2. Wrapper for CLI prompts | _based on [Inquirer](https://www.npmjs.com/package/inquirer)_
3. Interactive CLI Dashboard with multiple widgets | _based on [Blessed](https://www.npmjs.com/package/blessed)_
4. Custom lightweight PUB-SUB implementation
5. Multiple channels of logging | _based on custom PUB-SUB_
6. ~~Requests wrapper | _based on [Axios](https://www.npmjs.com/package/axios)_
7. Various package.json scripts
8. Docker containerized
9. tsconfig file splitted in 2 layers
10. Handpicked eslint config

### Planned:

1. Websocket
2. Add express and split to another boilerplate (?)
3. Database (postgres?) integration
4. Actions with filesystem

---

**All examples could be found in** `./src/examples/`

**And should be inported to** `./src/app.ts`

**Then execute from init block**

---

### 1. Logs workflow

1. From access layer user subscribes to logging channel using **CONSUMER**
2. Consumer takes provided **CONTROLLER** and listens for logs, when log appears - sends it to controller
3. Controller processes log, formats it to fit further needs and sends to **STORAGE**, where hash being assigned to log and log itself stored in map
4. Storage rotates logs and is constantly being polled by **REPRESENTER** of target type, which accesses logs by hash and redirects in desired form/size to final destination

For now there are 2 types of logs destinations:

- cli dashboad
- basic cli output

With such setup there could be added any amount of customizable logs destinations (to local socket, to web path, to filesystem, etc.) just by following existing templates.

---

Important to notice that **logger** module is focused on **receiving, processing, storing and redirecting/representing** logs. You still have to **provide logs** to it i.e. **fire an event** with matching source, while consumer listening to the same event emitter. **Pub-Sub** module helps with that and is currently hardcoded as dependency in **consumer**.

---

### 2. Errors (formatted)

```
##############################
->Error type
 |-NO_DATA
->ERROR_DESCRIPTION
 |-General error level
 |-Error happened on server side, no user input took part
 |-Response error, resource returned bad status or message
 |-No (body) in response
->ERROR_TIMESTAMP_HR
 |-2021-10-29T13:56:53.540Z
->ERROR_TIMESTAMP
 |-1635515813540
->ERROR_ORIGIN
 |-INTERNAL
->ERROR_MESAGE
 |-Some error message passed in
##############################
```

### 3. Prompts preview

![Pic-1](https://github.com/SanariSan/ts-boilerplate-v2/blob/master/assets/prompt-1.png?raw=true)

![Pic-2](https://github.com/SanariSan/ts-boilerplate-v2/blob/master/assets/prompt-2.png?raw=true)

### 4. Dashboard preview

![Page-1](https://github.com/SanariSan/ts-boilerplate-v2/blob/master/assets/cli-1.png?raw=true)

![Page-2](https://github.com/SanariSan/ts-boilerplate-v2/blob/master/assets/cli-2.png?raw=true)

```
// blessed key annotations ; from library source code

var name = (key.ctrl ? 'C-' : '')
+ (key.meta ? 'M-' : '')
+ (key.shift && key.name ? 'S-' : '')
+ (key.name || ch);

// tested and here's the results
// *even these might not work if local shortcut enabled on those keys
/*
    ORDER : C M S
	WORKS : C-key (ctrl) || M-key (alt) || S-key (shift) || C-S-key (ctrl+shift) || M-S-key (alt+shift)
	DOESN'T WORK :  C-M-key (ctrl + alt) || C-M-S-key (ctrl+alt+shift)
	VSCODE : C-key (ctrl) || M-key (alt) || S-key (shift)
    RECOMMENDED : key || C-key || S-key
*/
```

## Usage <a name = "usage"></a>

Just:

`docker-compose up --build`

---

To setup db only you can run:

```
docker build -t ts-backend-postgres:1 -f $pwd/docker/postgres.Dockerfile .
```

```
docker run -d --rm --name ts-backend-postgres -e POSTGRES_USER=ts_backend_admin -e POSTGRES_PASSWORD=super_secret_pWd -e POSTGRES_DB=ts_backend_db -v $pwd/db/pgdata:/var/lib/postgresql/data -p 5433:5432 --shm-size=512mb ts-backend-postgres:1
```

It's also possible to run main app with only docker too.

However only viable if **not using db** at the same time, otherwise have to setup network too.

```
docker build -t sanarisan/ts-backend-v2:1 -f $pwd/docker/app.Dockerfile .
```

```
docker run -it --rm --name ts-backend-app -p 3000:3000 ts-backend-postgres:1
```

---

To start without docker use (actually try to avoid):

```
yarn start-win
```

```
yarn start-linux
```
