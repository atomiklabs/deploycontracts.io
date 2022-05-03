module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/tokenDetails': { page: '/tokenDetails' },
      '/tokenAllocation': { page: '/tokenAllocation' },
      '/marketing': { page: '/marketing' },
    }
  },
}
