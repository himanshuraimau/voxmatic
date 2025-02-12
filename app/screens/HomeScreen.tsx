import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../context/ThemeContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the RootStackParamList type
type RootStackParamList = {
    TodoList: { isCreating?: boolean };
    JournalList: { isCreating?: boolean };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TodoList'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'TodoList'>;

type Props = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation }: Props) {
    const { colors } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const onDateChange = (_event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        setDatePickerVisible(Platform.OS === 'ios');
        setSelectedDate(currentDate);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity
                    style={styles.historyButton}
                    onPress={() => setDatePickerVisible(true)}
                >
                    <Feather name="calendar" size={20} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.dateText, { color: colors.text }]}>{formatDate(selectedDate)}</Text>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: colors.card }]}
                    onPress={() => navigation.navigate('TodoList', { isCreating: false })}
                >
                    <AntDesign name="checkcircleo" size={24} color={colors.text} />
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: colors.card }]}
                    onPress={() => navigation.navigate('JournalList', { isCreating: false })}
                >
                    <Feather name="book" size={24} color={colors.text} />
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Journal</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.fab, { backgroundColor: colors.card }]}
                onPress={() => setModalVisible(true)}
            >
                <AntDesign name="plus" size={24} color={colors.text} />
            </TouchableOpacity>

            {isDatePickerVisible && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <TouchableOpacity
                            style={[styles.modalOption, { backgroundColor: colors.card }]}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('TodoList', { isCreating: true });
                            }}
                        >
                            <AntDesign name="checkcircleo" size={20} color={colors.text} />
                            <Text style={[styles.modalOptionText, { color: colors.text }]}>New Todo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalOption, { backgroundColor: colors.card }]}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('JournalList', { isCreating: true });
                            }}
                        >
                            <Feather name="book" size={20} color={colors.text} />
                            <Text style={[styles.modalOptionText, { color: colors.text }]}>New Journal Entry</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    historyButton: {
        padding: 8,
    },
    dateText: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 10,
        flex: 1,
    },
    cardContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 15,
    },
    card: {
        flex: 1,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', // Replace shadow* props with boxShadow
    },
    cardTitle: {
        marginTop: 12,
        fontSize: 15,
        fontWeight: '500',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.15)', // Replace shadow* props with boxShadow
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', // Replace shadow* props with boxShadow
    },
    modalOptionText: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: '500',
    },
});