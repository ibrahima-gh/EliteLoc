const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// init de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('utilisateur')
            .select('*');

        if (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// inscription
router.post('/inscription', async (req, res) => {
    try {
        const { email, mot_de_passe, nom, prenom, telephone, adresse } = req.body;

        // créer l'utilisateur dans le système d'authe de supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: mot_de_passe,
        });

        if (authError) {
            console.error("Erreur d'authentification:", authError);
            return res.status(400).json({ message: 'Erreur lors de la création du compte', error: authError.message });
        }

        // ajouter les informations utilisateur supplémentaires dans la table
        const { data, error } = await supabase
            .from('utilisateur')
            .insert([
                { nom, prenom, email, telephone, adresse }
            ]);

        if (error) {
            console.error("Erreur d'insertion:", error);
            return res.status(400).json({ message: 'Erreur lors de la création du profil utilisateur' });
        }

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// connexion utilisateur
router.post('/connexion', async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: mot_de_passe
        });

        if (error) {
            console.error("Erreur de connexion:", error);
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        res.status(200).json({
            message: 'Connexion réussie',
            token: data.session.access_token,
            user: data.user
        });
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// déconnexion
router.post('/deconnexion', async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Erreur de déconnexion:", error);
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }

        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;