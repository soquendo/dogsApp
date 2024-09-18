import React, { useEffect, useState } from "react";
import {  View,  Text,  FlatList,  TouchableOpacity,  TextInput,  StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "./BreedNav";

type BreedListScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "BreedList"
>;

const BreedList: React.FC = () => {
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<BreedListScreenNavigationProp>();

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        const breedsData = response.data.message;
        const breedNames = Object.keys(breedsData);
        setDogBreeds(breedNames as string[]);
      })
      .catch((error) => {
        console.error("Error fetching dog breeds:", error);
      });
  }, []);

  const filteredBreeds = dogBreeds.filter((breed) =>
    breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBreedClick = (breedName: string) => {
    navigation.navigate("DogBreedList", { breed: breedName });
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff" },
      ]}
      onPress={() => {
        handleBreedClick(item);
      }}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredBreeds}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "center",
  },
  itemText: {
    marginLeft: 12,
    fontSize: 18,
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default BreedList;
