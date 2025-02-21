import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    addButton: {
      padding: 4,
    },
    content: {
      flex: 1,
      paddingVertical: 8,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
    },
    todoInput: {
      fontSize: 16,
      padding: 12,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      marginBottom: 16,
    },
    addTodoButton: {
      backgroundColor: '#f4b400',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    addTodoButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  