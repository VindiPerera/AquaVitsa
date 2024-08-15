// SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tracks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Ionicons name="ios-arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 35, // Add padding for the icon
  },
  searchIcon: {
    position: 'absolute',
    right: 40, // Position it inside the TextInput
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 8,
  },
});

export default SearchBar;