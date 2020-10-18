const fnArgs = require('parse-fn-args')

module.exports = () => {
  const dependencies = {}
  const factories = {}
  const container ={}

  container.factory = (name, factory) => {
    factories[name] = factory
  }

  container.register = (name, dep) => {
    dependencies[name] = dep
  }

  container.get = name => {
    if (!dependencies[name]) {
      const factory = factories[name]

      dependencies[name] = factory && inject(factory)

      if (!dependencies[name]) throw new Error(`Cannot find ${name} module`)
    }

    return dependencies[name]
  }

  function inject(factory) {
    const args = fnArgs(factory).map(dependency => container.get(dependency));

    return factory.apply(null, args)
  }

  return container
}