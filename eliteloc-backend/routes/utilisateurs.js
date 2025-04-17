const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// middleware pour vérifier le token JWT
const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // extraire le token de l'en-tête Authorization

    if (!token) {
        return res.status(401).json({ message: 'Token manquant. Vous devez être connecté.' });
    }

    try {
        // décode le token JWT avec Supabase
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            console.log("Erreur d'authentification:", error);
            return res.status(401).json({ message: 'Token invalide.' });
        }

        console.log("Utilisateur authentifié :", data.user);

        // ajoute l'utilisateur au contexte de la requête
        req.user = { user: data.user };
        next();
    } catch (error) {
        console.error("Erreur lors de l'authentification:", error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

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

// route l'utilisateur connecté
router.get('/me', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.user.id;

        console.log("UUID à rechercher :", userId);

        // requête dans la bdd
        const { data, error } = await supabase
            .from('utilisateur')
            .select('*')
            .eq('uuid', userId) //
            .single();

        if (error || !data) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json(data); // retourne les données de l'utilisateur
    } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur:", error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// inscription
router.post('/inscription', async (req, res) => {
    try {
        const { email, mot_de_passe, nom, prenom, telephone, adresse } = req.body;

        // créer l'utilisateur dans le système d'auth de supabase
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

// modifier les données utilisateur
router.put('/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, telephone, adresse } = req.body;

    try {
        // pour vérifier que l'utilisateur modifie ses propres données
        if (req.user.id !== id) {
            return res.status(403).json({ message: "Action non autorisée." });
        }

        // m.a.j de l'utilisateur dans la bdd après modifications
        const { error } = await supabase
            .from('utilisateur')
            .update({ nom, prenom, email, telephone, adresse })
            .eq('id_utilisateur', id);

        if (error) {
            console.error('Erreur pendant la mise à jour :', error);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (error) {
        console.error("Exception pendant la mise à jour :", error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

module.exports = router;