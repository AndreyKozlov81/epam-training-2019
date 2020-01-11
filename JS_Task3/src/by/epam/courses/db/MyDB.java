package by.epam.courses.db;

import java.util.LinkedList;
import java.util.List;
import by.epam.courses.beans.User;

public class MyDB {
	private static MyDB instance;
	private List<User> users;
	private int id;
	
	private MyDB() {
		users = new LinkedList<User>();
		id = 0;
	}
	
	public static MyDB getMyDB() {
		if(instance == null) {
			instance = new MyDB();
		}
		return instance;
	}
	
	public User getUserById(int id) {
		if(!users.isEmpty()) {
			User findUser = null;
			for (User user : users) {
				if(user.getId() == id) {
					findUser = user;
				}else {
					return null;
				}
			}
			return findUser;
		}else {
			return null;
		}
	}
	
	public void addUser(User user) {
		id++;
		user.setId(id);
		users.add(user);
	}

	public List<User> getUsers() {
		return users;
	}
	
	
}
