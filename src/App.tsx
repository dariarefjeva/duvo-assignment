import { useEffect, useState } from "react";
import { JobRunView } from "./screens/JobRunView";
import { JobResultView } from "./screens/JobResultView";
import "./styles/globals.css";
import "./App.css";

type Route = "run" | "result";
function readRoute(): Route {
  return window.location.hash.includes("result") ? "result" : "run";
}

function App() {
  const [route, setRoute] = useState<Route>(readRoute());
  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <RouteSwitcher route={route} />
      {route === "result" ? <JobResultView key="result" /> : <JobRunView key="run" />}
    </>
  );
}

function RouteSwitcher({ route }: { route: Route }) {
  return (
    <nav className="route-switch" aria-label="Demo screens">
      <a className={`route-switch__btn ${route === "run" ? "is-active" : ""}`} href="#/run">Run</a>
      <a className={`route-switch__btn ${route === "result" ? "is-active" : ""}`} href="#/result">Result</a>
    </nav>
  );
}

export default App;
