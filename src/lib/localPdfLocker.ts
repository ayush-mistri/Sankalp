/**
 * Browser-Local Official PDF Locker (IndexedDB)
 *
 * Allows students to load official PDFs they downloaded for personal study
 * (e.g., NCERT Part I, II, III) into their own browser's IndexedDB.
 * Files stay strictly local on the user's device—zero server upload,
 * zero copyrighted redistribution, and SSR-safe for Next.js production builds.
 */

export interface LocalBookPdfMeta {
  key: string;
  bookId: string;
  volumeKey: string;
  volumeLabel: string;
  fileName: string;
  fileSizeBytes: number;
  savedAt: string;
}

interface LocalBookPdfRecord extends LocalBookPdfMeta {
  blob: Blob;
}

const DB_NAME = 'sankalp-local-pdf-locker';
const DB_VERSION = 1;
const STORE_NAME = 'pdfs';
const MAX_PDF_SIZE_BYTES = 150 * 1024 * 1024; // 150 MB per volume safety guard

function isIndexedDbAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
}

function openLockerDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDbAvailable()) {
      reject(new Error('IndexedDB is unavailable in this environment.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('bookId', 'bookId', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open local PDF locker.'));
  });
}

export function buildPdfLockerKey(bookId: string, volumeKey: string): string {
  return `${bookId}::${volumeKey}`;
}

export async function saveLocalBookPdf(
  bookId: string,
  volumeKey: string,
  volumeLabel: string,
  file: File
): Promise<LocalBookPdfMeta> {
  if (!isIndexedDbAvailable()) {
    throw new Error('Browser storage is only available on the client.');
  }

  const isPdf =
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) {
    throw new Error('Please select a valid PDF (.pdf) file.');
  }
  if (file.size > MAX_PDF_SIZE_BYTES) {
    throw new Error('PDF file exceeds the 150 MB browser storage limit.');
  }

  const db = await openLockerDb();
  const key = buildPdfLockerKey(bookId, volumeKey);
  const record: LocalBookPdfRecord = {
    key,
    bookId,
    volumeKey,
    volumeLabel,
    fileName: file.name,
    fileSizeBytes: file.size,
    savedAt: new Date().toISOString(),
    blob: file,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(record);

    tx.oncomplete = () => {
      db.close();
      resolve({
        key: record.key,
        bookId: record.bookId,
        volumeKey: record.volumeKey,
        volumeLabel: record.volumeLabel,
        fileName: record.fileName,
        fileSizeBytes: record.fileSizeBytes,
        savedAt: record.savedAt,
      });
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error || new Error('Could not store PDF locally.'));
    };
  });
}

export async function listLocalBookPdfs(bookId: string): Promise<LocalBookPdfMeta[]> {
  if (!isIndexedDbAvailable()) return [];

  try {
    const db = await openLockerDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const index = store.index('bookId');
      const req = index.getAll(bookId);

      req.onsuccess = () => {
        db.close();
        const rows = (req.result || []) as LocalBookPdfRecord[];
        resolve(
          rows.map((row) => ({
            key: row.key,
            bookId: row.bookId,
            volumeKey: row.volumeKey,
            volumeLabel: row.volumeLabel,
            fileName: row.fileName,
            fileSizeBytes: row.fileSizeBytes,
            savedAt: row.savedAt,
          }))
        );
      };
      req.onerror = () => {
        db.close();
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}

export async function getLocalBookPdfBlobUrl(
  bookId: string,
  volumeKey: string
): Promise<string | null> {
  if (!isIndexedDbAvailable() || typeof URL === 'undefined') return null;

  try {
    const db = await openLockerDb();
    const key = buildPdfLockerKey(bookId, volumeKey);
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        db.close();
        const row = req.result as LocalBookPdfRecord | undefined;
        if (row?.blob) {
          resolve(URL.createObjectURL(row.blob));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => {
        db.close();
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}

export async function deleteLocalBookPdf(
  bookId: string,
  volumeKey: string
): Promise<void> {
  if (!isIndexedDbAvailable()) return;

  try {
    const db = await openLockerDb();
    const key = buildPdfLockerKey(bookId, volumeKey);
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(key);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    });
  } catch {
    // Ignore deletion errors cleanly
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
