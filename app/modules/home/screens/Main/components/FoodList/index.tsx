import React from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { FoodListItem } from "./FoodListItem";

interface Props {}

export function FoodList({}: Props) {
  return (
    <GestureHandlerRootView>
      <FoodListItem drag={() => {}} handleRemove={() => {}} />
      <FoodListItem drag={() => {}} handleRemove={() => {}} />
      <FoodListItem drag={() => {}} handleRemove={() => {}} />
      <FoodListItem drag={() => {}} handleRemove={() => {}} />
    </GestureHandlerRootView>
  );
}
