// import Map from "./Map";
import { useState } from "react";
import Map3 from "./Components/Map3";
import { Navbar } from "./Components/Navbar";
// import Map2 from "./Map2";

function App() {
  const [querySearch, setquerySearch] = useState([[]]);
  console.log("in App data from search", querySearch);
  return (
    <div className=" ">
      {/* <Navbar getData={(e) => setquerySearch(e)} /> */}
      <Navbar
        getData={(e, searchOv) => {
          querySearch[0].length && searchOv
            ? setquerySearch((prevQuerySearch) => [...prevQuerySearch, e])
            : setquerySearch(() => [e]);
        }}
      />

      {/* <Map center={center} zoom={zoom} style={mapStyle} /> */}
      {/* <Map /> */}
      {/* <Map2 /> */}
      <Map3 queryData={querySearch} />
      {/* <h1 className="text-xl font-bold">A pretty CSS3 popup.</h1> */}
    </div>
  );
}

export default App;
