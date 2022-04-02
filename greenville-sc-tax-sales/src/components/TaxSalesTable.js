import useSortableData from "../util/useSortableData";
import React, { useEffect, useState } from "react";

export default function TaxSalesTable() {
  const [taxSales, setTaxSales] = useState([]);
  useEffect(() => {
    fetch("/api/")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setTaxSales(data.taxSales);
      })
      .catch((error) => console.log(error));
  }, []);

  // handle data presentation differently on mobile
  const [mobile, setMobile] = useState(false);
  function handleWindowSizeChange() {
    console.log("handling window size change");
    if (window.innerWidth <= 768) setMobile(true);
    console.log(`mobile = ${mobile}`);
  }
  useEffect(() => {
    handleWindowSizeChange(); // initialize mobile statevar
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const { items, requestSort, sortConfig } = useSortableData(taxSales);

  const getClassNamesForColumnHeader = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  let search = (event) => {
    let query = event.target.value.toLowerCase();
    console.log(query);
    if (mobile) {
      document.querySelectorAll("span.taxSale-item").forEach((item, i) => {
        let match = item.textContent.toLowerCase().includes(query);
        if (match) item.classList.remove("hidden");
        else item.classList.add("hidden");
      });
    } else {
      document.querySelectorAll("tr.taxSale-item").forEach((tr, i) => {
        let match = false;
        tr.querySelectorAll("td").forEach((td, j) => {
          if (td.textContent.toLowerCase().includes(query)) {
            match = true;
          }
        });
        if (match) tr.classList.remove("hidden");
        else tr.classList.add("hidden");
      });
    }
  };

  let DesktopPresentation = () => {
    return (
      <table className="min-w-full text-center">
        <thead className="border-b">
          <tr className="border border-bottom">
            <th>
              <button
                type="button"
                onClick={() => requestSort("itemNumber")}
                className={`sortbutton text-sm font-medium text-black w-full px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "itemNumber"
                )}`}
              >
                Item #<span className="block sortbutton-directionlabel"></span>
                <i className="fa fa-sort"></i>
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("mapNumber")}
                className={`sortbutton text-sm font-medium text-black w-full px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "mapNumber"
                )}`}
              >
                Map #<span className="block sortbutton-directionlabel"></span>
                <i className="fa fa-sort"></i>
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={`sortbutton text-sm font-medium text-black w-full px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "name"
                )}`}
              >
                Name
                <span className="block sortbutton-directionlabel"></span>
                <i className="fa fa-sort"></i>
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("amountDue")}
                className={`sortbutton text-sm font-medium text-black w-full px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "amountDue"
                )}`}
              >
                Amount Due
                <span className="block sortbutton-directionlabel"></span>
                <i className="fa fa-sort"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((taxSale) => (
            <tr
              key={taxSale.itemNumber}
              className="taxSale-item odd:bg-white even:bg-slate-100  border-b transition duration-300 ease-in-out hover:bg-blue-100"
            >
              <td className="text-black ">{taxSale.itemNumber}</td>
              <td className="text-black ">
                <a
                  href={taxSale.mapNumberLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {taxSale.mapNumber}
                </a>
              </td>
              <td className="text-black ">{taxSale.name}</td>
              <td className="text-black ">{taxSale.amountDue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  let MobilePresentation = () => {
    return (
      <div>
        <div className="w-100 grid grid-cols-2">
          <button
            type="button"
            onClick={() => requestSort("name")}
            className={`sortbutton text-sm font-medium text-black bg-slate-200 rounded m-2 p-3 align-center ${getClassNamesForColumnHeader(
              "name"
            )}`}
          >
            Sort by Name
            <span className="block sortbutton-directionlabel"></span>
          </button>
          <button
            type="button"
            onClick={() => requestSort("amountDue")}
            className={`sortbutton  text-sm font-medium text-black bg-slate-200 rounded m-2 p-3 align-center ${getClassNamesForColumnHeader(
              "amountDue"
            )}`}
          >
            Sort by Amount Due
            <span className="block sortbutton-directionlabel"></span>
          </button>
        </div>
        {items.map((taxSale) => (
          <span
            key={taxSale.itemNumber}
            className="taxSale-item rounded bg-blue-200 p-1 m-1 inline-block"
          >
            <a href={taxSale.mapNumberLink}>
              {taxSale.name}-$
              {taxSale.amountDue}
            </a>
          </span>
        ))}
        <span className="rounded bg-blue-200 p-2"></span>
      </div>
    );
  };
  let SearchBar = () => {
    return (
      <div className="flex justify-end">
        <div className="mb-3 w-full">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              id="item-search-input"
              className="form-control relative flex-auto min-w-0 block  px-3 py-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              onInput={search}
            ></input>
            <button
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black-100 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              type="button"
              id="button-addon3"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <SearchBar></SearchBar>
      <hr />
      {mobile ? (
        <MobilePresentation></MobilePresentation>
      ) : (
        <DesktopPresentation></DesktopPresentation>
      )}
    </div>
  );
}
