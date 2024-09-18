import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DogModal from "./DogModal";
import RandomDogList from "./RandomDogList";

export type StackParamList = {
  RandomDogList: undefined;
  DogModal: { url: string };
};

const Stack = createStackNavigator<StackParamList>();

const BreedTab: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="RandomDogList">
      <Stack.Screen
        name="RandomDogList"
        component={RandomDogList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DogModal"
        component={DogModal}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BreedTab;
