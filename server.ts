import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("pesenkopi.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT,
    points INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    customerName TEXT,
    date TEXT,
    time TEXT,
    guests INTEGER,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    customerName TEXT,
    itemName TEXT,
    quantity INTEGER,
    totalPrice INTEGER,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`);

// Migration: Ensure 'points' column exists in 'users' table
try {
  const tableInfo = db.prepare("PRAGMA table_info(users)").all() as any[];
  const hasPoints = tableInfo.some(col => col.name === 'points');
  if (!hasPoints) {
    console.log("Adding 'points' column to 'users' table...");
    db.exec("ALTER TABLE users ADD COLUMN points INTEGER DEFAULT 0");
  }

  // Migration for orders table
  const orderTableInfo = db.prepare("PRAGMA table_info(orders)").all() as any[];
  const hasCustomerName = orderTableInfo.some(col => col.name === 'customerName');
  if (!hasCustomerName && orderTableInfo.length > 0) {
    console.log("Adding 'customerName' column to 'orders' table...");
    db.exec("ALTER TABLE orders ADD COLUMN customerName TEXT");
  }
} catch (err) {
  console.error("Migration error:", err);
}

// Seed Admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE email = ?").get("admin@pesenkopi.com");
if (!adminExists) {
  db.prepare("INSERT INTO users (email, password, name, role, points) VALUES (?, ?, ?, ?, ?)").run(
    "admin@pesenkopi.com",
    "admin123",
    "Admin PesenKopi",
    "admin",
    0
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Forgot Password
  app.post("/api/forgot-password", (req, res) => {
    const { email, newPassword } = req.body;
    try {
      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      if (!user) {
        return res.json({ success: false, message: "Email tidak ditemukan" });
      }
      db.prepare("UPDATE users SET password = ? WHERE email = ?").run(newPassword, email);
      res.json({ success: true });
    } catch (err) {
      console.error("Forgot password error:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
    }
  });

  // Login / SignUp
  app.post(["/api/login", "/api/signup"], (req, res) => {
    const isSignUp = req.path === "/api/signup" || req.body.isSignUp;
    const { email, password, role: selectedRole, name: providedName, isGoogle } = req.body;
    
    if (isGoogle) {
      // Google Login Simulation
      try {
        let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        if (!user) {
          // Create new user for Google login if not exists
          const name = providedName || email.split('@')[0];
          const formattedName = name ? (name.charAt(0).toUpperCase() + name.slice(1)) : "User Google";
          const result = db.prepare("INSERT INTO users (email, password, name, role, points) VALUES (?, ?, ?, ?, ?)").run(
            email,
            'google-auth-no-password',
            formattedName,
            selectedRole || 'customer',
            5 // Bonus points for Google login
          );
          user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
        }
        return res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role, points: user.points } });
      } catch (err) {
        console.error("Google login error:", err);
        return res.status(500).json({ success: false, message: "Gagal masuk dengan Google" });
      }
    }

    if (isSignUp) {
      // Sign Up Logic
      try {
        console.log("Attempting sign up for:", email);
        const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        if (existingUser) {
          console.log("Sign up failed: Email already exists");
          return res.status(400).json({ success: false, message: "Email sudah terdaftar" });
        }

        const name = providedName || email.split('@')[0];
        const formattedName = name ? (name.charAt(0).toUpperCase() + name.slice(1)) : "User";
        
        const result = db.prepare("INSERT INTO users (email, password, name, role, points) VALUES (?, ?, ?, ?, ?)").run(
          email,
          password,
          formattedName,
          selectedRole || 'customer',
          0
        );
        console.log("Sign up successful for:", email);
        const newUser = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
        res.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role, points: newUser.points } });
      } catch (err) {
        console.error("Sign up error:", err);
        res.status(500).json({ success: false, message: "Gagal mendaftar" });
      }
    } else {
      // Login Logic
      // First find user by email
      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      
      if (user) {
        if (user.password === password) {
          // Check if role matches
          if (user.role !== selectedRole) {
            return res.status(403).json({ 
              success: false, 
              message: `Akun ini terdaftar sebagai ${user.role === 'admin' ? 'Admin' : 'Pelanggan'}. Silakan pilih peran yang sesuai.` 
            });
          }
          res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role, points: user.points } });
        } else {
          res.status(401).json({ success: false, message: "Kata sandi salah" });
        }
      } else {
        res.status(404).json({ success: false, message: "Akun tidak ditemukan. Silakan daftar terlebih dahulu." });
      }
    }
  });

  // Get User Data (for points update)
  app.get("/api/user/:id", (req, res) => {
    const user = db.prepare("SELECT id, email, name, role, points FROM users WHERE id = ?").get(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  });

  // Redeem Points
  app.post("/api/redeem", (req, res) => {
    const { userId, pointsToRedeem } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    
    if (!user || user.points < pointsToRedeem) {
      return res.status(400).json({ success: false, message: "Poin tidak cukup" });
    }

    db.prepare("UPDATE users SET points = points - ? WHERE id = ?").run(pointsToRedeem, userId);
    const updatedUser = db.prepare("SELECT id, email, name, role, points FROM users WHERE id = ?").get(userId);
    res.json({ success: true, user: updatedUser });
  });

  // Get Reservations
  app.get("/api/reservations", (req, res) => {
    const { userId, role } = req.query;
    let reservations;
    if (role === 'admin') {
      reservations = db.prepare("SELECT * FROM reservations ORDER BY date DESC, time DESC").all();
    } else {
      reservations = db.prepare("SELECT * FROM reservations WHERE userId = ? ORDER BY date DESC, time DESC").all(userId);
    }
    res.json(reservations);
  });

  // Create Reservation
  app.post("/api/reservations", (req, res) => {
    const { userId, customerName, date, time, guests, notes } = req.body;
    const result = db.prepare(`
      INSERT INTO reservations (userId, customerName, date, time, guests, status, notes)
      VALUES (?, ?, ?, ?, ?, 'pending', ?)
    `).run(userId, customerName, date, time, guests, notes);
    
    const newRes = db.prepare("SELECT * FROM reservations WHERE id = ?").get(result.lastInsertRowid);
    res.json(newRes);
  });

  // Update Reservation Status
  app.patch("/api/reservations/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare("UPDATE reservations SET status = ? WHERE id = ?").run(status, id);
    res.json({ success: true });
  });

  // Delete Reservation
  app.delete("/api/reservations/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM reservations WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // --- Orders API ---

  app.get("/api/orders", (req, res) => {
    const { userId, role } = req.query;
    let orders;
    if (role === 'admin') {
      orders = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC").all();
    } else {
      orders = db.prepare("SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC").all(userId);
    }
    res.json(orders);
  });

  app.post("/api/orders", (req, res) => {
    const { userId, customerName, itemName, quantity, totalPrice } = req.body;
    
    db.transaction(() => {
      const result = db.prepare(`
        INSERT INTO orders (userId, customerName, itemName, quantity, totalPrice, status)
        VALUES (?, ?, ?, ?, ?, 'pending')
      `).run(userId, customerName, itemName, quantity, totalPrice);
      
      // Add points: 1 point per 10,000 IDR spent
      const pointsEarned = Math.floor(totalPrice / 10000);
      db.prepare("UPDATE users SET points = points + ? WHERE id = ?").run(pointsEarned, userId);
      
      const newOrder = db.prepare("SELECT * FROM orders WHERE id = ?").get(result.lastInsertRowid);
      res.json(newOrder);
    })();
  });

  app.patch("/api/orders/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
