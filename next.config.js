module.exports = {
  async redirects() {
    return [
      {
        source: '/snip-20',
        destination: '/snip-20/basic-info',
        permanent: true,
      },
    ]
  },
}
