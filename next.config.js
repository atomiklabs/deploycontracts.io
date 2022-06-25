module.exports = {
  async redirects() {
    return [
      {
        source: '/snipix',
        destination: '/snipix/basic-info',
        permanent: true,
      },
    ]
  },
}
