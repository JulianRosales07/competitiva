import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }:{items:{label:string; to?:string}[]}) {
  return (
    <div className="breadcrumb">
      {items.map((it, i) => (
        <span key={i} className="breadcrumb-item">
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span className="text-gray-400">{it.label}</span>}
        </span>
      ))}
    </div>
  );
}
