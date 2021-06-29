# jqb-pages

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> static web app workflow

## Installation

```shell
$ yarn add jqb-pages

# or npm
$ npm install jqb-pages
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const jqbPages = require("jqb-pages");
const result = jqbPages("jqb");
// result => 'jqb@jqb.me'
```

## API

<!-- TODO: Introduction of API -->

### jqbPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'jqb.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; gknick <gknick@126.com>

[downloads-image]: https://img.shields.io/npm/dm/jqb-pages.svg
[downloads-url]: https://npmjs.org/package/jqb-pages
[version-image]: https://img.shields.io/npm/v/jqb-pages.svg
[version-url]: https://npmjs.org/package/jqb-pages
[license-image]: https://img.shields.io/github/license/jqb/jqb-pages.svg
[license-url]: https://github.com/jqb/jqb-pages/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/jqb/jqb-pages.svg
[dependency-url]: https://david-dm.org/jqb/jqb-pages
[devdependency-image]: https://img.shields.io/david/dev/jqb/jqb-pages.svg
[devdependency-url]: https://david-dm.org/jqb/jqb-pages?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
