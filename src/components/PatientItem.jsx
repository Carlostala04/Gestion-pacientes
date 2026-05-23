import React from "react";
import { FormatDate } from "../hooks/DateFormat";
import "../styles/patientItem.css";
export default function PatientItem({
  name_patient,
  last_name_patient,
  second_last_name_patiente,
  birth_date,
  last_visit_date,
  onClick
}) {
  const initials = name_patient.trim()[0] + last_name_patient.trim()[0];
  return (
    <div className="item-container" onClick={onClick}>
      <div className="item-icon-container">
        <span className="item-icon">{initials.toUpperCase()}</span>
      </div>
      <div className="item-info">
        <h3>{`${name_patient} ${last_name_patient} ${second_last_name_patiente}`}</h3>
        <div className="item-info-dates">
          <p className="birth-date-patient">
            F. nac. {FormatDate(birth_date, "short")}
          </p>
          <span>·</span>
          <p className="last-visit-date-patient">
            Última visita: {FormatDate(last_visit_date, "medium")}
          </p>
        </div>
      </div>
      <svg
        className="item-chevron"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  );
}
