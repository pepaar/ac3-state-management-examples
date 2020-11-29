import React from "react";
import AlternativeList from "../containers/AlternativeList";
import Header from "../containers/Header";
import ImportantList from "../containers/ImportantList";
import MainSection from "../containers/MainSection";

const App = () => {
  const [view, setView] = React.useState("main");

  return (
    <div>
      {view === "main" && (
        <>
          <Header />
          <MainSection />
        </>
      )}
      {view === "alternative" && <AlternativeList />}
      {view === "important" && <ImportantList />}
      <div style={{ marginTop: 12, padding: 6, display: "flex" }}>
        <button style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => setView("main")}>
          Main
        </button>
        <button style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => setView("alternative")}>
          Alternative
        </button>
        <button style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => setView("important")}>
          Important
        </button>
      </div>
    </div>
  );
};

export default App;
