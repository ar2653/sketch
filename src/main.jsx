import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

const root = createRoot(document.getElementById('root'));

root.render(
  // <Auth0Provider
  //     domain={import.meta.env.VITE_AUTH0_DOMAIN}
  //     clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
  //     authorizationParams={{
  //       redirect_uri: `${window.location.origin}/dashboard`
  //     }}
  //     onRedirectCallback={(appState) => {
  //       window.history.replaceState(
  //         {},
  //         document.title,
  //         appState && appState.returnTo ? appState.returnTo : '/dashboard'
  //       );
  //     }}
  //   >
      <StrictMode>
      <App />
    </StrictMode>
    // </Auth0Provider>
  );

