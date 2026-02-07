'use client'

import { useState, useRef } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '@/lib/firebase'

interface PropertyFormData {
  // Informations de base
  title: string
  price: string
  location: string
  status: 'À vendre' | 'À louer'
  description: string
  
  // Caractéristiques principales
  rooms: string
  bathrooms: string
  surface_habitable: string
  
  // Prestations
  parking: boolean
  terrasse: boolean
  piscine: boolean
  ascenseur: boolean
  cave: boolean
  jardin: boolean
  balcon: boolean
  garage: boolean
  climatisation: boolean
  interphone: boolean
  local_velo: boolean
  internet: boolean
  digicode: boolean
  fibre_optique: boolean
  gardien: boolean
  autres_prestations: string
  
  // Surfaces détaillées
  surface_totale: string
  
  // DPE
  consommation_energetique: string
  emissions_ges: string
  
  // Photos
  photos: File[]
}

interface PropertyFormProps {
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  initialData?: any
}

export default function PropertyForm({ onSubmit, onCancel, initialData }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: initialData?.title || '',
    price: initialData?.price || '',
    location: initialData?.location || '',
    status: initialData?.status || 'À vendre',
    description: initialData?.description || '',
    rooms: initialData?.rooms || '',
    bathrooms: initialData?.bathrooms || '',
    surface_habitable: initialData?.surface_habitable || '',
    parking: initialData?.parking || false,
    terrasse: initialData?.terrasse || false,
    piscine: initialData?.piscine || false,
    ascenseur: initialData?.ascenseur || false,
    cave: initialData?.cave || false,
    jardin: initialData?.jardin || false,
    balcon: initialData?.balcon || false,
    garage: initialData?.garage || false,
    climatisation: initialData?.climatisation || false,
    interphone: initialData?.interphone || false,
    local_velo: initialData?.local_velo || false,
    internet: initialData?.internet || false,
    digicode: initialData?.digicode || false,
    fibre_optique: initialData?.fibre_optique || false,
    gardien: initialData?.gardien || false,
    autres_prestations: initialData?.autres_prestations || '',
    surface_totale: initialData?.surface_totale || '',
    consommation_energetique: initialData?.consommation_energetique || 'Non renseigné',
    emissions_ges: initialData?.emissions_ges || 'Non renseigné',
    photos: []
  })

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: keyof PropertyFormData) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (selectedPhotos.length + files.length > 10) {
      alert('Maximum 10 photos autorisées')
      return
    }
    
    const newPhotos = [...selectedPhotos, ...files]
    setSelectedPhotos(newPhotos)
    
    // Créer des previews
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPhotoPreviews(prev => [...prev, ...newPreviews])
  }

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotoPreviews(prev => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Vérifier les champs requis
      if (!formData.title.trim()) {
        throw new Error('Le titre est obligatoire')
      }
      if (!formData.price.trim()) {
        throw new Error('Le prix est obligatoire')
      }
      if (!formData.location.trim()) {
        throw new Error('La localisation est obligatoire')
      }

      // Uploader les images vers Firebase Storage
      const uploadedImages = []
      
      if (selectedPhotos.length > 0) {
        console.log(`Upload de ${selectedPhotos.length} image(s)...`)
        const storage = getStorage(app)
        
        // Uploader chaque image
        for (let i = 0; i < selectedPhotos.length; i++) {
          const file = selectedPhotos[i]
          
          // Vérifier la taille du fichier (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            throw new Error(`L'image ${i + 1} est trop volumineuse (max 10MB)`)
          }
          
          const fileExt = file.name.split('.').pop()?.toLowerCase()
          if (!fileExt || !['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExt)) {
            throw new Error(`Le format de l'image ${i + 1} n'est pas supporté (jpg, png, webp, gif uniquement)`)
          }
          
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
          const filePath = `properties/${fileName}`

          try {
            console.log(`Upload de l'image ${i + 1}/${selectedPhotos.length}...`)
            // Upload vers Firebase Storage
            const storageRef = ref(storage, filePath)
            await uploadBytes(storageRef, file)

            // Récupérer l'URL publique de l'image
            const downloadURL = await getDownloadURL(storageRef)
            console.log(`Image ${i + 1} uploadée avec succès:`, downloadURL)

            uploadedImages.push({
              src: downloadURL,
              alt: `${formData.title} - Photo ${i + 1}`
            })
          } catch (uploadError: any) {
            console.error('Erreur upload image:', uploadError)
            
            let errorMsg = `Erreur lors de l'upload de l'image ${i + 1}`
            if (uploadError.code === 'storage/unauthorized') {
              errorMsg += ': Vous n\'avez pas l\'autorisation d\'uploader des images'
            } else if (uploadError.code === 'storage/quota-exceeded') {
              errorMsg += ': Quota de stockage dépassé'
            } else if (uploadError.message) {
              errorMsg += `: ${uploadError.message}`
            }
            
            throw new Error(errorMsg)
          }
        }
        console.log(`${uploadedImages.length} image(s) uploadée(s) avec succès`)
      }

      // Combiner avec les images existantes (pour l'édition)
      const existingImages = initialData?.images || []
      const allImages = [...existingImages, ...uploadedImages]

      // Vérifier qu'il y a au moins une image
      if (allImages.length === 0) {
        const confirmNoImage = confirm('Aucune image n\'a été ajoutée. Voulez-vous continuer sans image ?')
        if (!confirmNoImage) {
          setSubmitting(false)
          return
        }
      }

      const propertyData = {
        ...formData,
        images: allImages,
        type: formData.status,
        surface: formData.surface_habitable,
      }

      console.log('Soumission des données de la propriété...')
      await onSubmit(propertyData)
      
      // Nettoyer les previews après succès
      photoPreviews.forEach(preview => URL.revokeObjectURL(preview))
      setSelectedPhotos([])
      setPhotoPreviews([])
    } catch (error: any) {
      console.error('Erreur lors de la soumission:', error)
      alert(error.message || 'Erreur lors de la soumission du formulaire')
      // Ne pas réinitialiser submitting pour permettre à l'utilisateur de corriger les erreurs
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informations de base */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Informations de base</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix (€) *
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="450 000"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localisation *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut *
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as 'À vendre' | 'À louer')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="À vendre">À Vendre</option>
              <option value="À louer">À Louer</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Décrivez le bien en détail..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Caractéristiques principales */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Caractéristiques principales</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chambres
            </label>
            <input
              type="text"
              value={formData.rooms}
              onChange={(e) => handleInputChange('rooms', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salles de bain
            </label>
            <input
              type="text"
              value={formData.bathrooms}
              onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Surface habitable (m²)
            </label>
            <input
              type="text"
              value={formData.surface_habitable}
              onChange={(e) => handleInputChange('surface_habitable', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Prestations */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Prestations</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.parking}
              onChange={() => handleCheckboxChange('parking')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Parking</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.terrasse}
              onChange={() => handleCheckboxChange('terrasse')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Terrasse</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.piscine}
              onChange={() => handleCheckboxChange('piscine')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Piscine</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.ascenseur}
              onChange={() => handleCheckboxChange('ascenseur')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Ascenseur</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.cave}
              onChange={() => handleCheckboxChange('cave')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Cave</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.jardin}
              onChange={() => handleCheckboxChange('jardin')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Jardin</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.balcon}
              onChange={() => handleCheckboxChange('balcon')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Balcon</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.garage}
              onChange={() => handleCheckboxChange('garage')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Garage</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.climatisation}
              onChange={() => handleCheckboxChange('climatisation')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Climatisation</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.interphone}
              onChange={() => handleCheckboxChange('interphone')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Interphone</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.local_velo}
              onChange={() => handleCheckboxChange('local_velo')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Local vélo</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.internet}
              onChange={() => handleCheckboxChange('internet')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Internet</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.digicode}
              onChange={() => handleCheckboxChange('digicode')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Digicode</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.fibre_optique}
              onChange={() => handleCheckboxChange('fibre_optique')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Fibre optique</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.gardien}
              onChange={() => handleCheckboxChange('gardien')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Gardien</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chauffage
          </label>
          <select
            value={formData.consommation_energetique}
            onChange={(e) => handleInputChange('consommation_energetique', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Non renseigné">Non renseigné</option>
            <option value="Électrique">Électrique</option>
            <option value="Gaz">Gaz</option>
            <option value="Fioul">Fioul</option>
            <option value="Bois">Bois</option>
            <option value="Pompe à chaleur">Pompe à chaleur</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Autres prestations
          </label>
          <input
            type="text"
            value={formData.autres_prestations}
            onChange={(e) => handleInputChange('autres_prestations', e.target.value)}
            placeholder="Autres prestations..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Surfaces détaillées */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Surfaces détaillées</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Surface totale (m²)
          </label>
          <input
            type="text"
            value={formData.surface_totale}
            onChange={(e) => handleInputChange('surface_totale', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* DPE */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Diagnostic de Performance Énergétique (DPE)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consommation énergétique
            </label>
            <select
              value={formData.consommation_energetique}
              onChange={(e) => handleInputChange('consommation_energetique', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Non renseigné">Non renseigné</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Émissions de GES
            </label>
            <select
              value={formData.emissions_ges}
              onChange={(e) => handleInputChange('emissions_ges', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Non renseigné">Non renseigné</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Photos</h3>
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Photos ({photoPreviews.length}/10)
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoSelect}
            className="hidden"
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Sélectionner des photos
          </button>

          {photoPreviews.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Aucune photo sélectionnée. La première photo sera la photo principale.
            </p>
          )}

          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Principale
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Publication...' : 'Publier'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}

