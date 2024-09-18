import React, { useEffect, useState } from "react";
import {  View,  Text,  FlatList,  StyleSheet,  TouchableOpacity } from "react-native";
import axios from "axios";
import { StackParamList } from "./BreedNav";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

type DogBreedListScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "DogBreedList"
>;

const RandomDogList: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<DogBreedListScreenNavigationProp>();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setRefreshing(true);
    axios
      .get(`https://dog.ceo/api/breeds/image/random/30`)
      .then((response) => {
        const imageURLs = response.data.message;
        setData(imageURLs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DogModal", { url: item, breed: "random" });
      }}
      style={[
        styles.imageContainer,
        { backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff" },
      ]}
    >
      <Animatable.Image
        source={{ uri: item }}
        style={styles.image}
        animation="fadeIn"
        duration={1000}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Random</Text>
        <TouchableOpacity onPress={fetchData}>
          <FontAwesome name="refresh" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
        refreshing={refreshing}
        onRefresh={fetchData}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  imageContainer: {
    flex: 1,
    width: "55%",
    aspectRatio: 1,
    margin: 4,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default RandomDogList;
