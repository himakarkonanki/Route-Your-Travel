export function readImageFile(file, callback) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Please select a valid image file (jpg or png).");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => callback(reader.result); // base64
  reader.readAsDataURL(file);
}
