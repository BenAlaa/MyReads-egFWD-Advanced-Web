import {useState} from 'react';
import {IoMdArrowDropupCircle, IoMdArrowDropdownCircle} from 'react-icons/io';
import './selectMenu.css';

const SelectMenu = ({id, title, selected="", options=[], onChange}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleSelect = (e) => {
    e.stopPropagation();
  }
  const handleOptionClick= (value) => {
    onChange(id, value);
    setIsOpen(false);
  }
  const menuClasses = isOpen ? 'select-menu' : 'select-menu-hidden';
  return (
    <div className="select-menu-container" onClick={toggleMenu}>
      <div className="select-menu-btn secodary-bgcolor-dark">
        <div>{title}</div>
        {isOpen ? <IoMdArrowDropupCircle/> : <IoMdArrowDropdownCircle/>}
      </div>
      <div className={menuClasses} onClick={handleSelect}>
        <div>{title}...</div>
        <hr className="select-menu-hr"/>
        {options?.map(({value, label}) => {
          const optionClass = value === selected ? "select-menu-option-selected" : "select-menu-option";
          return (
            <div className={optionClass} onClick={() => handleOptionClick(value)} key={value}>{label}</div>
          )
        })}
        {!selected && <div className="select-menu-option-selected" >None</div>}
      </div>
    </div>
  );
}
 
export default SelectMenu;