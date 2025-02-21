import { StyleSheet } from 'react-native';

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
    },
    notesList: {
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
      minHeight: '50%',
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
    titleInput: {
      fontSize: 18,
      marginBottom: 12,
      padding: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 8,
    },
    contentInput: {
      fontSize: 16,
      marginBottom: 16,
      padding: 8,
      minHeight: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 8,
      textAlignVertical: 'top',
    },
    colorPicker: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    colorOption: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedColor: {
      borderColor: '#f4b400',
    },
    saveButton: {
      backgroundColor: '#f4b400',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });