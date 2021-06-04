import { gql, useSubscription } from "@apollo/client";
import React from "react";
import { Badge } from "../shared/Badge";
import { List, ListItem } from "../shared/List";

const PLANET = gql`
  subscription Planet($id: uuid!) {
    planets_by_pk(id: $id) {
      id
      name
      cuisine
      reviews {
        id
        body
      }
    }
  }
`;

const Planet = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, error, data } = useSubscription(PLANET, {
    variables: { id },
  });
  if (loading) return <p>Loading....</p>;
  if (error) return <p>error!!!</p>;

  const { name, cuisine, reviews } = data.planets_by_pk;
  return (
    <div>
      <h3>
        {name} <Badge>{cuisine}</Badge>
      </h3>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Planet;
