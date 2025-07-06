import { StyleSheet } from "react-native";

// Donkere Google Maps stijl
const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "on" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#383838" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
];

// Basis layout
const base = {
    map: {
        width: "100%",
        height: "100%",
    },
    mapStyle: [],
    text: {
        fontSize: 16,
    },
    tabBar: {
        height: 100,
        paddingBottom: 5,
        paddingTop: 5,
        borderTopWidth: 1,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: "600",
    },
    locationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 12,
    },
    locationItemTextWrapper: {
        flex: 1,
        paddingRight: 5,
    },
    locationItemText: {
        fontSize: 16,
        flexWrap: "wrap",
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    toggleButtonText: {
        fontWeight: "bold",
    },
    containerWithPadding: {
        flex: 1,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20,
    },
    separator: {
        height: 1,
    },
};

const light = StyleSheet.create({
    ...base,
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    containerWithPadding: {
        ...base.containerWithPadding,
        backgroundColor: "#fff",
    },
    text: {
        ...base.text,
        color: "#000",
    },
    heading: {
        ...base.heading,
        color: "#000"
    },
    locationItemText: {
        ...base.locationItemText,
        color: "#000",
    },
    tabBar: {
        ...base.tabBar,
        backgroundColor: "#f8f8f8",
        borderTopColor: "#e5e5e5",
    },
    tabLabel: {
        ...base.tabLabel,
        color: "#000",
    },
    toggleButton: {
        ...base.toggleButton,
        backgroundColor: "#ddd",
    },
    toggleButtonText: {
        ...base.toggleButtonText,
        color: "#000",
    },
    separator: {
        ...base.separator,
        backgroundColor: "#ccc",
    },
    mapStyle: [],
});

const dark = StyleSheet.create({
    ...base,
    container: {
        flex: 1,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
    },
    containerWithPadding: {
        ...base.containerWithPadding,
        backgroundColor: "#111",
    },
    text: {
        ...base.text,
        color: "#fff",
    },
    heading: {
        ...base.heading,
        color: "#fff"
    },
    locationItemText: {
        ...base.locationItemText,
        color: "#fff",
    },
    tabBar: {
        ...base.tabBar,
        backgroundColor: "#222",
        borderTopColor: "#333",
    },
    tabLabel: {
        ...base.tabLabel,
        color: "#fff",
    },
    toggleButton: {
        ...base.toggleButton,
        backgroundColor: "#333",
    },
    toggleButtonText: {
        ...base.toggleButtonText,
        color: "#fff",
    },
    separator: {
        ...base.separator,
        backgroundColor: "#333",
    },
    mapStyle: darkMapStyle,
});

export default { light, dark };
