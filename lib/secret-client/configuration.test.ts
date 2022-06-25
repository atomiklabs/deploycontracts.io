import { configuration } from './configuration'

describe('parse configuration from env vars', () => {
  describe('chainSettings', () => {
    afterEach(() => {
      const vars = [
        'CHAIN_ID',
        'CHAIN_NAME',
        'CHAIN_GRPC',
        'CHAIN_RPC',
        'CHAIN_REST',
      ]

      vars.forEach(k => setEnvVar(k))
    })

    it('should throw an error when cannot parse required env vars', () => {
      setEnvVar('CHAIN_ID', undefined);
      setEnvVar('CHAIN_GRPC', undefined);

      expect(() => configuration.chainSettings).toThrow()

      setEnvVar('CHAIN_GRPC', 'not-url');
      setEnvVar('CHAIN_RPC', 'not-url/2');
      setEnvVar('CHAIN_REST', 'also://not-url:1991');

      expect(() => configuration.chainSettings).toThrow()
    })

    it('parse correctly provided env vars', () => {
      const vars = {
        CHAIN_ID: 'my-id',
        CHAIN_NAME: 'my-name',
        CHAIN_GRPC: 'http://local.host:9091',
        CHAIN_RPC: 'https://test-rpc.example.com',
        CHAIN_REST: 'https://api.rest',
      }

      Object.entries(vars).forEach(([k, v]) => setEnvVar(k, v))

      expect(Object.values(configuration.chainSettings)).toStrictEqual(Object.values(vars))
    })
  })
})

function setEnvVar(varName: string, value?: string) {
  if (typeof process.env === 'undefined') {
    console.warn('Could not set env var — process.env is not avaialble')
  }

  if (value) {
    process.env[`NEXT_PUBLIC_${varName}`] = value;
    process.env[varName] = value;
  } else {
    delete process.env[`NEXT_PUBLIC_${varName}`]
    delete process.env[varName]
  }
}