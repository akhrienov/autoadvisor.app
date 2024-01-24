export interface SiteConfigs {
  url: string
  domain: string
  name: string
  description: {
    short: string
    long: string
  }
}

const siteConfigs: SiteConfigs = {
  url: 'https://www.autoadvisor.app',
  domain: 'autoadvisor.app',
  name: 'AutoAdvisor',
  description: {
    short: 'Connect with AI Bot or Expert Mechanics for real-time vehicle advice and solutions',
    long: 'AutoAdvisor is a cutting-edge web application designed to seamlessly connect car owners with AI Bot or Expert Mechanics for online consultations',
  },
}

export default siteConfigs
