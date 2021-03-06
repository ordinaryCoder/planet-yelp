import { gql, useQuery } from "@apollo/client";
import React from "react";
import { List, ListItem } from "../shared/List";
import { Badge } from "../shared/Badge";
import { Link } from "react-router-dom";

const PLANETS = gql`
  {
    planets {
      id
      name
      cuisine
    }
  }
`;

const Planets = ({ newPlanets }) => {
  console.log("planets newdata:", newPlanets);
  const { loading, error, data } = useQuery(PLANETS);

  const renderPlanets = (planets) => {
    return planets.map(({ id, name, cuisine }) => (
      <ListItem key={id}>
        <Link to={`/planet/${id}`}>
          {name} <Badge> {cuisine} </Badge>
        </Link>
      </ListItem>
    ));
  };

  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error!! </p>;

  return <List>{renderPlanets(newPlanets || data.planets)}</List>;
};

export default Planets;
