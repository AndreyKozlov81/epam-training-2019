package by.epam.courses.dao;

import by.epam.courses.beans.User;
import by.epam.courses.db.MyDB;
import by.epam.courses.interfaces.UserDAO;

public class MyDBuserDAO implements UserDAO{

	@Override
	public User getUser(String name, String password) {
		MyDB db = MyDB.getMyDB();
		User user = null;
		for (User findUser : db.getUsers()) {
			if(findUser.getName().equals(name) && findUser.getPassword().equals(password)) {
				user = findUser;
			}
		}
		return user;
	}

	@Override
	public boolean addUser(User user) {
		boolean result = false;
		MyDB db = MyDB.getMyDB();
		synchronized (MyDBuserDAO.class) {
			if(!isUserFound(user)) {
				db.addUser(user);
				result = true;
			}
		}
		return result;
	}
	
	@Override
	public User getUserById(int id) {
		MyDB db = MyDB.getMyDB();
		User user = null;
		for (User findUser : db.getUsers()) {
			if(findUser.getId() == id) {
				user = findUser;
			}
		}
		return user;
	}
	
	private boolean isUserFound(User user) {
		boolean result = false;
		MyDB db = MyDB.getMyDB();
		for (User findUser : db.getUsers()) {
			if(findUser.getName().equals(user.getName())){
				result = true;
			}
			if(findUser.getEmail().equals(user.getEmail())) {
				result = true;
			}
		}
		return result;
	}
}