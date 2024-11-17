import { isValidPrivateKey } from "./utils";

// Types
interface KeyData {
    id: string;
    key: string;
    userId: number;
    timestamp: string;
}

type DBRequest = IDBOpenDBRequest | IDBRequest<any>;

export class MissingKeyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MissingKeyError';
    }
}

export class IncompatibleKeyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'IncompatibleKeyError';
    }
}

export class InvalidFormatError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidFormatError';
    }
}

class KeyManager {
    static initDB = (): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            const request: IDBOpenDBRequest = indexedDB.open(import.meta.env.VITE_DB_NAME);

            request.onerror = (event: Event) => {
                const target = (event.target as DBRequest);
                const error = target?.error?.message || 'Error al abrir la base de datos';
                reject(new Error(error));
            };

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(import.meta.env.VITE_STORE_NAME)) {
                    db.createObjectStore(import.meta.env.VITE_STORE_NAME, { keyPath: 'id' });
                }
            };

            request.onsuccess = (event: Event) => {
                const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

                resolve(db);
            };
        });
    };

    static save = async (userId: number, key: string): Promise<void> => {
        try {
            const db = await this.initDB();
            const transaction = db.transaction([import.meta.env.VITE_STORE_NAME], 'readwrite');
            const store = transaction.objectStore(import.meta.env.VITE_STORE_NAME);

            if (!isValidPrivateKey(key)) {
                throw new InvalidFormatError('La clave privada no es válida');
            }

            const keyData: KeyData = {
                id: `user_private_key`,
                key,
                userId,
                timestamp: new Date().toISOString()
            };

            return new Promise((resolve, reject) => {
                const request = store.put(keyData);

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = (event: Event) => {
                    const error = (event.target as DBRequest)?.error?.message || 'Error al guardar la clave';
                    reject(new Error(error));
                };

                transaction.oncomplete = () => {
                    db.close();
                };
            });
        } catch (err) {
            throw err;
        }
    };

    static get = async (): Promise<KeyData> => {
        try {
            const db = await this.initDB();
            const transaction = db.transaction([import.meta.env.VITE_STORE_NAME], 'readonly');
            const store = transaction.objectStore(import.meta.env.VITE_STORE_NAME);

            return new Promise((resolve, reject) => {
                const request = store.get('user_private_key');

                request.onsuccess = () => {
                    if (request.result) {
                        const keyData: KeyData = request.result;
                        resolve(keyData);
                    } else {
                        reject(new MissingKeyError('No se encontró la clave'));
                    }
                };

                request.onerror = (event: Event) => {
                    const error = (event.target as DBRequest)?.error?.message || 'Error al recuperar la clave';
                    reject(new Error(error));
                };

                transaction.oncomplete = () => {
                    db.close();
                };
            });
        } catch (err) {
            throw err;
        }
    };

    static hasKey(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.get()
                .then(() => resolve(true))
                .catch((err) => {
                    if (err instanceof MissingKeyError) {
                        resolve(false);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    static hasUserKey(userId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.get()
                .then((keyData) => {
                    if (keyData.userId === userId) {
                        resolve(true);
                    } else {
                        reject(new IncompatibleKeyError('La clave privada no corresponde al usuario. Intente iniciar sesion de nuevo'));
                    }
                })
                .catch((err) => {
                    if (err instanceof MissingKeyError) {
                        resolve(false);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    static delete = async (): Promise<void> => {
        try {
            const db = await this.initDB();
            const transaction = db.transaction([import.meta.env.VITE_STORE_NAME], 'readwrite');
            const store = transaction.objectStore(import.meta.env.VITE_STORE_NAME);

            return new Promise((resolve, reject) => {
                const request = store.delete('user_private_key');

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = (event: Event) => {
                    const error = (event.target as DBRequest)?.error?.message || 'Error al eliminar la clave';
                    reject(new Error(error));
                };

                transaction.oncomplete = () => {
                    db.close();
                };
            });
        } catch (err) {
            throw err;
        }
    }
};

export default KeyManager;
