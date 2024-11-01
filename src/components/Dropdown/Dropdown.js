import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Dropdown.style';
import axios from 'axios';
import { API_URL } from '@env';

const Dropdown = ({ placeholder, iconName, isOpen, setIsOpen }) => {

    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/cities`);
            const cityNames = response.data.map(city => city.cityName);
            setData(cityNames);
            console.log(cityNames);
        } catch (error) {
            console.log("error", error);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const selectItem = (item) => {
        setSelectedItem(item);
        setInputValue(item);
        setIsOpen(false);
    };

    const handleSearch = (text) => {
        setInputValue(text);
        if (text.length > 0) {
            setIsOpen(true);
            const filteredList = data.filter(city => {
                const searchedText = text.toLowerCase();
                const currentTitle = city.toLowerCase();
                return currentTitle.includes(searchedText);
            });
            setData(filteredList);
        } else {
            setIsOpen(false);
            fetchData();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <TextInput
                    ref={inputRef}
                    onFocus={toggleDropdown}
                    placeholder={placeholder}
                    style={styles.selectedText}
                    onChangeText={handleSearch}
                    value={inputValue}
                />
                <Icon name={iconName} size={24} color="#363636" style={styles.icon} />
            </TouchableOpacity>
            {isOpen && (
                <FlatList
                    data={data}
                    keyExtractor={(index) => index.toString()}
                    style={styles.dropdownList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => selectItem(item)}
                        >
                            <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default Dropdown;