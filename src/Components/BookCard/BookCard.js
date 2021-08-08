
import './bookCard.styles.css';
import SelectMenu from '../SelectMenu/SelectMenu';


const shelfOptions = [
  {label:"Currently Reading", value: "currentlyReading"},
  {label:"Want To Read", value: "wantToRead"},
  {label:"Read", value: "read"}
]

const BookCard = ({id, cover="", title, authors, shelf, onShelfChange}) => {
  return ( 
    <div className="book-card-container">
      <div className="book-card-cover" style={{backgroundImage: `url(${cover})`}}></div>
      <hr className="hr-divider"/>
      <div className="book-info-container secodary-bgcolor-xlight">
        <div className="book-title">{title}</div>
        {authors?.map((author, index) => (
          <div className="book-author" key={index}>{author}</div>
        ))}
      </div>
      <div className="book-shelf-menu">
        <SelectMenu
          id={id}
          title="Move to"
          options={shelfOptions}
          selected={shelf}
          onChange={onShelfChange}
        />
      </div>
    </div>
  );
}
 
export default BookCard;