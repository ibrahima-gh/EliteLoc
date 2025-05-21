<template>
    <div>
        <img class="w-full opacity-65" src="/bentley.png" alt="">
        <main class="m-10 grid grid-cols-1 lg:grid-cols-5 gap-5">
   
            <section class="col-span-5 mb-12">
                <h2 class="text-2xl font-semibold mb-4">Liste des voitures</h2>
                <table class="w-full text-left border border-gray-700">
                    <thead class="bg-[#1f1f1f]">
                        <tr>
                            <th class="p-3">ID</th>
                            <th class="p-3">Marque</th>
                            <th class="p-3">Modèle</th>
                            <th class="p-3">Disponible</th>
                            <th class="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="voiture in voitures" :key="voiture.id_voiture" class="border-t border-gray-700">
                            <td class="p-3">{{ voiture.id_voiture }}</td>
                            <td class="p-3">{{ voiture.marque }}</td>
                            <td class="p-3">{{ voiture.modele }}</td>
                            <td class="p-3">{{ voiture.disponibilite ? 'Oui' : 'Non' }}</td>
                            <td class="p-3">
                                <button class="text-blue-400 hover:underline mr-4" @click="modifierVoiture(voiture)">Modifier</button>
                                <button class="text-red-500 hover:underline" @click="supprimerVoiture(voiture.id_voiture)">Supprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="col-span-5 mb-12">
                <h2 class="text-2xl font-semibold mb-4">Liste des utilisateurs</h2>
                <ul class="space-y-2">
                    <li v-for="utilisateur in utilisateurs" :key="utilisateur.id_utilisateur">
                        {{ utilisateur.prenom }} {{ utilisateur.nom }} — {{ utilisateur.email }}
                    </li>
                </ul>
            </section>

            <section class="col-span-5">
                <h2 class="text-2xl font-semibold mb-4">Liste des locations</h2>
                <ul class="space-y-2">
                    <li v-for="location in locations" :key="location.id_location">
                        Voiture ID {{ location.id_voiture }} réservée par utilisateur ID {{ location.id_utilisateur }}
                        du {{ location.date_debut }} au {{ location.date_fin }}
                    </li>
                </ul>
            </section>
        </main>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const voitures = ref([])
const utilisateurs = ref([])
const locations = ref([])

onMounted(async () => {
    const voituresRes = await axios.get('http://localhost:3000/cars')
    voitures.value = voituresRes.data

    const utilisateursRes = await axios.get('http://localhost:3000/users')
    utilisateurs.value = utilisateursRes.data

    const locationsRes = await axios.get('http://localhost:3000/rents')
    locations.value = locationsRes.data
})

const modifierVoiture = (voiture) => {
    console.log('Modifier', voiture)
}

const supprimerVoiture = async (id) => {
    await axios.delete(`http://localhost:3000/cars/${id}`)
    voitures.value = voitures.value.filter(v => v.id_voiture !== id)
}
</script>