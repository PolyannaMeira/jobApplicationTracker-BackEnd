import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import prisma from '../config/prismaCliente.js';

const userControllers = {
  register: async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Email inválido.' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Senha fraca.' });
    }
    if (!matchPasswords(password, confirmPassword)) {
      return res.status(400).json({ message: 'Senhas não coincidem.' });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ message: 'Usuário já cadastrado.' });
      }

      const hashedPassword = await hashPassword(password);

      await prisma.user.create({
        data: { email, password: hashedPassword, firstName, lastName }
      });

      return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }
  },

 login: async (req, res) => {
  const { email, password } = req.body;

  // 1. Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // 2. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 3. Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5. Return token in response body
    return res.status(200).json({ token });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

,
getProfile: async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('getProfile error:', err);
    return res.status(500).json({ message: 'Error fetching profile' });
  }
},

updateProfile: async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        email,
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
    });
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
},

changePassword: async (req, res) => {
  

  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user?.id;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Senha atual incorreta." });

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Nova senha e confirmação não coincidem." });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: "Nova senha fraca." });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (err) {
    console.error("Erro ao trocar senha:", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
}
,


  logout: async (req, res) => {
    return res.status(200).json({ message: 'Logout realizado com sucesso.' });
  }
};

export default userControllers;
