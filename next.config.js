module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/tokenDetails': { page: '/tokenDetails' },
    }
  },
}
