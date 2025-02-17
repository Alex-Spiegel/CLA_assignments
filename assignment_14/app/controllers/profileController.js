const profiles = {
  coders: [
    { id: 1, firstName: "Alex", lastName: "Coder", about: "Loves coding" },
    { id: 2, firstName: "Paul", lastName: "Coder02", about: "Loves ocelots" },
  ],
  managers: [
    { id: 1, firstName: "Sara", lastName: "Manager", about: "Leads the team" },
  ],
};
//====================================================
// GET für Coder-Profil
//====================================================
const getCoderProfile = (req, res) => {
  const coderId = parseInt(req.params.id);
  const coder = profiles.coders.find((c) => c.id === coderId);

  if (!coder) {
    return res.status(404).json({ message: "Coder not found!" });
  }

  res.json(coder);
};

//====================================================
// GET für Manager-Profil
//====================================================
const getManagerProfile = (req, res) => {
  const managerId = parseInt(req.params.id);
  const manager = profiles.managers.find((m) => m.id === managerId);

  if (!manager) {
    return res.status(404).json({ message: "Manager not found!" });
  }

  res.json(manager);
};

//====================================================
// PUT für Coder-Profil aktualisieren
//====================================================
const updateCoderProfile = (req, res) => {
  const coderId = parseInt(req.params.id);
  const coderIndex = profiles.coders.findIndex((c) => c.id === coderId);

  if (coderIndex === -1) {
    return res.status(404).json({ message: "Coder not found!" });
  }

  const { firstName, lastName, about } = req.body;

  // Update Profile
  profiles.coders[coderIndex] = {
    ...profiles.coders[coderIndex],
    firstName,
    lastName,
    about,
  };

  res.json({
    message: "Coder profile updated!",
    profile: profiles.coders[coderIndex],
  });
};

//====================================================
// PUT für Manager-Profil aktualisieren
//====================================================
const updateManagerProfile = (req, res) => {
  const managerId = parseInt(req.params.id);
  const managerIndex = profiles.managers.findIndex((m) => m.id === managerId);

  if (managerIndex === -1) {
    return res.status(404).json({ message: "Manager not found!" });
  }

  const { firstName, lastName, about } = req.body;

  // Update Profile
  profiles.managers[managerIndex] = {
    ...profiles.managers[managerIndex],
    firstName,
    lastName,
    about,
  };

  res.json({
    message: "Manager profile updated!",
    profile: profiles.managers[managerIndex],
  });
};

module.exports = {
  getCoderProfile,
  getManagerProfile,
  updateCoderProfile,
  updateManagerProfile,
};
