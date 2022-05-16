# YAML Config reader

YAML Config reader makes random access to the configuration easier

# Usage

Install yconf using `npm i yconf`

Example:

```
const {YConfig} = require('yconf');

const conf = new YConfig();

conf.loadFile('./resources/config.yaml');

console.log(`Name of config: ${conf.getOrDefault('metadata.name', 'untitled')}`);
```
