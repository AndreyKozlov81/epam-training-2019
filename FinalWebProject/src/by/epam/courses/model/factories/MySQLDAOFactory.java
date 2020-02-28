package by.epam.courses.model.factories;

import by.epam.courses.model.dao.MySQLUserDAO;
import by.epam.courses.model.dao.ru.MySQLMenuDAORu;
import by.epam.courses.model.dao.ru.MySQLOrderDAORu;
import by.epam.courses.model.dao.MySQLMenuDAO;
import by.epam.courses.model.dao.MySQLOrderDAO;
import by.epam.courses.model.interfaces.UserDAO;
import by.epam.courses.model.interfaces.MenuDAO;
import by.epam.courses.model.interfaces.OrderDAO;

public class MySQLDAOFactory extends DAOFactory {
	private static MySQLDAOFactory instance;
	
	private MySQLDAOFactory() {
	}
	
	public static synchronized MySQLDAOFactory getFactory() {
		if(instance == null) {
			instance = new MySQLDAOFactory();
		}
		return instance;
	}

	@Override
	public UserDAO getUserDAO() {
		return new MySQLUserDAO();
	}

	@Override
	public OrderDAO getOrderDAO() {
		return new MySQLOrderDAO();
	}

	@Override
	public OrderDAO getOrderDAORu() {
		return new MySQLOrderDAORu();
	}
	
	@Override
	public MenuDAO getMenuDAO() {
		return new MySQLMenuDAO();
	}

	@Override
	public MenuDAO getMenuDAORu() {
		return new MySQLMenuDAORu();
	}

	

}
