import React, { useState, useRef, type DragEvent } from "react";
import { BiUpload } from "react-icons/bi";

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
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [PRODUCT_IMAGERY]
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
            relative border-2 border-dashed p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? 'border-[#00f0ff] bg-[#00f0ff]/10'
              : 'border-zinc-800 bg-black hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/5'
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
              className={`${isDragging ? 'text-[#00f0ff]' : 'text-zinc-600'} transition-colors`}
            />
            <div>
              <p className="text-white text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
                {isDragging ? '[DROP_FILES_HERE!]' : '[DRAG_&_DROP_FILES]'}
              </p>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                [OR_CLICK_TO_BROWSE_DIRECTORY]
              </p>
            </div>
            <p className="text-[#ff0055] text-[10px] mt-2 uppercase tracking-widest font-bold">
              [PNG_JPG_WEBP_MAX_5MB]
            </p>
          </div>
        </div>

        {error && (
          <div className="text-[#ff0055] text-[10px] uppercase tracking-widest font-bold border border-[#ff0055] bg-[#ff0055]/10 p-3">
            [{error}]
          </div>
        )}

        {/* Preview Grid */}
        {imageFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                [{imageFiles.length}_FILES_QUEUED]
              </p>
              {coverImageId && (
                <p className="text-[#00f0ff] text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#00f0ff] animate-pulse"></span>
                  [PRIMARY_IMAGE_SET]
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageFiles.map((imageFile) => (
                <div
                  key={imageFile.id}
                  className={`
                    relative group bg-black overflow-hidden
                    border transition-all
                    ${coverImageId === imageFile.id
                      ? 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'border-zinc-800 hover:border-[#ff0055]'
                    }
                  `}
                >
                  {/* Badge de imagen de portada */}
                  {coverImageId === imageFile.id && (
                    <div className="absolute top-0 left-0 z-10 bg-[#00f0ff] text-black px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                      [COVER]
                    </div>
                  )}

                  {/* Imagen */}
                  <img
                    src={imageFile.preview}
                    alt="Preview"
                    className={`w-full h-32 object-cover transition-all ${coverImageId === imageFile.id ? 'opacity-100 grayscale-0' : 'opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                  />

                  {/* Overlay con acciones */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                    {coverImageId !== imageFile.id && (
                      <button
                        type="button"
                        onClick={() => setCoverImage(imageFile.id)}
                        className="bg-transparent border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all"
                        title="[SET_AS_COVER]"
                      >
                        [MAKE_PRIMARY]
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(imageFile.id)}
                      className="bg-transparent border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055] hover:text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all"
                      title="[EXEC_DELETE]"
                    >
                      [REMOVE_FILE]
                    </button>
                  </div>

                  {/* Nombre del archivo */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-1 border-t border-zinc-900 border-dashed">
                    <p className="text-[#00f0ff] text-[8px] uppercase tracking-widest font-bold truncate">
                      {imageFile.file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="bg-[#e4ff00]/5 border border-[#e4ff00]/20 p-4 font-mono">
          <p className="text-[#e4ff00] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [SYS_ADVISORY]:
          </p>
          <ul className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest space-y-1">
            <li>&gt; FIRST_IMAGE_DEFAULTS_TO_COVER</li>
            <li>&gt; CLICK_MAKE_PRIMARY_TO_OVERRIDE</li>
            <li>&gt; SUPPORTED:_PNG_JPG_WEBP</li>
            <li>&gt; MAX_FILE_SIZE_5MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;