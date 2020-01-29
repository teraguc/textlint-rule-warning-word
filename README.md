# textlint-rule-warning-word


## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-warning-word

## Usage

1.`rulePaths`(required) : array of YAML file.

```json
{
  "rules": {
    "warning-word": {
      "rulePaths" :["warning-word.yml","warning-word-1.yml"]
    }
  }
}
```

2.`rules` (required) : YAML file is placed under the dict folder.words are enclosed in slashes. Also,Regular expressions can also be used.

```yaml
version: 1
rules:
  - /word/
  - /word1/
  - /[0-9]+/
  - /[a-zA-Z!-/:-@\[-`{-~]+/
```

3.Command Line Interface. 

```
./node_modules/.bin/textlint README.md
```

### Build

Builds source codes for publish to the `lib/` folder.   
You can write ES2015+ source codes in `src/` folder.

    npm run build

## License

ISC © 
