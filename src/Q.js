import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const getNums = gql`
  {
    getNums
  }
`;

const newNums = gql`
  subscription {
    newNum
  }
`;

let unsubscribe = null;

export default () => (
  <Query query={getNums}>
    {({ loading, data, subscribeToMore }) => {
      if (loading) {
        return null;
      }

      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: newNums,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { newNum } = subscriptionData.data;
            return {
              ...prev,
              getNums: [...prev.getNums, newNum]
            };
          }
        });
      }
      return <div>{data.getNums.map(x => <h3 key={x}>{x}</h3>)}</div>;
    }}
  </Query>
);
