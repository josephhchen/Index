import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  useColorScheme,
} from "react-native";
import theme from "../util/theme";
import AnimatedDots from "../components/AnimatedDots";
import { Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const onboardingData = [
  {
    title: "Capture Ideas Instantly",
    description:
      "Easily jot down thoughts, ideas, and notes whenever inspiration strikes.",
  },
  {
    title: "Share Notes with Friends",
    description:
      "Directly share your notes with friends or in group chats for collaborative planning and brainstorming.",
  },
  {
    title: "Organize Your Notes",
    description:
      "Categorize your notes with tags and folders to keep your thoughts organized and easily accessible.",
  },
  {
    title: "Sync Across Devices",
    description: "Access your notes from any device, anytime.",
  },
];

const { width } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const scheme = useColorScheme();
  const currentTheme = theme(scheme);

  const handleSwipe = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleNextPress = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      navigation.navigate("RegisterScreen");
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          styles.slide,
          { backgroundColor: currentTheme.background, width },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.description, { color: currentTheme.text }]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSwipe}
        ref={flatListRef}
      />
      <View style={styles.footer}>
        <AnimatedDots
          activeIndex={currentIndex}
          count={onboardingData.length}
        />
        <TouchableOpacity onPress={handleNextPress}>
          <Entypo
            name="chevron-with-circle-right"
            size={50}
            color={currentTheme.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "left",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 30,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  slide: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
});
