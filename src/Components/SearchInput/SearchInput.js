import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa'
import {MdArrowBack} from 'react-icons/md';
import './searchInput.styles.css';


const SearchInput = ({name, value, placeholder, onChange, backPath}) => {
  
  return ( 
    <div className="search-bar-container">
      <Link to={backPath} className="back-link secodary-bgcolor-dark">
        <MdArrowBack />
      </Link>
      <div className="search-input-container primary-border-color-dark">
        <FaSearch className="search-icon primary-color-light"/>
        <input
          className="search-input"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
   );
}
 
export default SearchInput;