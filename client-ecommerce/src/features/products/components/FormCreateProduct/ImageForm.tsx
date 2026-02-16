import React, { useState, useRef, type DragEvent } from "react";
import { BiUpload } from "react-icons/bi";
import { BsImage, BsTrash2, BsCheckCircle } from "react-icons/bs";

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface ImageFormProps {
  coverPreview: string | null;
  setCoverPreview: (preview: string | null) => void;
  onFileChange: (file: File | null) => void;
  allImageFiles: File[];
  setAllImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  error?: string;
}

const ImageForm: React.FC<ImageFormProps> = ({
  setCoverPreview,
  onFileChange,
  setAllImageFiles,
  error
}) => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [coverImageId, setCoverImageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max

      if (!isImage) {
        alert(`${file.name} no es una imagen válida`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });

    const newImageFiles: ImageFile[] = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));

    setImageFiles(prev => [...prev, ...newImageFiles]);

    // Actualizar el estado del padre con todos los archivos
    setAllImageFiles(prev => [...prev, ...validFiles]);

    // Si es la primera imagen, establecerla como portada automáticamente
    if (imageFiles.length === 0 && newImageFiles.length > 0) {
      setCoverImageId(newImageFiles[0].id);
      onFileChange(newImageFiles[0].file);
      setCoverPreview(newImageFiles[0].preview);
    }
  };

  const removeImage = (id: string) => {
    setImageFiles(prev => {
      const filtered = prev.filter(img => img.id !== id);

      // Limpiar URL del preview
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);

        // Remover del estado del padre también
        setAllImageFiles(allFiles =>
          allFiles.filter(file => file !== imageToRemove.file)
        );
      }

      // Si se elimina la imagen de portada, establecer la primera disponible
      if (coverImageId === id && filtered.length > 0) {
        setCoverImageId(filtered[0].id);
        onFileChange(filtered[0].file);
        setCoverPreview(filtered[0].preview);
      } else if (filtered.length === 0) {
        setCoverImageId(null);
        onFileChange(null);
        setCoverPreview(null);
      }

      return filtered;
    });
  };

  const setCoverImage = (id: string) => {
    const image = imageFiles.find(img => img.id === id);
    if (image) {
      setCoverImageId(id);
      onFileChange(image.file);
      setCoverPreview(image.preview);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Limpiar URLs cuando el componente se desmonte
  React.useEffect(() => {
    return () => {
      imageFiles.forEach(img => {
        URL.revokeObjectURL(img.preview);
      });
    };
  }, [imageFiles]);

  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BsImage size={20} className="text-cyan-400" />
        Imágenes del Producto
      </h2>

      <div className="space-y-6">
        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-slate-600 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            <BiUpload
              size={48}
              className={`${isDragging ? 'text-cyan-400' : 'text-slate-400'} transition-colors`}
            />
            <div>
              <p className="text-slate-100 font-medium mb-1">
                {isDragging ? '¡Suelta las imágenes aquí!' : 'Arrastra y suelta imágenes'}
              </p>
              <p className="text-slate-400 text-sm">
                o haz clic para seleccionar archivos
              </p>
            </div>
            <p className="text-slate-500 text-xs mt-2">
              PNG, JPG, JPEG, WEBP (máx. 5MB por imagen)
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Preview Grid */}
        {imageFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-300 text-sm">
                {imageFiles.length} {imageFiles.length === 1 ? 'imagen seleccionada' : 'imágenes seleccionadas'}
              </p>
              {coverImageId && (
                <p className="text-cyan-400 text-xs flex items-center gap-1">
                  <BsCheckCircle size={14} />
                  Imagen de portada seleccionada
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageFiles.map((imageFile) => (
                <div
                  key={imageFile.id}
                  className={`
                    relative group bg-slate-700/50 rounded-lg overflow-hidden
                    border-2 transition-all
                    ${coverImageId === imageFile.id
                      ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                      : 'border-slate-600 hover:border-slate-500'
                    }
                  `}
                >
                  {/* Badge de imagen de portada */}
                  {coverImageId === imageFile.id && (
                    <div className="absolute top-2 left-2 z-10 bg-cyan-400 text-slate-900 px-2 py-1 rounded text-xs font-bold">
                      Portada
                    </div>
                  )}

                  {/* Imagen */}
                  <img
                    src={imageFile.preview}
                    alt="Preview"
                    className="w-full h-32 object-cover"
                  />

                  {/* Overlay con acciones */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {coverImageId !== imageFile.id && (
                      <button
                        type="button"
                        onClick={() => setCoverImage(imageFile.id)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        title="Establecer como portada"
                      >
                        Portada
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(imageFile.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all"
                      title="Eliminar imagen"
                    >
                      <BsTrash2 size={16} />
                    </button>
                  </div>

                  {/* Nombre del archivo */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs truncate">
                      {imageFile.file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
          <p className="text-slate-300 text-sm mb-2">
            💡 <span className="font-medium">Consejos:</span>
          </p>
          <ul className="text-slate-400 text-xs space-y-1 ml-4">
            <li>• La primera imagen será la portada por defecto</li>
            <li>• Puedes cambiar la portada haciendo clic en "Portada" sobre cualquier imagen</li>
            <li>• Formatos soportados: PNG, JPG, JPEG, WEBP</li>
            <li>• Tamaño máximo: 5MB por imagen</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;