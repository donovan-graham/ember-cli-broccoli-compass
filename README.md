## ember-cli-broccoli-compass

This addon adds [compass](http://compass-style.org/) compiler for [Ember CLI](http://www.ember-cli.com/).

### Installation

In your Ember CLI app (>= v0.0.37) run the following:

```bash
npm install --save-dev ember-cli-broccoli-compass
```

### Requirements

`compass` should be installed on your machine in order for this addon to work.

To install `compass`, run:

```bash
gem install compass
```

### Usage

After installation everything should work automatically.

A file named `appname.scss` in your `app/styles` directory should be compiled into `appname.css` 
with `ember build` or `ember serve` commands.

Run compass init to create your config.rb file. Add the following in your Brocfile for path to config file:

```javascript
var app = new EmberApp({
  compassOptions: {
    configFile: 'config.rb'
  }
});
```

### References

* [compass](http://compass-style.org/)
* [broccoli-compass](https://github.com/g13013/broccoli-compass)
* [broccoli](https://github.com/broccolijs/broccoli)

This work is built based on the [gist](https://gist.github.com/wagenet/79b804eb943b9f3d7594) by [@wagenet](https://github.com/wagenet) and forked from [@quaertym](https://github.com/quaertym/ember-cli-compass-compiler)

### Other

Still a work in progress, use at your own risk.

### LICENSE

MIT
