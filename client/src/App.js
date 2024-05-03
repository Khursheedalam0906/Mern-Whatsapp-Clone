import "./App.css";
import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccoutProvider from "./context/AccoutProvider";

function App() {
  const clientId =
    "720535564472-ddb1qp1dvhlnmjk80lab63qggau41sak.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccoutProvider>
        <Messenger />
      </AccoutProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
