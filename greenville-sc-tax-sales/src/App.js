import "./App.css";
import TaxSalesTable from "./components/TaxSalesTable";
import taxSales from "./greenville_tax_sales.json";
import config from "./config.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="relative">
      <div className="container mx-auto p-3">
        <Header config={config}></Header>
        <TaxSalesTable className="overflow-auto"></TaxSalesTable>
      </div>
      <Footer config={config}></Footer>
    </div>
  );
}

export default App;
