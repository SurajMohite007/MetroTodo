
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'



const SearchBar = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value); 
    };

    return (
        <form className="form-inline  d-flex justify-content-end " style={{ marginTop: '15px' }}>
            <i className="fa fa-search" style={{fontSize: "24px", marginRight: "8px"}} aria-hidden="true"></i>
            <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleChange}
                style={{ minWidth: '200px' }} 
            />
        </form>
    );
};

export default SearchBar;
