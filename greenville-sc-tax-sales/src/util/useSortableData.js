import React from "react";
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items]; // copy array
    if (sortConfig !== null) {
      // sort is now active
      sortableItems.sort((a, b) => {
        let itemA = a[sortConfig.key];
        let itemB = b[sortConfig.key];
        if (Number(itemA) && Number(itemB)) {
          // dont want to compare numbers as strings
          itemA = parseFloat(itemA);
          itemB = parseFloat(itemB);
        }
        if (itemA < itemB) return sortConfig.direction === "ascending" ? -1 : 1;
        if (itemA > itemB) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return { items: sortedItems, requestSort, sortConfig };
};
export default useSortableData;
