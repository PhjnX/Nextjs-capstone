// src/utils/format.ts
export const formatText = (value: any, fallback = "Không có thông tin") => {
  return value ?? fallback;
};
