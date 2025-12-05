import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const answers = req.body;

  if (!answers) {
    return res.status(400).json({ error: "Invalid answers" });
  }

  const profile = {
    id: Date.now(),
    tag: "beginner", // Dummy — your logic can evolve
    raw: answers,
  };

  res.json(profile);
});

export default router;
