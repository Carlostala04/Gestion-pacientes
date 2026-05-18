import React, { useState, useRef, useEffect } from "react";
import "../styles/dropdown.css";
import Chevron from "../assets/favicon/Chevron";

/**
 * @param {Object[]} options        - [{ value, label, icon? }]
 * @param {string}   value          - valor seleccionado actualmente
 * @param {Function} onChange       - (value) => void
 * @param {string}   [placeholder]  - texto cuando no hay selección
 * @param {string}   [label]        - etiqueta visible encima del dropdown
 * @param {boolean}  [disabled]     - deshabilita el dropdown
 */
export default function DropDown({
  options = [],
  value,
  onChange,
  placeholder = "Seleccionar...",
  label,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  function handleSelect(optValue) {
    onChange?.(optValue);
    setOpen(false);
  }

  return (
    <div className="dropdown-wrapper">
      {label && <span className="dropdown-label">{label}</span>}
      <div className="dropdown" ref={ref}>
        <button
          type="button"
          className={`dropdown-trigger${open ? " open" : ""}`}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={`dropdown-trigger-text${!selected ? " placeholder" : ""}`}>
            {selected ? (
              <>
                {selected.icon && <selected.icon />}
                {selected.label}
              </>
            ) : (
              placeholder
            )}
          </span>
          <Chevron className={`dropdown-chevron${open ? " rotated" : ""}`} />
        </button>

        {open && (
          <div className="dropdown-menu" role="listbox">
            {options.length === 0 ? (
              <p className="dropdown-empty">Sin opciones</p>
            ) : (
              options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  className={`dropdown-option${opt.value === value ? " selected" : ""}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.icon && <opt.icon />}
                  {opt.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
