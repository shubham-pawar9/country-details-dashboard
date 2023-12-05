import { useEffect, useRef, useState } from "react";

const Api = ({
  itemShow1,
  itemShow2,
  setItemShow1,
  setItemShow2,
  itemArray,
  setItemArray,
}) => {
  const isInitialMount = useRef(true);
  const [countryName, setCountryName] = useState("");
  const fetchApi = async (countryName) => {
    try {
      const apiUrl = `https://api.api-ninjas.com/v1/country?name=${countryName}`;

      const api = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": "LBgq1jl43KDNZGtI+u/YDw==8BFkWH5mlWZTygRo",
          "Content-Type": "application/json",
        },
      });
      const apiData = await api.json();
      return apiData;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (itemShow1 != "" && itemShow1) {
        setCountryName(itemShow1);
      } else if (itemShow2 != "" && itemShow2) {
        setCountryName(itemShow2);
      }
      fetchApi(countryName)
        .then((res) => setItemArray((prevItem) => [...prevItem, res]))
        .catch((err) => console.error(err));
    }
    if (itemArray.length >= 2)
      document.querySelector(".chart-btn").classList.add("btn-show");
    return () => {
      setItemShow1("");
      setItemShow2("");
      setItemArray([]);
    };
  }, [itemShow1, itemShow2]);
  console.log(itemArray);
  return <></>;
};
export default Api;
