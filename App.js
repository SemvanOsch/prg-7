import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./pages/HomeScreen";
import Locations from "./pages/Locations";
import Settings from "./pages/Settings";
import { DarkModeSetter, useDarkMode } from "./components/DarkMode";
import styles from "./pages/styles/styles";

const Tab = createBottomTabNavigator();

function MainApp() {
    const { darkMode } = useDarkMode();
    const currentStyles = styles[darkMode ? 'dark' : 'light'];

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: currentStyles.tabBar,
                    tabBarLabelStyle: currentStyles.tabLabel,
                    tabBarActiveTintColor: darkMode ? '#fff' : '#000',
                    tabBarInactiveTintColor: darkMode ? '#888' : '#555',
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="map-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Locations" component={Locations} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="location-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Settings" component={Settings} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings-outline" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <DarkModeSetter>
            <MainApp />
        </DarkModeSetter>
    );
}
