import React, { FunctionComponent, useState } from "react";
import "./dropdown.css";

interface DropdownProps {
  list: string[];
  title?: string;
  onSelect: (item: string) => void;
}

export const Dropdown: FunctionComponent<DropdownProps> = props => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<Element>) => {
    const element = event.target as HTMLSelectElement;
    setSelected(element.value);
    props.onSelect(element.value);
  };

  return (
    <>
      {props.list.length !== 0 && (
        <div className="dropdown">
          <label className="dropdown-label">{`${
            props.title ? props.title : "Item"
          }: `}</label>
          <select
            value={selected}
            onChange={handleChange}
            className="dropdown-select"
          >
            <option className="dropdown-item__disabled"></option>
            {props.list.map((item, key) => (
              <option value={item} key={key}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}
      {props.list.length === 0 && (
        <div className="info-message">
          No such car in system for this configuration
        </div>
      )}
    </>
  );
};
