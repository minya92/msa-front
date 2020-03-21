module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'msa-ssr',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'MSA MOTO' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['~/assets/styles/default.css', 'swiper/dist/css/swiper.css', 'vue-slider-component/theme/default.css'],
  modules: [, 'cookie-universal-nuxt'],
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    '~/plugins/vee-validate',
    {
      src: '~plugins/vue-slider-component.js',
      ssr: false
    }
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
