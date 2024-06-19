import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  Extrapolation,
  FadeInLeft,
} from "react-native-reanimated";
import { OnboardingItem, Onboardingdata } from "@assets/Data/Onboardingdata";
import { Link, router } from "expo-router";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 500;

interface ViewableItemsChangedProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatlistRef = useRef<FlatList<number>>(null);

  const progress = useSharedValue(0);

  const onViewRef = useRef(({ changed }: ViewableItemsChangedProps) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index ?? 0);
      progress.value = withTiming(changed[0].index ?? 0, { duration: 300 });
    }
  });

  const scrollToIndex = (index: number) => {
    flatlistRef.current?.scrollToIndex({ animated: true, index });
  };

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <FlatList
        ref={flatlistRef}
        data={Onboardingdata}
        pagingEnabled
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
        onViewableItemsChanged={onViewRef.current}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => (
          <Card data={item} index={index} scrollToIndex={scrollToIndex} />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.indicator}>
        {Onboardingdata.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            return {
              width: interpolate(
                progress.value,
                [index - 1, index, index + 1],
                [8, 32, 8],
                Extrapolation.EXTEND
              ),
              backgroundColor: index === currentIndex ? "#1C2A3A" : "lightgray",
            };
          });
          return (
            <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
              <Animated.View style={[styles.indicatorCircle, animatedStyle]} />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ marginTop: 25 }}>
        <Link href={"/signin"} replace asChild>
          <Text style={styles.subHeading}>Skip</Text>
        </Link>
      </View>
    </View>
  );
};

type DataProps = {
  data: OnboardingItem;
  index: number;
  scrollToIndex: (index: number) => void;
};

const Card = ({ data, index, scrollToIndex }: DataProps) => {
  const onPress = () => {
    if (index == 2) {
      router.replace("/signin");
    } else {
      scrollToIndex(index + 1);
    }
  };
  return (
    <View>
      <Image source={data.Image} style={styles.image} />
      <View style={styles.bottomContainer}>
        <Animated.Text entering={FadeInLeft} style={styles.heading}>
          {data.title}
        </Animated.Text>
        <Animated.Text entering={FadeInLeft} style={styles.subHeading}>
          {data.subtitle}
        </Animated.Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{index == 2 ? "Done" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: { width, height: IMG_HEIGHT },
  bottomContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
    width,
  },
  heading: { fontSize: 24, fontFamily: "NunitoBold", marginVertical: 15 },
  subHeading: {
    textAlign: "center",
    fontFamily: "NunitoRegular",
    fontSize: 16,
    lineHeight: 26,
    color: Colors.light.text600,
  },
  button: {
    backgroundColor: "#1C2A3A",
    width: (width * 80) / 100,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 25,
  },
  buttonText: {
    fontFamily: "NunitoMedium",
    fontSize: 16,
    color: Colors.light.text100,
  },
  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    // borderWidth: 1,
  },
  indicatorCircle: { height: 8, borderRadius: 100, marginRight: 5 },
});
