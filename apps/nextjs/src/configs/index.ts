import envConfigs, { EnvConfigs } from './env.configs'
import siteConfigs, { SiteConfigs } from './site.configs'

type AppConfigs = {
  env: EnvConfigs
  site: SiteConfigs
}

const configs: AppConfigs = {
  env: envConfigs,
  site: siteConfigs,
}

export default configs
