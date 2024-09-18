import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import {  RouteProp,  useNavigation,  useRoute,  StackActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "./BreedNav";
import { Accelerometer } from "expo-sensors";
import Animated, {  useSharedValue,  withSpring,  useAnimatedStyle,  withRepeat,  withTiming,  withSequence } from "react-native-reanimated";

type DogModalScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "DogModal"
>;
type DogModalScreenRouteProp = RouteProp<StackParamList, "DogModal">;

const dogNoises = [  "Woof!",  "Bark!",  "Ruff!",  "Arf!",  "Meow!",  "Woof! Woof!",  "Grr!",  "ඞ",  "Roar!",  "Rawr!" ];

export function DogModal() {
  const navigation = useNavigation<DogModalScreenNavigationProp>();
  const { params } = useRoute<DogModalScreenRouteProp>();
  const [randomDogNoise, setRandomDogNoise] = useState<string | null>(null);

  const closeAndNavigate = () => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      if (params.breed == "random") {
        navigation.navigate("RandomDogList");
      } else {
        navigation.navigate("DogBreedList", {
          breed: params.breed.toString(),
        });
      }
      unsubscribe();
    });
    navigation.dispatch(StackActions.pop(1));
  };

  const bounceValue = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    const accelerometerSubscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const bounceThreshold = 1.1;

      if (magnitude > bounceThreshold) {
        const randomNoise =
          dogNoises[Math.floor(Math.random() * dogNoises.length)];
        setRandomDogNoise(randomNoise);

        bounceValue.value = withRepeat(
          withSpring(100, { damping: 2, stiffness: 80 }),
          -1,
          true
        );

        textOpacity.value = withSequence(
          withTiming(1, { duration: 0 }),
          withTiming(0, { duration: 1000 })
        );
      } else {
        bounceValue.value = withTiming(0);
      }
    });

    return () => {
      accelerometerSubscription.remove();
    };
  }, [bounceValue, textOpacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bounceValue.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={closeAndNavigate}>
      <View style={styles.modalContainer}>
        <View style={styles.imageContainer}>
          <Animated.Text style={[styles.woofText, textAnimatedStyle]}>
            {randomDogNoise}
          </Animated.Text>
          <Animated.Image
            source={{ uri: params.url.toString() }}
            style={[styles.image, animatedStyle]}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

DogModal.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 4,
  },
  closeButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 30,
  },
  woofText: {
    color: "white",
    fontSize: 24,
  },
});

export default DogModal;
