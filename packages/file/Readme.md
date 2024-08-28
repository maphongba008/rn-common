# [`@rn-common/file`](./packages/file)

This module provides a set of utility functions for working with the file system in React Native, using Expo's `FileSystem` API. It includes functions for creating directories, reading and writing files, deleting files and folders, and managing downloads.

## Installation

Install using:

```sh
npx expo install @rn-common/file expo-file-system
```

## Exports

### Directories

- **`DocumentDirectory`**: The document directory path.
- **`CacheDirectory`**: The cache directory path.

### Functions

#### `mkdir(dir: string)`

Creates a new directory at the specified path, including any necessary intermediate directories.

**Parameters:**

- `dir` (string): The path of the directory to create.

**Returns:**

- `Promise<void>`: Resolves when the directory is created.

**Example:**

```javascript
await mkdir('/path/to/new/directory')
```

#### `readFile(filePath: string, options?: FileSystem.ReadingOptions)`

Reads the contents of a file as a string.

**Parameters:**

- `filePath` (string): The path of the file to read.
- `options` (FileSystem.ReadingOptions): Optional settings for reading the file.

**Returns:**

- `Promise<string>`: The contents of the file.

**Example:**

```javascript
const contents = await readFile('/path/to/file.txt')
```

#### `writeFile(filePath: string, contents: string, options?: FileSystem.WritingOptions)`

Writes content to a file.

**Parameters:**

- `filePath` (string): The path of the file to write to.
- `contents` (string): The content to write.
- `options` (FileSystem.WritingOptions): Optional settings for writing the file.

**Returns:**

- `Promise<void>`: Resolves when the file is written.

**Example:**

```javascript
await writeFile('/path/to/file.txt', 'Hello, World!')
```

#### `removeFile(filePath: string)`

Deletes a file at the specified path.

**Parameters:**

- `filePath` (string): The path of the file to delete.

**Returns:**

- `Promise<void>`: Resolves when the file is deleted.

**Example:**

```javascript
await removeFile('/path/to/file.txt')
```

#### `removeFolder(folderPath: string)`

Deletes a folder and all its contents.

**Parameters:**

- `folderPath` (string): The path of the folder to delete.

**Returns:**

- `Promise<void>`: Resolves when the folder and its contents are deleted.

**Example:**

```javascript
await removeFolder('/path/to/folder')
```

#### `extractFilename(filePath: string, withExtension = true)`

Extracts the filename from a given file path.

**Parameters:**

- `filePath` (string): The file path.
- `withExtension` (boolean, default: `true`): Whether to include the file extension.

**Returns:**

- `string`: The extracted filename.

**Example:**

```javascript
const filename = extractFilename('/path/to/file.txt') // 'file.txt'
const nameWithoutExtension = extractFilename('/path/to/file.txt', false) // 'file'
```

#### `extractExtension(filePath: string)`

Extracts the file extension from a given file path.

**Parameters:**

- `filePath` (string): The file path.

**Returns:**

- `string`: The file extension.

**Example:**

```javascript
const extension = extractExtension('/path/to/file.txt') // 'txt'
```

#### `joinPath(...paths: string[])`

Joins multiple path segments into a single path.

**Parameters:**

- `...paths` (string[]): Path segments.

**Returns:**

- `string`: The combined path.

**Example:**

```javascript
const fullPath = joinPath('/path', 'to', 'file.txt') // '/path/to/file.txt'
```

#### `createDownloadFile({ uri, filePath, options, onProgress })`

Initiates a file download from a specified URI.

**Parameters:**

- `uri` (string): The URI of the file to download.
- `filePath` (string): The local path to save the downloaded file.
- `options` (FileSystem.DownloadOptions): Optional download settings.
- `onProgress` (function): Callback for download progress.

**Returns:**

- `Object`: Methods to control the download (`download`, `pause`, `resume`, `cancel`) and the `uri` of the downloaded file.

**Example:**

```javascript
const { download, pause, resume, cancel, uri } = createDownloadFile({
  uri: 'https://example.com/file.zip',
  filePath: '/path/to/file.zip',
  onProgress: (progress) => console.log(`Download progress: ${progress}%`),
})
await download()
```
