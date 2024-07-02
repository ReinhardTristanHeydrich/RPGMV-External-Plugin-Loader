(function () {
  const path = require('path')

  const Directory = {
    basic: typeof nw !== 'undefined' ? nw.__dirname : __dirname,
    get Base() { return path.join(this.basic, '!External') },
    get Plugins() { return path.join(this.Base, 'Plugins') },
    get Configs() { return path.join(this.Base, 'Configs') },
    get UnConfigs() { return path.join(this.Plugins, 'Unconfig') }
  }

  const fs = require('fs')
  const toml = require(path.join(Directory.Base, 'node_modules', 'smol-toml', 'dist'))

  const LoadPlugins = (plugins, isConfig) => {
    if (plugins.length === 0) return
    const defaultPath = PluginManager._path
    PluginManager._path = path.join(isConfig ? Directory.Plugins : Directory.UnConfigs, '/')
    for (const plugin of plugins) {
      if (!isPluginExecuted(plugin)) {
        if (isConfig && !isConfigExistent(plugin)) {
          const tomlContent = generateTomlConfig(plugin)
          fs.writeFileSync(`${Directory.Configs}/${plugin}.toml`, tomlContent)
        }
        LoadScript(plugin, isConfig)
      }
    }
    PluginManager._path = defaultPath
  }

  //===============================================================================================================
  const generateTomlConfig = (plugin) => {
    const File = fs.readFileSync(`${Directory.Plugins}/${plugin}.js`, 'utf-8').split(/[\r\n]+/)
    let index = -1
    let match
    let Param = {
      param: [],
      parent: [],
      default: [],
    }
    for (const Line of File) {
      switch (true) {
        case Line.includes('@param'): { index++; match = Line.match(/@param\s+(.+)/); Param.param[index] = match[1]; } break
        case Line.includes('@parent'): { match = Line.match(/@parent\s+(.+)/); Param.parent[index] = match[1]; } break
        case Line.includes('@default'): { match = Line.match(/@default\s+(.+)/); if (match) Param.default[index] = match[1]; else Param.default[index] = ""; } break
      }
    }

    let TomlContent = {};

    for (let i = 0; i <= index; i++) {
      const parent = Param.parent[i];
      const param = Param.param[i];
      const defaultValue = Param.default[i] || '';
  
      if (param) {
        if (parent) {
          if (!TomlContent[parent]) {
            TomlContent[parent] = {};
          }
          TomlContent[parent][param] = defaultValue;
        } else {
          TomlContent[param] = defaultValue;
        }
      }
    }
    return toml.stringify(TomlContent).replace(/\]/g, '').replace(/\[/g, '#')
  }

  const LoadScript = (plugin, isConfig) => {
    if (isConfig) { PluginManager._parameters[plugin.toLowerCase()] = toml.parse(fs.readFileSync(`${Directory.Configs}/${plugin}.toml`, 'utf-8')) }
    if (isPluginExistent(plugin) && !isPluginExecuted(plugin)) {
      PluginManager.loadScript(`${plugin}.js`)
      PluginManager._scripts.push(plugin)
    } else if (!isPluginExistent) { console.log(`PLUGIN FILE DOESN'T EXISTS`) }
  }

  const isPluginExecuted = (plugin) => PluginManager._scripts.includes(plugin)
  const isPluginExistent = (plugin) => fs.existsSync(path.join(PluginManager._path, `${plugin}.js`))
  const isConfigExistent = (plugin) => fs.existsSync(path.join(Directory.Configs, `${plugin}.toml`))

  const Config = toml.parse(fs.readFileSync(path.join(Directory.Base, 'Config.toml'), 'utf-8'))
  const OriginalPluginManagerSetup = PluginManager.setup
  PluginManager.setup = function (plugins) {
    LoadPlugins(Config.UnConfig.Before, false)
    LoadPlugins(Config.Plugins.Before, true)
    OriginalPluginManagerSetup.call(this, plugins)
    LoadPlugins(Config.Plugins.After, true)
    LoadPlugins(Config.UnConfig.After, false)
  }
})()
