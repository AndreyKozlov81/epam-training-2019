package by.epam.courses.factories;

import by.epam.courses.interfaces.UserDAO;

public abstract class DAOFactory {
	public static final int MyDB = 1;
	
	public abstract UserDAO getUserDAO();
	
	public static DAOFactory getDAOFactory(int whichFactory) {
		switch (whichFactory) {
		case MyDB:
			return MyDBDAOFactory.getFactory();
		default:
			return null;
		}
	}
}
