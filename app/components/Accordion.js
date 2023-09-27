import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedAcordion = ({ days }) => (
  <View style={styles.containerStyle}>
    <FlatList
      style={styles.title}
      data={days}
      keyExtractor={(item) => Math.random().toString()}
      renderItem={({ item }) => <AccordionItem day={item} />}
    />
  </View>
);

const AccordionItem = ({ day }) => {
  const shareValue = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = useAnimatedStyle(() => ({
    height: interpolate(shareValue.value, [0, 1], [0, bodySectionHeight]),
  }));

  const toggleButton = () => {
    if (shareValue.value === 0) {
      shareValue.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    } else {
      shareValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  };

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnStyle}
        onPress={toggleButton}
      >
        <Text style={styles.title}>
          Day {day[0] ? day[0].dayNumber + 1 : 1}
        </Text>
      </TouchableOpacity>

      <Animated.View style={[styles.descStyle, bodyHeight]}>
        <View
          style={styles.bodyContainer}
          onLayout={(event) => {
            setBodySectionHeight(event.nativeEvent.layout.height);
          }}
        >
          <FlatList
            data={day}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 20, color: "white" }}>
                    Type: {item.type}
                  </Text>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 300, width: 300 }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.image}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 20,
    paddingHorizontal: 24,
    width: "100%",
    height: 500,
  },
  btnStyle: {
    paddingVertical: 10,
    width: "75%",
  },
  subContainer: {
    backgroundColor: "#996c00",
    color: "white",
    paddingHorizontal: 8,
    marginBottom: 6,
    borderRadius: 10,
  },
  descStyle: {
    overflow: "hidden",
  },
  title: {
    fontWeight: 600,
    color: "white",
  },
  bodyContainer: {
    position: "absolute",
    paddingBottom: 20,
  },
});

export default AnimatedAcordion;
