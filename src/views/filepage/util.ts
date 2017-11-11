import {File} from '../../api';

namespace util0 {

  function inSuffixs(str: string, suffixs: string[]): boolean {
    for (let s of suffixs)
      if (str.endsWith('.' + s))
        return true;
    return false;
  }
  export function isVideo(file: File): boolean {
    if (file == null)  return false;
    return inSuffixs(file.name, ['avi', 'mp4']);
  }
  export function isImage(file: File): boolean {
    if (file == null)  return false;
    return inSuffixs(file.name, ['jpg', 'png']);
  }
  export function isText(file: File): boolean {
    if (file == null)  return false;
    return inSuffixs(file.name, ['txt']);
  }

  export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default util0;
