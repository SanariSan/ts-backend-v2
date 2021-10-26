# MY TS boilerplate

## Table of Contents

- [About](#about)
- [Usage](#usage)

## About <a name = "about"></a>

**Features:**

1. Nested Errors throw structure | _classes_ |
2. Custom wrapper for CLI prompts of all kinds | _based on [Inquirer](https://www.npmjs.com/package/inquirer)_ | _classes_ |
3. Interactive Multiple screens CLI Dashboard | _based on [Blessed](https://www.npmjs.com/package/blessed)_ | _classes_ |
4. Custom events controller | _classes_ |
5. Extensible services template | _based on [Axios](https://www.npmjs.com/package/axios)_ |
6. Custom PUB-SUB realisation | _classes_ |
7. Various package.json scripts
8. Docker containerized
9. tsconfig.json file splitted in 2 layers

**Planned:**

0. Finish some features listed above
1. Logger
2. Actions with filesystem
3. Websocket
4. Add express and split to another boilerplate
5. Database (postgres?) integration 


```
// blessed key annotations from source code 

var name = (key.ctrl ? 'C-' : '')
+ (key.meta ? 'M-' : '')
+ (key.shift && key.name ? 'S-' : '')
+ (key.name || ch);

// tested and got this

/*
    ORDER : C M S
	WORK : C-key (ctrl) || M-key (alt) || S-key (shift) || C-S-key (ctrl+shift) || M-S-key (alt+shift)
	DOESN'T WORK :  C-M-key (ctrl + alt) || C-M-S-key (ctrl+alt+shift)
	VSCODE : C-key || M-key || S-key (but even these might not work if local shortcut enabled on those keys)
            
    recommended C-key || S-key
*/
```

## Usage <a name = "usage"></a>

Dev

```yarn start```

Production

```yarn start-prod-linux```

Or

```docker-compose up --build```
 
