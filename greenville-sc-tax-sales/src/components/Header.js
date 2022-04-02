export default function Header(props) {
  return (
    <div className="w-100">
      <h1 className="text-3xl bg-yellow-100 p-5 mb-4">
        {props.config.app.title}
      </h1>
      <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
        This lightweight app makes the Greenville County Tax Sale list found at{" "}
        <a target="_blank" rel="noreferrer" href={props.config.dataSourceUrl}>
          {props.config.dataSourceUrl}
        </a>{" "}
        searchable and sortable to help you find the sales that match your
        preferences. It's the same data, scraped from that webpage, but
        presented with more options. The original list unfortunately does not
        offer the ability to sort by the amount due, for example; with this app,
        you can quickly find the sales that are cheapest.
      </p>
    </div>
  );
}
