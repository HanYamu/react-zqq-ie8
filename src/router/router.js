import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Home from "../views/home/home";
import Thank from "../views/home/thanks";

class GetRouter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
  }
 
  componentDidMount() { }
  
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/thanks" component={Thank}></Route>
        </Switch>
      </div>
    )
  }
}

export default GetRouter;