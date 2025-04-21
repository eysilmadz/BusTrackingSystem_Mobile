import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Dropdown.style';
import { useGlobalContext } from "../../contexts/GlobalContext";
import { getCityNames } from '../../api/cityService';
import { getRoutesByCityId } from '../../api/routeService';

const Dropdown = ({ placeholder, iconName, isOpen, setIsOpen, dataType, onCitySelect, selectedCity, disabled, onCityInputClear, selectedRoute, setSelectedRoute }) => {
    const { setLoading, setError, setErrorWithCode } = useGlobalContext();
    const [allData, setAllData] = useState([]);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        fetchData();

        // Eğer şehir konumdan geldiyse veya sonradan değiştiyse input'a yaz
        if (dataType === "cities" && selectedCity && selectedCity !== "N/A") {
            setInputValue(selectedCity.name ?? selectedCity);
        } else if (dataType === "routes" && !selectedCity) {
            setSelectedRoute(null);
            setInputValue('');
        }
        
    }, [dataType, selectedCity]);

    const fetchData = async () => {
        try {
            if (dataType === "cities") {
                const cityList = await getCityNames();
                setAllData(cityList);
                setData(cityList);

                if(selectedCity && !hasInitialized.current) {
                    setInputValue(selectedCity.name ?? selectedCity);
                    setSelectedItem(selectedCity);
                    hasInitialized.current = true;
                } 
                // else {
                //     setInputValue('');
                //     setSelectedItem(null);
                // }
            } else if (dataType === "routes" && selectedCity) {
                const routeList = await getRoutesByCityId(selectedCity.id);
                setAllData(routeList);
                setData(routeList);
            }

        } catch (error) {
            console.log("errorDropdown", error);
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
        setInputValue(dataType === "cities" ? item.name : item);
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
            const filtered = allData.filter(item => {
                const val = dataType === "cities" ? item.name : item;
                return val.toLowerCase().includes(text.toLowerCase());
            });
            setData(filtered);

            if (dataType === "cities" && onCityInputClear && selectedItem) {
                onCityInputClear();
                setSelectedItem(null);
            }
        } else {
            setIsOpen(false);
            setData(allData);
            setSelectedItem(null);
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
                            <Text style={styles.itemText}>{dataType === "cities" ? item.name : item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default Dropdown;