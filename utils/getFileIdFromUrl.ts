// returns value between /files/ and /view
export const  getFileIdFromUrl = (url: string)  => {
  const match = url.match(/\/files\/([^/]+)\/view/);
  return match ? match[1] : null;
}
