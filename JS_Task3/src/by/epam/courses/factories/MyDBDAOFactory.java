package by.epam.courses.factories;

import by.epam.courses.dao.MyDBuserDAO;
import by.epam.courses.interfaces.UserDAO;

public class MyDBDAOFactory extends DAOFactory{
	private static MyDBDAOFactory instance;
	
	private MyDBDAOFactory() {
		
	}
	
	public static synchronized MyDBDAOFactory getFactory() {
		if(instance == null) {
			instance = new MyDBDAOFactory();
		}
		return instance;
	}

	@Override
	public UserDAO getUserDAO() {
		return new MyDBuserDAO();
	}
}
