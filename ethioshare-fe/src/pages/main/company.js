import React from "react";

const Company = ({ location }) => {
    const { company } = location.state
    return (
        <>
            <div>{company}</div>
        </>

    )
}

export default Company;