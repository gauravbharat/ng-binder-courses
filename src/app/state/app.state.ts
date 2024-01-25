export function getInitialState(stateName: string) {
  const appState = localStorage.getItem('appState')
    ? JSON.parse(localStorage.getItem('appState') as string)
    : null;
  if (appState) {
    return appState[stateName];
  }
  return appState;
}
