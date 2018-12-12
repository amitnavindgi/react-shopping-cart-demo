import React from "react";

const CartTotal = props => {
    console.log("CartTotal - render");
    return (
        <div>
            <nav
                class="navbar navbar-light"
                style={{ "background-color": "#e3f2fd" }}
            >
                <div class="navbar-brand">
                    Total Items{" "}
                    <span class="badge badge-pill badge-info">
                        {props.totalProducts}
                    </span>
                </div>
            </nav>
        </div>
    );
};

export default CartTotal;
