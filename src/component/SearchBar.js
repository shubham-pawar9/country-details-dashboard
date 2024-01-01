import { useEffect, useState } from "react";
const SearchBar = ({
  itemShow1,
  setItemShow1,
  setItemShow2,
  setLoaderStatus,
  filteredList1,
  setFilteredList1,
  filteredList2,
  setFilteredList2,
  handleCompare,
  handleOptions,
  handleOptionShow,
  mainData,
}) => {
  const [inputVal1, setInputVal1] = useState("");

  const [inputVal2, setInputVal2] = useState("");

  const [showCountry1, setShowCountry1] = useState("");
  const [showCountry2, setShowCountry2] = useState("");

  const [list, setList] = useState([]);
  const [optionsList, setOptionsList] = useState([]);

  const handleCheckSearch1 = (val) => {
    return list.filter((item) => {
      return item.includes(val);
    });
  };
  const handleInput1 = (val) => {
    setFilteredList1(() => handleCheckSearch1(val));
    setInputVal1(val);
  };
  const handleList1 = (items) => {
    setItemShow1(items);
    setInputVal1(items);
    setLoaderStatus(true);
    setShowCountry1(true);
  };
  const handleCheckSearch2 = (val) => {
    return list.filter((item) => {
      return item.includes(val);
    });
  };
  const handleInput2 = (val) => {
    setFilteredList2(() => handleCheckSearch2(val));
    setInputVal2(val);
  };
  const handleList2 = (items) => {
    setItemShow2(items);
    setInputVal2(items);
    setLoaderStatus(true);
    setShowCountry2(true);
  };
  const fetchJsonData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const apiData = await fetch("CountryData.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = apiData.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  useEffect(() => {
    fetchJsonData()
      .then((res) => setList(() => res.map((item) => item.name.toLowerCase())))
      .catch((err) => console.error(err));
  }, []);
  // console.log(mainData);
  useEffect(() => {
    if (mainData) {
      const numericKeysSet = new Set(
        mainData.flatMap((items) =>
          Object.keys(items).filter((key) => typeof items[key] === "number")
        )
      );
      setOptionsList(Array.from(numericKeysSet));
    }
  }, [mainData, setOptionsList]);
  console.log(optionsList);
  return (
    <>
      <div className="header">
        <div className="search-box1">
          <div className="input-box">
            <input
              type="text"
              placeholder="Search Country 1"
              onChange={(e) => handleInput1(e.target.value)}
              value={inputVal1}
            />
            <button className="close-list" onClick={() => setInputVal1("")}>
              X
            </button>
          </div>

          {filteredList1 != "" && (
            <div className="list-div">
              <ul>
                {filteredList1 &&
                  filteredList1.map((items, index) => {
                    return (
                      <li key={index} onClick={() => handleList1(items)}>
                        {items}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          {showCountry1 && (
            <span className="country-name">
              {" "}
              Country Selected -<span className="country">{inputVal1}</span>
            </span>
          )}
        </div>
        <div className="search-box2">
          <div className="input-box">
            <input
              type="text"
              placeholder="Search Country 2"
              onChange={(e) => handleInput2(e.target.value)}
              value={inputVal2}
            />
            <button className="close-list" onClick={() => setFilteredList2("")}>
              X
            </button>
          </div>

          {filteredList2 != "" && (
            <div className="list-div">
              <ul>
                {filteredList2 &&
                  filteredList2.map((items, index) => {
                    return (
                      <li key={index} onClick={() => handleList2(items)}>
                        {items}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          {showCountry2 && (
            <span className="country-name">
              {" "}
              Country Selected -<span className="country">{inputVal2}</span>
            </span>
          )}
        </div>
        <button className="chart-btn" onClick={(e) => handleCompare(e)}>
          Compare and Show Chart
        </button>
        <div className="option-mainDiv">
          <button className="options-btn" onClick={(e) => handleOptionShow(e)}>
            Options
          </button>
          <div className="option-list">
            <ol>
              {optionsList &&
                optionsList.map((item, index) => {
                  return (
                    <li key={index} id={item} onClick={(e) => handleOptions(e)}>
                      {item}
                    </li>
                  );
                })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchBar;
