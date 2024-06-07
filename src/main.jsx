import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";

import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "fr", "ar"],
    fallbackLng: "en",
    detection: {
      order: [
        "path",
        "cookie",
        "htmlTag",
        "navigator",
        "querystring",
        "localStorage",
        "sessionStorage",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/lang/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });

const Loading = () => <div>Loading...</div>;

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>

        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
        
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
