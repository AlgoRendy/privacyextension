import React, { useEffect, useState } from "react";
import { SigmaContainer } from "react-sigma-v2";
import { GraphModel } from "../../model/graphModel";
import CustomGraph from "../ui/CustomGraph";
import "react-sigma-v2/lib/react-sigma-v2.css";
import "./style.css";

export default function Graph({ isDebug = false }) {
  const [data, setData] = useState(GraphModel.getGraph());
  useEffect(() => {
    const interval = setInterval(() => {
      setData(GraphModel.getGraph());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <SigmaContainer className="graph-container">
        <CustomGraph data={data} />
      </SigmaContainer>
    </div>
  );
}
