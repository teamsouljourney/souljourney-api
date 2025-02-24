"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");

// i18next configs
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "de", "tr"],
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
    detection: {
      order: ["header", "querystring", "cookie"],
      lookupHeader: "accept-language",
      lookupCookie: "i18next",
      caches: ["cookie"],
      checkWhitelist: true,
    },
  });

module.exports = i18nextMiddleware.handle(i18next);
