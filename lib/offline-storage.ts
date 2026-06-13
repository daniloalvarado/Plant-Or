import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { client } from './sanity';

const QUEUE_KEY = '@offline_registros_queue';

export interface OfflineRegistro {
  id: string; // ID único local
  timestamp: number;
  data: any; // El documento base de Sanity sin las imágenes
  photos: {
    planta_completa: string | null;
    hoja: string | null;
    flor: string | null;
    fruto: string | null;
    semilla: string | null;
    extras?: string[];
  };
  status: 'pending' | 'syncing' | 'error';
  errorMsg?: string;
}

export async function saveRegistroOffline(registro: OfflineRegistro) {
  try {
    const queueJson = await AsyncStorage.getItem(QUEUE_KEY);
    const queue: OfflineRegistro[] = queueJson ? JSON.parse(queueJson) : [];
    queue.push(registro);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Error al guardar registro offline:', error);
    throw error;
  }
}

export async function updateRegistroOffline(registro: OfflineRegistro) {
  try {
    const queueJson = await AsyncStorage.getItem(QUEUE_KEY);
    let queue: OfflineRegistro[] = queueJson ? JSON.parse(queueJson) : [];
    const index = queue.findIndex(r => r.id === registro.id);
    if (index > -1) {
      queue[index] = registro;
    } else {
      queue.push(registro);
    }
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Error al actualizar registro offline:', error);
    throw error;
  }
}

export async function getRegistrosOffline(): Promise<OfflineRegistro[]> {
  try {
    const queueJson = await AsyncStorage.getItem(QUEUE_KEY);
    return queueJson ? JSON.parse(queueJson) : [];
  } catch (error) {
    console.error('Error al obtener registros offline:', error);
    return [];
  }
}

export async function removeRegistroOffline(id: string) {
  try {
    const queueJson = await AsyncStorage.getItem(QUEUE_KEY);
    if (!queueJson) return;
    const queue: OfflineRegistro[] = JSON.parse(queueJson);
    const newQueue = queue.filter(r => r.id !== id);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
  } catch (error) {
    console.error('Error al remover registro offline:', error);
  }
}

export async function updateRegistroStatus(id: string, status: 'pending' | 'syncing' | 'error', errorMsg?: string) {
  try {
    const queueJson = await AsyncStorage.getItem(QUEUE_KEY);
    if (!queueJson) return;
    const queue: OfflineRegistro[] = JSON.parse(queueJson);
    const index = queue.findIndex(r => r.id === id);
    if (index > -1) {
      queue[index].status = status;
      if (errorMsg) queue[index].errorMsg = errorMsg;
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (error) {
    console.error('Error actualizando estado del registro:', error);
  }
}

// Copia una URI temporal al directorio persistente de la app
export async function persistImage(tempUri: string): Promise<string | null> {
  if (!tempUri) return null;
  try {
    const filename = tempUri.split('/').pop();
    const newUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.copyAsync({
      from: tempUri,
      to: newUri
    });
    return newUri;
  } catch (error) {
    console.error('Error persistiendo imagen:', error);
    return null;
  }
}

// Sube una imagen local a Sanity
export async function uploadImageToSanity(uri: string): Promise<any> {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const asset = await client.assets.upload('image', blob);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error('Error subiendo imagen a Sanity:', error);
    throw error;
  }
}

export async function syncRegistro(registro: OfflineRegistro, user?: any) {
  try {
    await updateRegistroStatus(registro.id, 'syncing');

    const doc = { ...registro.data };
    
    // Conflict resolution: override offline data with verified Clerk data if logged in
    if (user) {
      doc.autor = user.id;
      doc.registrador_nombre = user.fullName || doc.registrador_nombre;
      doc.registrador_email = user.primaryEmailAddress?.emailAddress || doc.registrador_email;
    }

    doc.galeria = []; // Preparar array de galería

    // Subir imágenes una por una
    const { photos } = registro;
    const uploadedImages = [];

    if (photos.planta_completa) {
      const asset = await uploadImageToSanity(photos.planta_completa);
      uploadedImages.push(asset);
    }
    if (photos.hoja) {
      const asset = await uploadImageToSanity(photos.hoja);
      uploadedImages.push(asset);
    }
    if (photos.flor) {
      const asset = await uploadImageToSanity(photos.flor);
      uploadedImages.push(asset);
    }
    if (photos.fruto) {
      const asset = await uploadImageToSanity(photos.fruto);
      uploadedImages.push(asset);
    }
    if (photos.semilla) {
      const asset = await uploadImageToSanity(photos.semilla);
      uploadedImages.push(asset);
    }
    
    if (photos.extras && photos.extras.length > 0) {
      for (const extraUri of photos.extras) {
        if (extraUri) {
          const asset = await uploadImageToSanity(extraUri);
          uploadedImages.push(asset);
        }
      }
    }

    doc.galeria = uploadedImages;

    // Crear el documento en Sanity
    await client.create(doc);

    // Borrar de la cola al tener éxito
    await removeRegistroOffline(registro.id);
    
    return true;
  } catch (error: any) {
    console.error('Error sincronizando registro:', error);
    await updateRegistroStatus(registro.id, 'error', error.message || 'Error desconocido');
    return false;
  }
}

export async function clearAllOfflineRegistros() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}
