import React from "react";
import styled from "@emotion/styled"

const SearchForm = styled.div`
    display:flex;
    align-item:center;
    > button {
        margin-left: 1rem;
    }
`


const Search =({ inputVal,onChange,onSearch})=>{

return(<div>
    <SearchForm>
        <input value={inputVal} onChange={onChange}/>
        <button onClick={onSearch}>Search</button>
    </SearchForm>
    
 </div>
)
}

export default Search;