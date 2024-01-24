export type EnvConfigs = Record<string, any>

const envConfigs: EnvConfigs = {
  ...process.env,
}

export default envConfigs
