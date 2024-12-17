import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Dropdown.style';
import axios from 'axios';
import { API_URL } from '@env';
import { useGlobalContext } from "../../contexts/GlobalContext";

const Dropdown = ({ placeholder, iconName, isOpen, setIsOpen, dataType, onCitySelect, selectedCity, disabled, onCityInputClear, selectedRoute, setSelectedRoute }) => {
    const { setLoading, setError, setErrorWithCode } = useGlobalContext();
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        fetchData();
        if (dataType === "cities" && selectedCity && selectedCity !== "N/A") {
            setInputValue(selectedCity);
        } else if (dataType === "routes" && !selectedCity) {
            setSelectedRoute(null);
            setInputValue('');
        }
    }, [dataType, selectedCity]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API_URL}/cities`);

            if (!response.ok) {
                // HTTP durum koduna göre hata mesajı ayarla
                setErrorWithCode(response.status);
                return;
            }

            if (dataType === "cities") {
                const cityNames = response.data.map(city => city.cityName);
                setData(cityNames);
                console.log("cityName ", cityNames)
            }
            else if (dataType === "routes" && selectedCity) {
                const city = response.data.find(city => city.cityName === selectedCity);
                const route = city ? city.routes.map(route => `${route.routeName}-${route.routeLine}`) : [];
                setData(route);
            }

        } catch (error) {
            console.log("errorDropdown", error);
            setErrorWithCode(status)
        } finally {
            setLoading(false)
        }
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const selectItem = (item) => {
        setSelectedItem(item);
        setInputValue(item);
        setIsOpen(false);
        if (dataType === "cities" && onCitySelect) {
            onCitySelect(item);
        } else if (dataType === "routes" && setSelectedRoute) {
            setSelectedRoute(item);
        }
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
            if (dataType === "cities" && onCityInputClear) {
                onCityInputClear();
            }
        }

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.dropdown, disabled && { opacity: 0.5 }]} onPress={toggleDropdown} disabled={disabled}>
                <TextInput
                    ref={inputRef}
                    onFocus={toggleDropdown}
                    placeholder={placeholder}
                    style={styles.selectedText}
                    onChangeText={handleSearch}
                    value={inputValue}
                    editable={!disabled}
                />
                <Icon name={iconName} size={24} color="#363636" style={styles.icon} />
            </TouchableOpacity>
            {isOpen && (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
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