import React from 'react';
import { View, Switch, Text } from 'react-native';
import {useDarkMode} from '../components/DarkMode';
import styles from './styles/styles'; // Dit is nu een object

export default function Settings() {
    const { darkMode, setDarkMode } = useDarkMode();
    const currentStyles = styles[darkMode ? 'dark' : 'light'];

    return (
        <View style={currentStyles.container}>
            <Text style={currentStyles.text}>
                {darkMode ? 'Dark' : 'Light'}
            </Text>
            <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={'#f4f3f4'}
            />
        </View>
    );
}
