require("dotenv").config();
const { join } = require("path");
const { copySync, removeSync } = require("fs-extra");
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  srcDir: __dirname,
  env: {
    apiUrl: process.env.API_URL || process.env.APP_URL + "/api",
    baseURL: process.env.API_URL || process.env.APP_URL,
    appName: process.env.APP_NAME || "Laravel Nuxt",
    appLocale: process.env.APP_LOCALE || "en",
    githubAuth: !!process.env.GITHUB_CLIENT_ID,
    MIX_PUSHER_APP_KEY: process.env.PUSHER_APP_KEY
  },

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],

    link: [
      { href: "/admin/assets/img/brand/favicon.png", type: "image/png" },
      {
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css",
        rel: "stylesheet"
      },
      {
        href:
          "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
        rel: "stylesheet"
      },
      { href: "/admin/assets/vendor/nucleo/css/nucleo.css", rel: "stylesheet" },
      {
        href:
          "/admin/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css",
        rel: "stylesheet"
      },
      { href: "/admin/assets/css/argon.css", rel: "stylesheet" }
    ],

    script: [
      { src: "/admin/assets/vendor/jquery/dist/jquery.min.js", body: true },
      {
        src: "/admin/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js",
        body: true
      },
      { src: "/admin/assets/vendor/js-cookie/js.cookie.js", body: true },
      {
        src: "/admin/assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js",
        body: true
      },
      {
        src:
          "/admin/assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js",
        body: true
      },
      { src: "/admin/assets/vendor/chart.js/dist/Chart.min.js", body: true },
      {
        src: "/admin/assets/vendor/chart.js/dist/Chart.extension.js",
        body: true
      },
      { src: "/admin/assets/js/argon.js?v=1.2.0", body: true }
    ]
  },

  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/axios", "~/plugins/packages"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  hooks: {
    generate: {
      done(generator) {
        // Copy dist files to public/_nuxt
        if (
          generator.nuxt.options.dev === false &&
          generator.nuxt.options.mode === "spa"
        ) {
          const publicDir = join(
            generator.nuxt.options.rootDir,
            "public",
            "_nuxt"
          );
          removeSync(publicDir);
          copySync(
            join(generator.nuxt.options.generate.dir, "_nuxt"),
            publicDir
          );
          copySync(
            join(generator.nuxt.options.generate.dir, "200.html"),
            join(publicDir, "index.html")
          );
          removeSync(generator.nuxt.options.generate.dir);
        }
      }
    }
  }
};
