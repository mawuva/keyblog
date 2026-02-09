import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { usePage } from '@inertiajs/react';

import { useMemo, useRef, useEffect } from 'react'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function FilePondInput({
  value = [],
  onChange,
  multiple = false,
  acceptedFileTypes = [],
}) {
  // Récupérer le token CSRF depuis les props Inertia (mis à jour dynamiquement)
  const page = usePage();
  const csrfToken = page.props.csrfToken;
  
  // Récupérer le token avec fallback vers le meta tag
  const token = useMemo(() => {
    return csrfToken || document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  }, [csrfToken]);

  // Garder une référence à onChange pour éviter les problèmes de closure
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Référence pour le token CSRF (mis à jour dynamiquement)
  const tokenRef = useRef(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // Configuration du serveur avec token CSRF récupéré dynamiquement à chaque requête
  const serverConfig = useMemo(() => ({
    process: {
      url: '/filepond',
      method: 'POST',
      headers: () => ({
        'X-CSRF-TOKEN': tokenRef.current || document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }),
      onload: (response) => {
        const id = response;
        // Utiliser la référence pour obtenir la valeur actuelle
        const currentValue = valueRef.current;
        if (!currentValue.includes(id)) {
          onChangeRef.current([...currentValue, id]);
        }
        return id;
      },
    },
    revert: {
      url: '/filepond',
      method: 'DELETE',
      headers: () => ({
        'X-CSRF-TOKEN': tokenRef.current || document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }),
      onload: (id) => {
        const currentValue = valueRef.current;
        onChangeRef.current(currentValue.filter(v => String(v) !== String(id)));
      },
    },
  }), []);

  // Garder une référence à la valeur actuelle pour éviter les problèmes de closure
  const valueRef = useRef(value);
  
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return (
    <FilePond
      allowMultiple={multiple}
      maxFiles={6}
      acceptedFileTypes={acceptedFileTypes}
      server={serverConfig}
      onremovefile={(error, file) => {
        const currentValue = valueRef.current;
        if (file && file.serverId) {
          onChangeRef.current(currentValue.filter(v => String(v) !== String(file.serverId)));
        } else if (file && file.id) {
          onChangeRef.current(currentValue.filter(v => String(v) !== String(file.id)));
        }
      }}
    />
  )
}
