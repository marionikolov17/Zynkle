export default function toFormData(data) {
    const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return formData;
}