import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useDarkMode } from '../components/DarkMode';
import styles from './styles/styles';

export default function HomeScreen() {
    const [location, setLocation] = useState(null);
    const [landmarks, setLandmarks] = useState([]);
    const mapRef = useRef(null);
    const route = useRoute();
    const { darkMode } = useDarkMode();
    const currentStyles = styles[darkMode ? 'dark' : 'light'];

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);

            const response = await fetch("https://raw.githubusercontent.com/SemvanOsch/apiCaller/main/locations.json");
            const data = await response.json();
            setLandmarks(data);
        })();
    }, []);

    useEffect(
        React.useCallback(() => {
            const target = route.params?.targetLocation;
            if (target && mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: target.latitude,
                    longitude: target.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }, 1000);
            }
        }, [route.params])
    );

    if (!location) {
        return <View style={currentStyles.container} />;
    }

    return (
        <View style={currentStyles.container}>
            <MapView
                ref={mapRef}
                style={currentStyles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
                customMapStyle={currentStyles.mapStyle}
            >
                {landmarks.map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                        title={item.name}
                        pinColor="red"
                    />
                ))}
            </MapView>
        </View>
    );
}
