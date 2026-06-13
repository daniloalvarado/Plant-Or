import * as Network from 'expo-network';

export async function checkIsOffline(): Promise<boolean> {
  try {
    const state = await Network.getNetworkStateAsync();
    
    // 1. Si el SO nos dice explícitamente que no hay conexión o no hay internet
    if (!state.isConnected || state.isInternetReachable === false) {
      return true;
    }

    // 2. Ping de confirmación rápido (2 segundos) para detectar portales cautivos
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://clients3.google.com/generate_204', {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);
      
      // Exactamente 204 significa internet real. Si da 200 (portal cautivo), asumimos offline.
      return response.status !== 204;
    } catch (fetchError) {
      // Fetch throwea si no hay conexión real
      return true;
    }
  } catch (e) {
    console.warn('Network check failed, assuming offline:', e);
    return true;
  }
}
