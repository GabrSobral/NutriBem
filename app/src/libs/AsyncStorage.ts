import asyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorage {
  constructor() {}

  static async setItem<T = any>(key: string, payload: T) {
    try {
      await asyncStorage.setItem(key, JSON.stringify(payload));
    } catch (error: any) {
      throw error;
    }
  }

  static async removeItem(key: string) {
    await asyncStorage.removeItem(key);
  }

  static async getItem<T = any>(key: string): Promise<T | null> {
    const stringifiedData = await asyncStorage.getItem(key);

    if (!stringifiedData) {
      return null;
    }

    return JSON.parse(stringifiedData) as Promise<T>;
  }
}
