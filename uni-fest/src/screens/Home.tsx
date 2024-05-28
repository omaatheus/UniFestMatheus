import { useCallback, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { height, width } from "../constants/measures";
import * as Location from "expo-location";
import {
  Chip,
  IconButton,
  MD3Colors,
  Searchbar,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PopUp from "../components/PopUp";
import * as places from "../lib/supabase/database/places";
import * as events from "../lib/supabase/database/events";
import Places from "../types/Places";
import Events from "../types/Events";
import Message from "../types/Message";
import { relationateEventsWithPlaces } from "../lib/supabase/database/places_events";
import EventsLists from "../components/EventsList";

interface Props {
  navigation: any;
}

export default function Home(props: Props) {
  const [points, setPoints] = useState<Places[]>([]);
  const [userCurrentUserLocation, setCurrentUserLocation] = useState<any>(null);
  const [userSearch, setUserSearch] = useState("");
  const [currentPopUpInfo, setCurrentPopUpInfo] = useState<Places>({
    id: "",
    latitude: 1,
    longitude: 1,
    name: "",
    image: "",
    description: "",
    rate: 1,
    events: [],
  });
  const [isPopUpVisible, setPopUpVisibility] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentUserLocation(location);
    })();
  }, []);

  useEffect(
    () =>
      props.navigation.addListener("beforeRemove", (e: any) => {
        e.preventDefault();
      }),
    []
  );

  const fetchEventsAndPlaces = useCallback(async () => {
    // Pegue os lugares
    let data: Places[] = (await places.get()).data ?? [];

    // Pega os Eventos de cada lugar
    data = await relationateEventsWithPlaces(data);

    setPoints(data);
  }, []);

  useEffect(() => {
    fetchEventsAndPlaces();
  }, []);

  return (
    <>
      {isPopUpVisible && (
        <PopUp
          isSimple
          onClose={() => setPopUpVisibility(false)}
          messageData={currentPopUpInfo}
        >
          {currentPopUpInfo.events.length > 0 ? (
            <EventsLists eventsList={currentPopUpInfo.events} />
          ) : (
            <Text>Nenhum evento ainda</Text>
          )}
        </PopUp>
      )}
      <SafeAreaView style={{ alignItems: "center" }}>
        <MapView
          tintColor="black"
          initialRegion={{
            latitude: -22.843058,
            longitude: -47.053862,
            latitudeDelta: 0.101663,
            longitudeDelta: 0.102001,
          }}
          showsUserLocation
          style={styles.map}
        >
          {points.length > 0 &&
            points.map((locations: Places, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: locations.latitude,
                  longitude: locations.longitude,
                }}
              >
                <Chip
                  mode="outlined"
                  icon="party-popper"
                  onPress={() => {
                    setCurrentPopUpInfo({
                      id: locations.id,
                      latitude: locations.latitude,
                      longitude: locations.longitude,
                      name: locations.name,
                      image: locations.image,
                      description: locations.description,
                      rate: locations.rate,
                      events: locations.events,
                    });
                    setPopUpVisibility(true);
                  }}
                >{`${locations.name}`}</Chip>
              </Marker>
            ))}
        </MapView>

        {/* <View
          style={{
            width: width * 0.95,
            height: height * 0.1,
            backgroundColor: MD3Colors.primary90,
            padding: 8,
            borderRadius: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Searchbar
            style={{ width: "80%", backgroundColor: "none" }}
            placeholder="Digite a localização..."
            placeholderTextColor={MD3Colors.secondary20}
            iconColor={MD3Colors.secondary20}
            value={userSearch}
            onChangeText={setUserSearch}
          />
          <IconButton
            icon="apps"
            iconColor={MD3Colors.secondary20}
            size={32}
            onPress={() => console.log("oooo")}
          />
        </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    width: width,
    height: height,
  },
});
