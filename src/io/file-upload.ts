export function openFilePicker(accept: string): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.style.display = 'none';

    input.addEventListener('change', () => {
      const file = input.files?.[0] ?? null;
      document.body.removeChild(input);
      resolve(file);
    });

    input.addEventListener('cancel', () => {
      document.body.removeChild(input);
      resolve(null);
    });

    document.body.appendChild(input);
    input.click();
  });
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error(`Failed to read file: ${reader.error?.message ?? 'Unknown error'}`));
    };

    reader.readAsText(file);
  });
}

export async function openAndReadYamlFile(): Promise<string | null> {
  const file = await openFilePicker('.yaml,.yml');
  if (!file) {
    return null;
  }
  return readFileAsText(file);
}
