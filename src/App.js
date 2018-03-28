import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Q from "./Q";
import S from "./S";

const addNum = gql`
  mutation {
    addNum
  }
`;

class App extends Component {
  render() {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div>
          <h1>Query with subscribeToMore</h1>
          <Q />
        </div>
        <div style={{ width: 300, display: "flex", justifyContent: "center" }}>
          <Mutation mutation={addNum}>
            {mutate => (
              <div>
                <button onClick={mutate}>add num</button>
              </div>
            )}
          </Mutation>
        </div>
        <div>
          <h1>Subscription component</h1>
          <S />
        </div>
      </div>
    );
  }
}

export default App;
