export class User {
  constructor(id, username, role, nom, prenom) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.nom = nom;
    this.prenom = prenom;
  }

  static fromJson(json) {
    return new User(
      json.id,
      json.username,
      json.role,
      json.nom,
      json.prenom
    );
  }
} 