import React from "react";
import { useQuery } from "react-query";
import { FlatList } from "react-native";
import fetchAsync from "../lib/fetchAsync";
import AppLayout from "../components/AppLayout";
import StarshipCard from "../components/StarshipCard";

interface shipProps {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
}

// SOLUTION 2: with a FlatList - more performant
// const renderItem = ({ ship }: shipProps) => {
//   return (
//     <StarshipCard
//       key={ship.name}
//       ship={ship}
//     />
//   );
// };

const StarshipFeedScreen = () => {
  const { isLoading, isError, data } = useQuery("starships", () =>
    fetchAsync("https://swapi.dev/api/starships/")
  );

  if (isLoading) return <AppLayout title="Loading…" />;
  if (isError) return <AppLayout title="Error 😕" />;
  if (data.results === undefined) return <AppLayout title="Not Found" />;

  return (
    <AppLayout title="Starships" withFooter>
      {/* SOLUTION 1: with a map */}
      {data.results.map((ship: shipProps) => {
        return <StarshipCard key={ship.name} ship={ship} />;
      })}

      {/* SOLUTION 2: with a FlatList - more performant */}
      {/* <FlatList
        data={data.results}
        renderItem={renderItem}
        keyExtractor={(ship) => ship.model}
      /> */}
    </AppLayout>
  );
};

export default StarshipFeedScreen;
