import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BreedList from "./BreedList";
import DogBreedList from "./DogBreedList";
import DogModal from "./DogModal";

export type StackParamList = {
  BreedList: undefined;
  DogBreedList: { breed: string };
  DogModal: { url: string; breed: string };
  RandomDogList: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const BreedTab: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="BreedList">
      <Stack.Screen
        name="BreedList"
        component={BreedList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DogBreedList"
        component={DogBreedList}
        options={{ headerShown: false }}
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
