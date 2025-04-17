<template>
  <div>
    <h1 class="text-2xl font-bold text-[#d4af7f] mb-4">Mes données</h1>
    <p class="text-gray-400 mb-6">Modifier vos informations :</p>

    <form @submit.prevent="updateUserData" class="space-y-4 max-w-md">
      <div>
        <label class="block text-sm text-gray-300 mb-1">Nom</label>
        <input
            type="text"
            v-model="user.nom"
            class="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-300 mb-1">Prénom</label>
        <input
            type="text"
            v-model="user.prenom"
            class="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-300 mb-1">Adresse e-mail</label>
        <input
            type="email"
            v-model="user.email"
            class="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white"
        />
      </div>
      <div>
        <button
            type="submit"
            class="bg-[#d4af7f] hover:bg-[#c49f70] text-black font-semibold py-2 px-4 rounded transition"
        >
          Enregistrer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axiosInstance from '@/utils/axiosInstance'

export default {
  data() {
    return {
      user: {},
    }
  },
  methods: {
    async fetchUserData() {
      try {
        const email = localStorage.getItem('email');
        if (!email) throw new Error('Aucun email trouvé dans le localStorage');

        const response = await axiosInstance.get(`/utilisateurs/email/${email}`);
        this.user = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    },
    async updateUserData() {
      try {
        const response = await axiosInstance.put(`/utilisateurs/email/${this.user.id_utilisateur}`, {
          nom: this.user.nom,
          prenom: this.user.prenom,
          email: this.user.email,
        })

        if (response.status === 200) {
          alert('Données utilisateur modifiées avec succès !')
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données utilisateur:', error)
        alert('Une erreur s’est produite. Veuillez réessayer.')
      }
    },
  },
  mounted() {
    this.fetchUserData()
  },
}
</script>