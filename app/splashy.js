import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

const Logo = () => {
  const strokeDashoffset = useSharedValue(70000);
  const fillOpacity = useSharedValue(0);

  useEffect(() => {
    strokeDashoffset.value = withTiming(0, {
      duration: 3000,
      easing: Easing.ease,
    });
    fillOpacity.value = withTiming(1, {
      duration: 3000,
    });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
      fillOpacity: fillOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.flipContainer}>
        <Svg
          width={400}
          height={300}
          viewBox="0 0 2500 1500"
          preserveAspectRatio="none"
        >
          <AnimatedPath
            animatedProps={animatedProps}
            d="M1396 1421 c-4 -6 23 -29 58 -51 174 -110 269 -316 237 -511 -37
-223 -210 -395 -432 -430 -84 -13 -148 -7 -237 22 -62 21 -80 21 -68 0 8 -13
129 -51 161 -51 47 0 55 -9 55 -66 l0 -53 -72 -3 c-42 -2 -72 -7 -70 -13 1 -6
59 -10 147 -10 90 0 145 4 145 10 0 6 -27 11 -60 13 l-60 3 0 54 0 54 38 6
c155 27 247 72 340 168 228 238 185 632 -89 818 -70 47 -85 54 -93 40z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M1080 1336 c-193 -54 -325 -240 -307 -433 l6 -62 -81 -19 c-45 -10
-83 -23 -85 -29 -2 -5 35 -27 82 -48 l85 -38 0 -63 c0 -39 4 -64 11 -64 6 0
25 11 43 25 l33 25 24 -26 c16 -17 30 -23 44 -20 12 3 36 -4 54 -15 81 -49
217 -62 322 -30 116 37 203 114 257 229 24 51 27 69 27 167 0 104 -2 114 -32
176 -36 73 -101 144 -167 183 -89 52 -218 69 -316 42z m264 -46 c77 -36 161
-118 193 -187 90 -196 9 -425 -185 -520 -79 -39 -210 -45 -293 -14 -103 39
-106 27 41 201 72 84 129 159 127 164 -5 13 0 14 -226 -40 -118 -29 -188 -41
-194 -35 -5 5 -8 47 -5 94 8 147 80 257 218 332 62 33 70 35 164 35 88 0 104
-3 160 -30z m-289 -420 c-3 -5 -64 -39 -135 -75 l-130 -65 -56 25 c-32 14 -55
28 -52 31 5 4 74 21 353 87 11 3 21 5 23 6 2 0 0 -3 -3 -9z m74 -19 c-8 -10
-56 -69 -108 -130 l-94 -113 -51 51 c-27 28 -48 52 -46 54 10 10 296 157 304
157 5 0 2 -8 -5 -19z m-293 -210 c-13 -20 -26 -11 -26 16 0 25 1 26 16 11 9
-9 13 -21 10 -27z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M430 760 c0 -5 9 -14 20 -20 11 -6 20 -7 20 -3 0 5 -9 14 -20 21 -11
7 -20 8 -20 2z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M267 690 c-3 -11 -1 -23 4 -26 5 -3 9 -1 9 5 0 5 3 16 6 25 3 9 2 16
-4 16 -5 0 -12 -9 -15 -20z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M487 660 c3 -11 7 -20 9 -20 2 0 4 9 4 20 0 11 -4 20 -9 20 -5 0 -7
-9 -4 -20z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M678 643 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M584 595 c-16 -12 -16 -14 -3 -15 9 0 22 7 29 15 16 19 0 19 -26 0z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M290 592 c0 -12 19 -26 26 -19 2 2 -2 10 -11 17 -9 8 -15 8 -15 2z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M452 568 c-7 -7 -12 -15 -12 -18 0 -12 69 -10 76 2 5 7 -1 9 -19 4
-21 -5 -25 -3 -21 9 7 18 -7 20 -24 3z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            d="M370 540 c0 -5 12 -10 28 -9 24 0 25 1 7 9 -27 12 -35 12 -35 0z"
            fill="#946704"
            fillOpacity={0}
            stroke="#946704"
            strokeWidth={10}
            strokeDasharray={70000}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c0c0d",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  flipContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scaleY: -1 }],
  },
});

export default Logo;