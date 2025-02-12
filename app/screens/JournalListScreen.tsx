import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface JournalEntry {
    id: string;
    title: string;
    content: string;
    date: string;
}

type RootStackParamList = {
    JournalList: { newJournal?: JournalEntry, isCreating?: boolean };
};

type JournalListScreenRouteProp = RouteProp<RootStackParamList, 'JournalList'>;
type JournalListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JournalList'>;

type JournalListScreenProps = {
    navigation: JournalListScreenNavigationProp;
    route: JournalListScreenRouteProp;
};

const DUMMY_JOURNALS: JournalEntry[] = [
    {
        id: '1',
        title: 'Today was amazing',
        content: 'Had a great meeting and accomplished all my tasks...',
        date: new Date().toISOString()
    },
    {
        id: '2',
        title: 'New project thoughts',
        content: 'Started working on the new mobile app design...',
        date: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
];

export default function JournalListScreen({ navigation, route }: JournalListScreenProps) {
    const [journals, setJournals] = useState(DUMMY_JOURNALS);

    useEffect(() => {
        if (route.params?.newJournal) {
            setJournals(currentJournals => [route.params.newJournal as JournalEntry, ...currentJournals]);
            // Clear the params to prevent duplicate additions
            navigation.setParams({ newJournal: undefined });
        }
    }, [route.params?.newJournal, navigation]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderItem = ({ item }: { item: JournalEntry }) => (
        <TouchableOpacity style={styles.journalItem}>
            <Text style={styles.journalDate}>{formatDate(item.date)}</Text>
            <Text style={styles.journalTitle}>{item.title}</Text>
            <Text style={styles.journalExcerpt} numberOfLines={2}>
                {item.content}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#444" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Journal Entries</Text>
            </View>

            <FlatList
                data={journals}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#444',
    },
    list: {
        padding: 20,
    },
    journalItem: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    journalDate: {
        color: '#888',
        fontSize: 12,
        marginBottom: 5,
    },
    journalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 5,
    },
    journalExcerpt: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});