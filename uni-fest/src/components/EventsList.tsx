import { FlatList, StyleSheet, View } from "react-native";
import Events from "../types/Events";
import {
  Divider,
  IconButton,
  MD3Colors,
  Surface,
  Text,
} from "react-native-paper";
import { height } from "../constants/measures";
import theme from "../constants/theme";

export interface Props {
  eventsList: Events[];
}

export default function EventsLists(props: Props) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    console.log(date);
    const [year, month, day, hours, minutes] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];
    return `${String(day).padStart(2, "0")}/${String(month).padStart(
      2,
      "0"
    )}/${year} ás ${hours}: ${minutes}`;
  };

  return (
    <FlatList
      contentContainerStyle={{ width: "100%" }}
      data={props.eventsList}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <Surface elevation={3} style={styles.item}>
          {item.age_restriction && (
            <IconButton
              icon="air-horn"
              size={24}
              iconColor={MD3Colors.secondary100}
            />
          )}
          <View style={styles.box}>
            <View>
              <Text style={styles.title}>{`${item.name} - ${item.type}`}</Text>
              <Divider bold style={{ marginVertical: 8 }} />
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.dates}>{`Começa ${formatDate(
              item.start_date
            )}`}</Text>
          </View>
        </Surface>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.secondary,
    marginBottom: 12,
    maxHeight: height * 0.3,
    display: "flex",
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderRadius: 20,
  },
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 20,
    fontWeight: "bold",
    color: MD3Colors.secondary100,
  },
  description: {
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "bold",
    color: MD3Colors.secondary100,
  },
  type: {
    flexShrink: 1,
    flexWrap: "wrap",
    fontWeight: "bold",
    color: MD3Colors.secondary100,
  },
  dates: {
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 12,
    fontWeight: "bold",
    color: MD3Colors.secondary90,
    marginTop: 32,
    alignSelf: "flex-end",
  },
});
