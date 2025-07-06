import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../components/DarkMode";
import styles from "./styles/styles";

export default function Locations() {
    const { darkMode } = useDarkMode();
    const currentStyles = styles[darkMode ? "dark" : "light"];
    const [locations, setLocations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });

        loadFavorites();

        if (isConnected) {
            fetchLocations();
        }

        return () => {
            unsubscribe();
        };
    }, [isConnected]);

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem("favorites");
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (e) {
            console.log("Fout bij laden van favorieten:", e);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/SemvanOsch/apiCaller/main/locations.json");
            const data = await response.json();
            setLocations(data);
        } catch (e) {
            console.log("Fout bij ophalen van locaties:", e);
        }
    };

    const toggleFavorite = async (item) => {
        const isFav = favorites.some(fav => fav.name === item.name);
        let updated;
        if (isFav) {
            updated = favorites.filter(fav => fav.name !== item.name);
        } else {
            updated = [...favorites, item];
        }
        setFavorites(updated);
        await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    };

    const isFavorite = (item) =>
        favorites.some(fav => fav.name === item.name);

    const filteredLocations = isConnected
        ? (showFavoritesOnly ? locations.filter(isFavorite) : locations)
        : favorites;

    const handlePress = (item) => {
        navigation.navigate("Home", { targetLocation: item });
    };

    const renderItem = ({ item }) => (
        <View style={currentStyles.locationItem}>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Text style={{ color: isFavorite(item) ? "green" : "#888", fontSize: 20, marginRight: 12 }}>
                    {isFavorite(item) ? "★" : "☆"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handlePress(item)}
                style={currentStyles.locationItemTextWrapper}
            >
                <Text style={currentStyles.locationItemText}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={currentStyles.containerWithPadding}>
            <Text style={currentStyles.heading}>Locaties</Text>

            {!isConnected && (
                <Text style={[currentStyles.text, { marginBottom: 10, fontStyle: "italic", color: "orange" }]}>
                    Geen internetverbinding — alleen favorieten worden getoond
                </Text>
            )}

            <FlatList
                data={filteredLocations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                    <View style={currentStyles.separator} />
                )}
            />

            <TouchableOpacity
                onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
                style={currentStyles.toggleButton}
            >
                <Text style={currentStyles.toggleButtonText}>
                    {showFavoritesOnly ? "Toon alles" : "Toon alleen favorieten"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
