import React from "react";

const SearchBox = ((props) => {
    return (
        <div>
            <form className="searchbox">
                <input
                    onChange={props.onChange}
                    type="text"
                    placeholder="Search Movie Title..."
                />
            </form>
        </div>
    );
})

export default SearchBox;
