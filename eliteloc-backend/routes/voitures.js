const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// get de toutes les voitures
router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("voiture").select("*");

        if (error) {
            console.error("Erreur lors de la récupération des voitures:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// m.a.j des disponibilité d'une voiture
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { disponibilite } = req.body;

        const { data, error } = await supabase
            .from("voiture")
            .update({ disponibilite })
            .eq("id_voiture", id);

        if (error) {
            console.error("Erreur lors de la mise à jour de la voiture:", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        res.status(200).json({ message: "Disponibilité mise à jour avec succès", voiture: data });
    } catch (error) {
        console.error("Exception:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;