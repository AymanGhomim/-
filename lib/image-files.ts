const MAX_SOURCE_SIZE = 20 * 1024 * 1024;
const MAX_DIMENSION = 1200;
const TARGET_STORED_SIZE = 320 * 1024;

export function validateImageFile(file: File): string | null {
  if (!file.type.startsWith("image/")) return "الملف المختار ليس صورة صالحة.";
  if (file.size > MAX_SOURCE_SIZE) return "حجم الصورة أكبر من 20 ميجابايت.";
  return null;
}

export async function imageFileToStoredData(file: File): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(objectUrl);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
    let canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    drawImage(canvas, image);

    let quality = 0.76;
    let result = canvas.toDataURL("image/jpeg", quality);
    while (dataUrlSize(result) > TARGET_STORED_SIZE && quality > 0.44) {
      quality -= 0.08;
      result = canvas.toDataURL("image/jpeg", quality);
    }

    while (dataUrlSize(result) > TARGET_STORED_SIZE && canvas.width > 720) {
      const smaller = document.createElement("canvas");
      smaller.width = Math.max(1, Math.round(canvas.width * 0.84));
      smaller.height = Math.max(1, Math.round(canvas.height * 0.84));
      const context = smaller.getContext("2d");
      if (!context) throw new Error("تعذر تجهيز الصورة للحفظ.");
      context.drawImage(canvas, 0, 0, smaller.width, smaller.height);
      canvas = smaller;
      result = canvas.toDataURL("image/jpeg", 0.58);
    }

    return result;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("تعذر قراءة الصورة المختارة."));
    image.src = src;
  });
}

function drawImage(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("تعذر تجهيز الصورة للحفظ.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function dataUrlSize(value: string): number {
  const payload = value.slice(value.indexOf(",") + 1);
  return Math.ceil((payload.length * 3) / 4);
}
