import { configuration } from './configuration'

describe('parse configuration from env vars', () => {
  describe('tokenFactorySettings', () => {
    afterEach(() => {
      const vars = [
        'CODE_HASH',
        'CODE_ID',
        'SNIPIX_SOURCECODE_URL',
        'SNIPIX_TOKEN_DECIMALS',
      ]

      vars.forEach(k => setEnvVar(k))
    })

    it('should throw an error when cannot parse required env vars', () => {
      setEnvVar('CODE_HASH', undefined);
      setEnvVar('CODE_ID', undefined);
      setEnvVar('SNIPIX_SOURCECODE_URL', undefined);
      setEnvVar('SNIPIX_TOKEN_DECIMALS', undefined);

      expect(() => configuration.tokenFactorySettings).toThrow()

      setEnvVar('CODE_HASH', '');
      setEnvVar('CODE_ID', '');
      setEnvVar('SNIPIX_SOURCECODE_URL', 'no-url-sorry');
      setEnvVar('SNIPIX_TOKEN_DECIMALS', '');

      expect(() => configuration.tokenFactorySettings).toThrow()
    })

    it('parse correctly provided env vars', () => {
      const vars = {
        CODE_HASH: '39c09f6629772489c71e52b374344bc3cab7bd3845bb75e3e2a97221282a0219',
        CODE_ID: '89',
        SNIPIX_SOURCECODE_URL: 'https://github.com/atomilabs/snip-20-test-link',
        SNIPIX_TOKEN_DECIMALS: '6',
      }

      Object.entries(vars).forEach(([k, v]) => setEnvVar(k, v))

      expect(configuration.tokenFactorySettings.codeId).toStrictEqual(parseInt(vars.CODE_ID, 10))
      expect(configuration.tokenFactorySettings.codeHash).toStrictEqual(vars.CODE_HASH)
      expect(configuration.tokenFactorySettings.sourceCodeUrl).toStrictEqual(vars.SNIPIX_SOURCECODE_URL)
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