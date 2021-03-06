import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card, Title } from "react-native-paper";

import { StarshipProps } from "../../api/types";
import { useImage } from "../hooks/useImage";
import { AppRoutes } from "../navigation/AppRoutes";

export interface StarshipCardProps {
  ship: StarshipProps;
}

const StarshipCard = ({ ship }: StarshipCardProps) => {
  const title = ship.name;
  const price = ship.cost_in_credits;
  const { manufacturer } = ship;

  const source = useImage(title);

  const handleBuy = () => {
    alert("Buy!");
  };

  const navigation = useNavigation();

  const handleGoToDetails = () => {
    navigation.navigate(AppRoutes.STARSHIP_DETAIL_SCREEN, ship);
  };

  return (
    <TouchableOpacity onPress={handleGoToDetails}>
      <Card style={styles.containerCard}>
        <Card.Cover source={source} />
        <Card.Title title={title} subtitle={manufacturer} />
        <Card.Content>
          <Title>{price} credits</Title>
        </Card.Content>
        <Card.Actions>
          {price === "unknown" ? (
            <Button disabled>Not for sale</Button>
          ) : (
            <Button onPress={handleBuy}>Buy this spaceship</Button>
          )}
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 32,
  },
});

export default StarshipCard;
