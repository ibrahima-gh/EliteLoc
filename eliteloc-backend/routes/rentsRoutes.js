import express from 'express';
import { supabase } from '../clients/supabase.js';

const router = express.Router();

// récupérer toutes les locations
router.get("/rents", async (req, res) => {
  try {
    const { data, error } = await supabase.from("rents").select("*");
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

// créer une location sans authentification
router.post("/rents", async (req, res) => {
  try {
    const { date_debut, date_fin, id_voiture, id_utilisateur } = req.body;

    // Vérifier si la voiture est disponible
    const { data: voiture, error: voitureError } = await supabase
      .from("cars")
      .select("disponibilite")
      .eq("id_voiture", id_voiture)
      .single();

    if (voitureError || !voiture) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    if (!voiture.disponibilite) {
      return res.status(400).json({ message: "La voiture n'est pas disponible" });
    }

    // Création de la location dans la bdd
    const { data, error } = await supabase.from("rents").insert([
      {
        date_debut,
        date_fin,
        id_utilisateur,
        id_voiture,
        statut: "en attente",
      },
    ]);

    if (error) {
      console.error("Erreur lors de la création de la location:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    // Mise à jour de la disponibilité de la voiture
    await supabase.from("cars").update({ disponibilite: false }).eq("id_voiture", id_voiture);

    res.status(201).json({ message: "Location créée avec succès", location: data });
  } catch (error) {
    console.error("Exception:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// mise à jour statut de la location
router.put("/rents:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const { data, error } = await supabase.from("rents").update({ statut }).eq("id_location", id);

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
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase.from("rents").select("*, voiture(*)").eq("id_utilisateur", id);

    if (error) {
      console.error("Erreur lors de la récupération des locations utilisateur:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    const formatted = data.map((loc) => ({
      ...loc,
      voiture_image: loc.voiture?.image || "",
      voiture_modele: loc.voiture?.modele || "",
      voiture_marque: loc.voiture?.marque || "",
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Exception:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// récupérer toutes les locations (sans authentification)
router.get("/my-rents", async (req, res) => {
  try {
    // ATTENTION ici on attend que l'id utilisateur soit passé dans la query
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId requis en query" });
    }

    const { data, error } = await supabase
      .from("rents")
      .select(`
        *,
        voiture:id_voiture (
          marque,
          modele,
          image
        )
      `)
      .eq("id_utilisateur", userId);

    if (error) {
      console.error("Erreur lors de la récupération des locations:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    const formattedData = data.map((location) => ({
      ...location,
      voiture_marque: location.voiture?.marque || "",
      voiture_modele: location.voiture?.modele || "",
      voiture_image: location.voiture?.image || "",
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Exception:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;