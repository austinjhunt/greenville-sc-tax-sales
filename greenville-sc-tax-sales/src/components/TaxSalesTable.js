import useSortableData from "../util/useSortableData";
import React, { useEffect, useState } from "react";

export default function TaxSalesTable() {
  const [taxSales, setTaxSales] = useState([]);
  useEffect(() => {
    fetch("/api/")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        setTaxSales(data.taxSales);
      })
      .catch((error) => console.log(error));
  }, []);

  const { items, requestSort, sortConfig } = useSortableData(taxSales);

  const getClassNamesForColumnHeader = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  let search = (event) => {
    let query = event.target.value.toLowerCase();
    console.log(query);
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
  };

  return (
    <div className="container">
      <div className="flex justify-end">
        <div className="mb-3 xl:w-96">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              id="item-search-input"
              className="form-control relative flex-auto min-w-0 block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
      <hr />
      <table className="min-w-full text-center">
        <thead className="border-b">
          <tr className="border border-bottom">
            <th>
              <button
                type="button"
                onClick={() => requestSort("itemNumber")}
                className={`text-sm font-medium text-gray-900 px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "itemNumber"
                )}`}
              >
                Item #
              </button>
              <i className="fa fa-sort"></i>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("mapNumber")}
                className={`text-sm font-medium text-gray-900 px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "mapNumber"
                )}`}
              >
                Map #
              </button>
              <i className="fa fa-sort"></i>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={`text-sm font-medium text-gray-900 px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "name"
                )}`}
              >
                Name
              </button>
              <i className="fa fa-sort"></i>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("amountDue")}
                className={`text-sm font-medium text-gray-900 px-6 py-4 align-center ${getClassNamesForColumnHeader(
                  "amountDue"
                )}`}
              >
                Amount Due
              </button>
              <i className="fa fa-sort"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((taxSale) => (
            <tr
              key={taxSale.itemNumber}
              className="taxSale-item odd:bg-white even:bg-slate-100  border-b transition duration-300 ease-in-out hover:bg-blue-100"
            >
              <td>{taxSale.itemNumber}</td>
              <td>
                <a href={taxSale.mapNumberLink} target="_blank">
                  {taxSale.mapNumber}
                </a>
              </td>
              <td>{taxSale.name}</td>
              <td>{taxSale.amountDue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
