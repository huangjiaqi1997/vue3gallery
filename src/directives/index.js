// import lazy from './lazy'

export default {
  install(app) {
    // app.directive('lazy', lazy)

    const directives = import.meta.glob('./*.js', { eager: true })
    for (const [path, module] of Object.entries(directives)) {
      const name = path.replace('./', '').split('.')[0]
      app.directive(name, module.default)
    }
  }
}
