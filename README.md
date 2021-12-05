# MY TS backend boilerplate

## Table of Contents

- [About](#about)
- [Usage](#usage)

## About <a name = "about"></a>

**Features:**

~ work in progress ~~ rework in progress

1. Nested Errors throw structure
2. Wrapper for CLI prompts | _based on [Inquirer](https://www.npmjs.com/package/inquirer)_
3. Interactive CLI Dashboard with multiple widgets  | _based on [Blessed](https://www.npmjs.com/package/blessed)_
4. Custom lightweight PUB-SUB implementation 
5. Multiple channels of logging | _based on custom PUB-SUB_
6. ~~Requests wrapper | _based on [Axios](https://www.npmjs.com/package/axios)_
7. Various package.json scripts
8. Docker containerized
9. tsconfig file splitted in 2 layers
10. Well thought eslint config

**Planned:**

1. Websocket
2. Add express and split to another boilerplate
3. Database (postgres?) integration
4. Actions with filesystem

---

**All examples could be found in** 
`./src/examples/` 

**And should be inported to** 
`./src/app.ts` 

**Then execute from init block**

---

**1. Errors**

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

**2. Prompts preview**

![Pic-1](https://github.com/SanariSan/ts-boilerplate-v2/blob/master/assets/prompt-1.png?raw=true) 

![Pic-2](https://github.com/SanariSan/ts-boilerplate-v2/blob/master/assets/prompt-2.png?raw=true)

**3. Dashboard preview**

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

Dev

`yarn start`

Production

`yarn start-prod-linux`

Or

`docker-compose up --build`
