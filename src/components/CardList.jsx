import React from "react";
import "../styles/cardList.css";
import Button from "./Button";
export default function CardList({
  title,
  action,
  data,
  renderItem,
  button_title,
}) {
  const date = new Date().toLocaleDateString("es-NI", {
    dateStyle: "medium",
  });
  return (
    <div className="card-list">
      <div className="card-header">
        <h2>{title}</h2>
        {title === "Agenda del dia" && <span>{date}</span>}
        <Button
          icon={null}
          title={button_title}
          onclick={action}
          type={button_title === "Ver todos" ? "see" : "new"}
        />
      </div>
      <div className="card-body">{data?.map(renderItem)}</div>
    </div>
  );
}
