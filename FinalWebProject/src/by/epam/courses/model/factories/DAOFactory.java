package by.epam.courses.model.factories;

import by.epam.courses.model.interfaces.UserDAO;
import by.epam.courses.model.interfaces.MenuDAO;
import by.epam.courses.model.interfaces.OrderDAO;

public abstract class DAOFactory {
	public static final int MYSQL = 1;
	
	public abstract UserDAO getUserDAO();
	public abstract OrderDAO getOrderDAO();
	public abstract OrderDAO getOrderDAORu();
	public abstract MenuDAO getMenuDAO();
	public abstract MenuDAO getMenuDAORu();
	
	public static DAOFactory getDAOFactory(int whichFactory) {
		switch (whichFactory) {
		case MYSQL:
			return MySQLDAOFactory.getFactory();
		default:
			return null;
		}
	}
}
