const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// récupérer toutes les locations
router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("location").select("*");

        if (error) {
            console.error("Erreur lors de la récupération des locations:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


// récupère le middleware d'authentification depuis utilisateurs.js
const { authenticateUser } = require('./utilisateurs'); // exporte ce middleware dans utilisateurs.js

router.post("/", authenticateUser, async (req, res) => {
    try {
        const { date_debut, date_fin, id_voiture } = req.body;
        const userId = req.user.user.id;

        //  l'utilisateur à partir de l'UUID
        const { data: userData, error: userError } = await supabase
            .from('utilisateur')
            .select('id_utilisateur')
            .eq('uuid', userId)
            .single();

        if (userError || !userData) {
            console.error("Erreur lors de la récupération de l'utilisateur:", userError);
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const id_utilisateur = userData.id_utilisateur;

        // vérification si la voiture est disponible
        const { data: voiture, error: voitureError } = await supabase
            .from("voiture")
            .select("disponibilite")
            .eq("id_voiture", id_voiture)
            .single();

        if (voitureError || !voiture) {
            return res.status(404).json({ message: "Voiture introuvable" });
        }

        if (!voiture.disponibilite) {
            return res.status(400).json({ message: "La voiture n'est pas disponible" });
        }

        // création de la location dans la bdd
        const { data, error } = await supabase.from("location").insert([
            {
                date_debut,
                date_fin,
                id_utilisateur,
                id_voiture,
                statut: "en attente"
            },
        ]);

        if (error) {
            console.error("Erreur lors de la création de la location:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        // mis à jour la disponibilité de la voiture
        await supabase
            .from("voiture")
            .update({ disponibilite: false })
            .eq("id_voiture", id_voiture);

        res.status(201).json({ message: "Location créée avec succès", location: data });
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// m.a.J statut de la location
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        const { data, error } = await supabase
            .from("location")
            .update({ statut })
            .eq("id_location", id);

        if (error) {
            console.error("Erreur lors de la mise à jour de la location:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        res.status(200).json({ message: "Statut mis à jour avec succès", location: data });
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// récupérer toutes les locations d'un utilisateur donné
router.get("/utilisateur/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("location")
            .select("*, voiture(*)")
            .eq("id_utilisateur", id);

        if (error) {
            console.error("Erreur lors de la récupération des locations utilisateur:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        // Mapper les données pour enrichir les infos du véhicule
        const formatted = data.map(loc => ({
            ...loc,
            voiture_image: loc.voiture?.image || '',
            voiture_modele: loc.voiture?.modele || '',
            voiture_marque: loc.voiture?.marque || ''
        }));

        res.status(200).json(formatted);
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// les locations de l'utilisateur connecté
router.get("/mes-locations", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.user.id;

        //  l'utilisateur à partir de l'UUID
        const { data: userData, error: userError } = await supabase
            .from('utilisateur')
            .select('id_utilisateur')
            .eq('uuid', userId)
            .single();

        if (userError || !userData) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const id_utilisateur = userData.id_utilisateur;

        // pour récupérer les locations avec les infos de voiture
        const { data, error } = await supabase
            .from("location")
            .select(`
        *,
        voiture:id_voiture (
          marque, 
          modele,
          image
        )
      `)
            .eq("id_utilisateur", id_utilisateur);

        if (error) {
            console.error("Erreur lors de la récupération des locations:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        const formattedData = data.map(location => ({
            ...location,
            voiture_marque: location.voiture.marque,
            voiture_modele: location.voiture.modele,
            voiture_image: location.voiture.image
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;