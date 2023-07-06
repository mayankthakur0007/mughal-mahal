import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { FAB, SearchBar } from "@rneui/themed";
import QuestionnaireCard from "./QuestionnaireCard";

export const QuestionnaireList = (props) => {// props -> data, branchUpdater
    const [filteredDataSource, setFilteredDataSource] = useState();
    const [search, setSearch] = useState("");
    const [visibleList, setVisibleList] = useState(false);
    const [visibleAddUi, setVisibleAddUi] = useState(false);
    const searchFilterFunction = (text) => {
        if (text === "") {
            setFilteredDataSource(props.data);
            setSearch(text);
        } else {
            const newData = props.data.filter((item) => {
                const itemData = `${item.title.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        }
    };

    const renderHeader = () => (
        <SearchBar
            placeholder="Type Here..."
            lightTheme
            inputContainerStyle={{ backgroundColor: "white" }}
            inputStyle={{ color: "black" }}
            round
            onChangeText={(text) => searchFilterFunction(text)}
            autoCorrect={false}
            value={search}
        />
    );

    useEffect(() => {
        setFilteredDataSource(props.data);
    }, [props.data]);

    const addUiVisible = () => {
        setVisibleList(false)
        setVisibleAddUi(true)
    };

    return (
        <View style={styles.container}>
            <FlatList
                isVisible={visibleList}
                data={filteredDataSource}
                renderItem={({ item }) => (
                    <QuestionnaireCard propData={item} questionnairesUpdater={props.questionnairesUpdater}/>
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader(searchFilterFunction)}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default QuestionnaireList;

