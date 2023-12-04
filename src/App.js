import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./component/SearchBar";
import Api from "./component/Api";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { CategoryScale } from "chart.js";
import PieChart from "./component/PieChart";
import { Data } from "./Data";
import Loading from "./component/Loading";

const App = () => {
  const [itemShow1, setItemShow1] = useState("");
  const [itemShow2, setItemShow2] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState("");
  const [filteredList1, setFilteredList1] = useState([]);
  const [filteredList2, setFilteredList2] = useState([]);
  const [compareOptions, setCompareOptions] = useState("population");
  const [showOptions, setShowOptions] = useState(false);
  const timeOutRef = useRef("");
  Chart.register(CategoryScale);

  const [chartData, setChartData] = useState({
    labels: mainData.map((data) => data.name),
    datasets: [
      {
        label: "population ",
        data: mainData.map((data) => data.population),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const handleCompare = (e) => {
    setMainData(() =>
      itemArray.map((data) => {
        return data[0];
      })
    );
    e.target.classList.add("active");
    // setShowOptions(true);
    document.querySelector(".option-list").classList.add("active");
  };
  const handleOptions = (e) => {
    setCompareOptions(e.target.id);
  };
  useEffect(() => {
    timeOutRef.current = setTimeout(() => {
      setLoaderStatus(false);
      setFilteredList1(false);
      setFilteredList2(false);
    }, 6000);
    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [loaderStatus]);

  useEffect(() => {
    setTimeout(() => {
      console.log("inside");
      setChartData({
        labels: mainData.map((data) => data.name),
        datasets: [
          {
            label: "population",
            data: mainData.map((data) => data[compareOptions]),
            backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }, 2000);
  }, [mainData, compareOptions]);
  console.log(loaderStatus);
  return (
    <>
      <div className="App">
        <SearchBar
          itemShow1={itemShow1}
          setItemShow1={setItemShow1}
          itemShow2={itemShow2}
          setItemShow2={setItemShow2}
          setLoaderStatus={setLoaderStatus}
          filteredList1={filteredList1}
          setFilteredList1={setFilteredList1}
          filteredList2={filteredList2}
          setFilteredList2={setFilteredList2}
        />
        <Api
          itemShow1={itemShow1}
          itemShow2={itemShow2}
          setItemShow1={setItemShow1}
          setItemShow2={setItemShow2}
          setItemArray={setItemArray}
          itemArray={itemArray}
        />

        <button className="chart-btn" onClick={(e) => handleCompare(e)}>
          Compare and Show Chart
        </button>

        <div className="option-list">
          <ol>
            <li id="population" onClick={(e) => handleOptions(e)}>
              Population
            </li>
            <li id="surface_area" onClick={(e) => handleOptions(e)}>
              surface_area
            </li>
            <li id="sex_ratio" onClick={(e) => handleOptions(e)}>
              sex_ratio
            </li>
            <li id="tourists" onClick={(e) => handleOptions(e)}>
              tourists
            </li>
            <li id="internet_users" onClick={(e) => handleOptions(e)}>
              internet_users
            </li>
          </ol>
        </div>

        {chartData && (
          <PieChart
            chartData={chartData}
            handleOptions={handleOptions}
            compareOptions={compareOptions}
          />
        )}
      </div>

      {loaderStatus && <Loading />}
    </>
  );
};

export default App;
