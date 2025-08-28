export const selectLoading = (state) => state.appState.isLoading;

export const selectUpdating = (state) => state.appState.isUpdating;

export const selectEditingId = (state) => state.appState.editingId;

export const selectEditValue = (state) => state.appState.editValue;

export const selectIsDeleting = (state) => state.appState.isDeleting;

export const selectIsCreating = (state) => state.appState.isCreating;

export const selectEditNewValue = (state) => state.appState.editNewValue;

export const selectGetData = (state) => state.dataState;
