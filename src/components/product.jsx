import React, { Component } from "react";

class Product extends Component {
    constructor() {
        super();
        console.log("Counter - constructor");
    }

    componentDidMount() {
        // called 3rd in mounting phase
        console.log("Counter - componentDidMount");
    }

    componentDidUpdate(prevProps, prevState) {
        // called during update phase along with render
        console.log("Counter - componentDidUpdate");
        console.log("Previous Props - ", prevProps);
        console.log("Previous State - ", prevState);
        if (prevProps.product.count !== this.props.product.count) {
            // make ajax calls to request new data from server
        }
    }

    componentWillUnmount() {
        // can do cleanups here
        console.log("Counter - componentWillUnmount");
    }

    render() {
        console.log("Counter - render");

        return (
            <div>
                <span className={this.getBadgeClasses()}>
                    {this.formatCount()}
                </span>
                <button
                    onClick={() => this.props.onIncrement(this.props.product)}
                    className="btn btn-secondary btn-sm"
                >
                    Increment
                </button>
                <button
                    onClick={() => this.props.onDelete(this.props.product.id)}
                    className="btn btn-danger btn-sm m-2"
                >
                    Delete
                </button>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.product.count === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { count } = this.props.product;
        return count === 0 ? "Zero" : count;
    }
}

export default Product;
