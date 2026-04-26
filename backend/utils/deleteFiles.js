import fs from "fs";

export const deleteFiles = (files) => {
  if (!files || files.length === 0) return;

  files.forEach(file => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Failed to delete file:", file.path);
      }
    });
  });
};