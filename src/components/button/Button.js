import React from "react";

function Button({label, id}) {
    return(
        <button data-testid="button">{label}{id}</button>
    )
}

export default Button;