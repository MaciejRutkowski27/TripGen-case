import { Text, Image, View, FlatList, SectionList } from "react-native";

export default function DayItem({ day }) {
  return (
    <FlatList
      data={day}
      renderItem={({ item }) => (
        <View>
          <Text style={{ fontSize: 20 }}>{item.name ? item.name : ""}</Text>
          <Text style={{ fontSize: 20 }}>Type: {item.type}</Text>
          <Image
            source={{ uri: item.image }}
            style={{ height: 300, width: 300 }}
          />
        </View>
      )}
      keyExtractor={() => Math.random().toString()}
    />
  );
}
