import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("Verifying token...");
  // Ambil bearer token dari header "authorization"
  const authHeader = req.headers["authorization"];
  let token;

  // Jika header ada, ambil token dari format "Bearer <token>"
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  // Jika token tidak ada, kembalikan error 401
  if (!token) {
    return res.status(401).json({
      message: "Token tidak ada",
    });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);

    // Pastikan payload berisi userId
    if (!decoded.id) {
      console.log("huguig");
      return res.status(403).json({
        message: "Payload token tidak valid: userId tidak ditemukan  affe",
      });
    }

    // Simpan userId dan email ke request
    req.id = decoded.id;
    req.email = decoded.email;

    // Lanjut ke middleware atau controller berikutnya
    next();
  } catch (error) {
    // Tangani error verifikasi (misalnya token kadaluarsa atau tidak valid)
    return res.status(403).json({
      message: "Access token tidak valid",
    });
  }
};