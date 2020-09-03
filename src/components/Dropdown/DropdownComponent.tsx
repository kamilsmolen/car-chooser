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
      <div>
        <label>
          {`${props.title ? props.title : "Item"} `}
          <select value={selected} onChange={handleChange}>
            {props.list.map((item, key) => (
              <option value={item} key={key}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
};
