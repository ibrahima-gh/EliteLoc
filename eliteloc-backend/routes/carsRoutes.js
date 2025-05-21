import express from 'express';
import { supabase } from '../clients/supabase.js';

const router = express.Router();
// get de toutes les voitures
router.get("/cars", async (req, res) => {
    try {
        const { data, error } = await supabase.from("cars").select("*");

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

router.get("/cars/tendance", async (req, res) => {
    try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .in("id_voiture", [11, 12, 13, 14, 15, 16, 17, 18]);

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
router.put("/cars:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { disponibilite } = req.body;

        const { data, error } = await supabase
            .from("cars")
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

export default router;
