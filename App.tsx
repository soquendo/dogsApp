import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BreedNav from "./BreedNav";
import DogNav from "./DogNav";

export type StackParamList = {
  BreedsNav: undefined;
  DogsNav: undefined;
};

const Tab = createBottomTabNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#bd0606",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#f0b63c" },
      }}
    >
      <Tab.Screen
        name="DogsNav"
        component={DogNav}
        options={{
          title: "Dogs",
          headerStyle: { backgroundColor: "#f0b63c" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BreedsNav"
        component={BreedNav}
        options={{
          title: "Breeds",
          headerStyle: { backgroundColor: "#f0b63c" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
