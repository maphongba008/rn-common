import * as FileSystem from 'expo-file-system'

export const DocumentDirectory = FileSystem.documentDirectory
export const CacheDirectory = FileSystem.cacheDirectory

/**
 * Creates a new directory at the specified path. If intermediate directories do not exist, they will be created as well.
 *
 * @param {string} dir - The path of the directory to be created. Intermediate directories will be created if they do not exist.
 *
 * @returns {Promise<void>} A promise that resolves when the directory has been successfully created.
 *
 * @example
 * await mkdir('/path/to/new/directory');
 */
export const mkdir = async (dir: string) => {
  return FileSystem.makeDirectoryAsync(dir, { intermediates: true })
}

/**
 * Checks if a file exists at the specified path.
 *
 * @param {string} filePath - The path of the file to check.
 *
 * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the file exists.
 *
 * @example
 * const exists = await fileExists('/path/to/file');
 */
export const readFile = async (
  filePath: string,
  options?: FileSystem.ReadingOptions,
) => {
  return FileSystem.readAsStringAsync(filePath, {
    encoding: FileSystem.EncodingType.UTF8,
    ...options,
  })
}

/**
 * Writes the specified contents to a file at the specified path.
 *
 * @param {string} filePath - The path of the file to write to.
 * @param {string} contents - The contents to write to the file.
 * @param {FileSystem.WritingOptions} [options] - Optional configuration for the write operation.
 *
 * @returns {Promise<void>} A promise that resolves when the write operation is complete.
 *
 * @example
 * await writeFile('/path/to/file', 'Hello, World!');
 */
export const writeFile = async (
  filePath: string,
  contents: string,
  options?: FileSystem.WritingOptions,
) => {
  return FileSystem.writeAsStringAsync(filePath, contents, {
    encoding: FileSystem.EncodingType.UTF8,
    ...options,
  })
}

/**
 * Deletes a file at the specified path.
 *
 * @param {string} filePath - The path to the file to be deleted.
 *
 * @returns {Promise<void>} A promise that resolves when the file has been successfully deleted.
 *
 * @example
 * await removeFile('/path/to/file.txt');
 */
export const removeFile = async (filePath: string) => {
  return FileSystem.deleteAsync(filePath)
}

/**
 * Deletes a folder at the specified path. Note that this will delete the folder and all its contents.
 *
 * @param {string} folderPath - The path to the folder to be deleted.
 *
 * @returns {Promise<void>} A promise that resolves when the folder and its contents have been successfully deleted.
 *
 * @example
 * await removeFolder('/path/to/folder');
 */
export const removeFolder = async (folderPath: string) => {
  return FileSystem.deleteAsync(folderPath)
}

/**
 * Extracts the filename from a given file path. Optionally, the file extension can be excluded from the result.
 *
 * @param {string} filePath - The path of the file from which to extract the filename.
 * @param {boolean} [withExtension=true] - Whether to include the file extension in the result. Defaults to true.
 *
 * @returns {string} The filename, with or without the extension depending on the `withExtension` parameter.
 *
 * @example
 * const fullFilename = extractFilename('/path/to/file.txt'); // 'file.txt'
 * const nameWithoutExtension = extractFilename('/path/to/file.txt', false); // 'file'
 */
export const extractFilename = (filePath: string, withExtension = true) => {
  const parts = filePath.split('/')
  const filename = parts[parts.length - 1]
  return withExtension ? filename : filename.split('.')[0]
}

/**
 * Extracts the file extension from a given file path.
 *
 * @param {string} filePath - The path of the file from which to extract the extension.
 *
 * @returns {string} The file extension, or an empty string if no extension is found.
 *
 * @example
 * const extension = extractExtension('/path/to/file.txt'); // 'txt'
 * const noExtension = extractExtension('/path/to/file'); // ''
 */
export const extractExtension = (filePath: string) => {
  const parts = filePath.split('.')
  return parts[parts.length - 1] || ''
}

/**
 * Joins multiple path segments into a single path, using '/' as the separator.
 *
 * @param {...string[]} paths - The path segments to be joined.
 *
 * @returns {string} The resulting joined path.
 *
 * @example
 * const fullPath = joinPath('/path', 'to', 'file.txt'); // '/path/to/file.txt'
 */
export const joinPath = (...paths: string[]) => {
  return paths.join('/')
}

/**
 * Initiates a file download from a specified URI and saves it to a given file path.
 *
 * @param {Object} params - The parameters for the download.
 * @param {string} params.uri - The URI of the file to be downloaded.
 * @param {string} params.filePath - The local file path where the downloaded file will be saved.
 * @param {FileSystem.DownloadOptions} [params.options] - Optional configuration for the download.
 * @param {(progress: number) => void} params.onProgress - A callback function that receives the download progress as a percentage.
 *
 * @returns {Object} An object containing methods to control the download:
 *   - `download`: A promise that starts the download process.
 *   - `pause`: A promise that pauses the download.
 *   - `resume`: A promise that resumes a paused download.
 *   - `cancel`: A promise that cancels the download.
 *   - `uri`: The URI of the downloaded file.
 *
 *
 * @example
 * const { download } = createDownloadFile({
 *   uri: 'https://example.com/file.zip',
 *   filePath: '/path/to/save/file.zip',
 *   onProgress: (progress) => console.log(`Download progress: ${progress}%`)
 * });
 * download()
 */
export const createDownloadFile = async ({
  uri,
  filePath,
  options,
  onProgress,
}: {
  uri: string
  filePath: string
  options?: FileSystem.DownloadOptions
  onProgress: (progress: number) => void
}) => {
  const resumable = FileSystem.createDownloadResumable(
    uri,
    filePath,
    options,
    (p) => {
      const progress = Math.round(
        (p.totalBytesWritten * 100) / p.totalBytesExpectedToWrite,
      )
      onProgress(progress)
    },
  )
  return {
    download: resumable.downloadAsync(),
    pause: resumable.pauseAsync(),
    resume: resumable.resumeAsync(),
    cancel: resumable.cancelAsync(),
    uri: resumable.fileUri,
  }
}
