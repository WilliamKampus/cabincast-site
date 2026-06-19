(function () {
  var storageKey = "cabincast.language";
  var supportedLanguages = {
    en: "en",
    ja: "ja"
  };

  function safeGetPreference() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function safeSetPreference(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // Language switching should still work when storage is unavailable.
    }
  }

  function normalizeLanguage(language) {
    if (!language) {
      return "en";
    }

    return String(language).toLowerCase().indexOf("ja") === 0 ? "ja" : "en";
  }

  function preferredLanguage() {
    var saved = safeGetPreference();
    if (supportedLanguages[saved]) {
      return saved;
    }

    var browserLanguages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "en"];

    return normalizeLanguage(browserLanguages[0]);
  }

  function pageName(pathname) {
    var normalized = pathname || "/";

    if (normalized === "/" || /\/index\.html$/.test(normalized) || /\/ja\/?$/.test(normalized) || /\/ja\/index\.html$/.test(normalized)) {
      return "index.html";
    }

    if (/\/support\.html$/.test(normalized)) {
      return "support.html";
    }

    if (/\/privacy\.html$/.test(normalized)) {
      return "privacy.html";
    }

    return null;
  }

  function basePath(pathname) {
    return (pathname || "/").replace(/\/ja\/?$/, "/").replace(/\/ja\/[^/]*$/, "/").replace(/\/[^/]*$/, "/");
  }

  function targetPath(language, name, currentPath) {
    var base = basePath(currentPath);

    if (name === "index.html") {
      return language === "ja" ? base + "ja/" : base;
    }

    return language === "ja" ? base + "ja/" + name : base + name;
  }

  function maybeRedirect() {
    var currentLanguage = normalizeLanguage(document.documentElement.lang);
    var targetLanguage = preferredLanguage();
    var name = pageName(window.location.pathname);

    if (!name || targetLanguage === currentLanguage) {
      return;
    }

    var destination = targetPath(targetLanguage, name, window.location.pathname) + window.location.search + window.location.hash;
    window.location.replace(destination);
  }

  window.CabinCastLanguage = {
    setLanguage: function (language, destination) {
      var normalized = normalizeLanguage(language);
      safeSetPreference(normalized);

      if (destination) {
        window.location.href = destination;
      }
    }
  };

  maybeRedirect();
})();
