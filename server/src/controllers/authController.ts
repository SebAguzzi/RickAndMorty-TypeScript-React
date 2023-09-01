import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Registro exitoso.' });
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ message: 'Ha ocurrido un error en el servidor.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Por favor, rellene todos los campos.' });
    }

    const existingUser = await User.findOne({ where: { username } });

    if (!existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario no existe.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'La contraseña es incorrecta.' });
    }
    
    return res.status(200).json({ message: 'Login exitoso.' });

  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ message: 'Ha ocurrido un error en el servidor.' });      
  }
}
