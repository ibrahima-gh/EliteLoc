import express from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../clients/supabase.js';
const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

        if (error || !data) {
            return res.status(401).json({ error: 'Identifiants incorrects.' })
        }

        const user = data

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Identifiants incorrects.' })
        }

        req.session.user = {
            id: user.id_utilisateur,
            email: user.email
        }

        res.status(200).json({
            message: 'Connexion réussie',
            user: req.session.user
        })
    } catch (err) {
        console.error('Erreur lors de la connexion:', err)
        res.status(500).json({ error: 'Erreur serveur.' })
    }
})

// Route d'inscription
router.post("/register", async (req, res) => {
    const { nom, prenom, email, mot_de_passe, telephone } = req.body;
    try {
        const { data: existingUser, error: checkError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (existingUser) {
            return res.status(409).json({ error: "L'utilisateur existe déjà." });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        const { data, error } = await supabase
            .from("users")
            .insert([{ nom, prenom, email, telephone, password: hashedPassword }])
            .select("nom, prenom, email, telephone")
            .single();

        if (error) throw error;

        res.status(201).json({
            message: "Utilisateur inscrit avec succès",
            user: data,
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


// Route de déconnexion
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
    }
    res.json({ message: 'Déconnexion réussie' });
  });
});

// Route pour obtenir les infos complètes de l'utilisateur connecté
router.get('/users/me', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Utilisateur non authentifié.' });
    }
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id_utilisateur', req.session.user.id)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        res.status(200).json({ user: data });
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté :', err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

export default router;