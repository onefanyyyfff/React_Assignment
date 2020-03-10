import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
class Detail extends Component {
    test(a) {
        console.log(a)
    }
    render() {
        return (
            <div>
                {this.test(this.props)}
                {this.test(window.location.href)}
            </div>
        )
    }
}
export default Detail;