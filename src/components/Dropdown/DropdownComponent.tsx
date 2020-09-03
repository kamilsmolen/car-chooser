import React, { FunctionComponent, useState, useRef, useEffect } from "react";

interface DropdownProps {
  list: string[];
  title?: string;
  onSelect: (item: string) => void;
}

export const Dropdown: FunctionComponent<DropdownProps> = props => {
  const myRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleApply = () => {
    if (!isOpen && null !== selected) {
      props.onSelect(selected);
    }
  };

  useEffect(handleApply, [isOpen]);

  const handleClickInside = () => setIsOpen(!isOpen);

  const handleClickOutside = (e: any) => {
    if (null !== myRef && null !== myRef.current) {
      if (!myRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
  };

  const toggleItem = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const getTitle = () => {
    const label = props.title ? props.title : "item";
    return null === selected ? `Select ${label}` : selected;
  };

  return (
    <>
      <div ref={myRef}>
        <div onClick={handleClickInside}>{getTitle()}</div>

        {isOpen && (
          <ul>
            {props.list.map((item, key) => (
              <li key={key} onClick={() => toggleItem(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
